import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';
import { VoluntaryService } from 'src/app/core/services/voluntary/voluntary.service';
import {
  Pagination,
  PaginationResult,
} from 'src/app/shared/models/pagination/pagination.model';
import { Address } from 'src/app/shared/models/voluntary/address.model';
import { Voluntary } from 'src/app/shared/models/voluntary/voluntary.model';
import { DonationModalComponent } from '../../doacoes/donation-modal/donation-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-partner',
  templateUrl: './list-partner.component.html',
  styleUrls: ['./list-partner.component.scss'],
})
export class ListPartnerComponent implements OnInit {
  dataSource = new MatTableDataSource<Voluntary>();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  isLoading = false;
  pagination = {} as Pagination;
  voluntary: Voluntary[] = [];
  displayedColumns: string[] = [
    'Empresa',
    'Telefone',
    'CNPJ',
    'Endereco',
    'quem_cadastrou',
    'acoes',
  ];

  termGetChanged: Subject<string> = new Subject<string>();

  constructor(
    private voluntaryService: VoluntaryService,
    private toastr: ToastrService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.pagination = { pageNumber: 1, itemsPerPage: 10 } as Pagination;
    this.getAllPartners();
  }

  filterEntities(fillter: any): void {
    this.pagination = { pageNumber: 1, itemsPerPage: 10 } as Pagination;
    if (this.termGetChanged.observers.length === 0) {
      this.termGetChanged.pipe(debounceTime(500)).subscribe((filtterBy) => {
        this.voluntaryService
          .getAll(
            'juridica',
            this.pagination.pageNumber,
            this.pagination.itemsPerPage,
            filtterBy
          )
          .subscribe({
            next: (paginationReuslt) => {
              this.voluntary = paginationReuslt.result;
              this.dataSource.data = this.voluntary;
              this.pagination = paginationReuslt.pagination;
            },
            error: (err) => {
              this.toastr.error('Erro ao carregar doações');
            },
          });
      });
    }

    this.termGetChanged.next(fillter.value);
  }

  getAllPartners(): void {
    this.voluntaryService
      .getAll(
        'juridica',
        this.pagination.pageNumber,
        this.pagination.itemsPerPage
      )
      .subscribe({
        next: (response: PaginationResult<Voluntary[]>) => {
          this.voluntary = response.result;
          this.dataSource.data = this.voluntary;
          this.pagination = response.pagination;
        },
        error: (error: any) => {
          console.error(error);
          this.toastr.error('Erro ao carregar empresas');
        },
      }).add(() => this.isLoading = true);
  }

  getAddress(address: Address): string {
    return `${address.cidade}-${address.estado}`;
  }

  setPagination(evento: PageEvent) {
    this.pagination.itemsPerPage = evento.pageSize;
    this.pagination.pageNumber = evento.pageIndex + 1;
    this.getAllPartners();
  }

  newDonation(donator: any) {
    this.dialog.open(DonationModalComponent, { data: { donator: donator } });
  }

  cleanFiltter() {
    (document.getElementById('search') as HTMLInputElement).value = '';
    this.getAllPartners();
  }
}
