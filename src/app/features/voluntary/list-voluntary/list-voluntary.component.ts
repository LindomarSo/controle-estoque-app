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
import { Voluntary } from 'src/app/shared/models/voluntary/voluntary.model';
import { Address } from '../../../shared/models/voluntary/address.model';
import { DonationModalComponent } from '../../doacoes/donation-modal/donation-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-voluntary',
  templateUrl: './list-voluntary.component.html',
  styleUrls: ['./list-voluntary.component.scss'],
})
export class ListVoluntaryComponent implements OnInit {
  dataSource = new MatTableDataSource<Voluntary>();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  pagination = {} as Pagination;
  voluntary: Voluntary[] = [];
  displayedColumns: string[] = [
    'Nome',
    'Telefone',
    'CPF_CNPJ',
    'Endereco',
    'escolaridade',
    'quemCadastrou',
    'acoes',
  ];

  termGetChanged: Subject<string> = new Subject<string>();

  isLoading = true;

  constructor(
    private voluntaryService: VoluntaryService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  filterEntities(fillter: any): void {
    this.pagination = { currentPage: 1, itemsPerPage: 10 } as Pagination;
    if (this.termGetChanged.observers.length === 0) {
      this.termGetChanged.pipe(debounceTime(500)).subscribe((filtterBy) => {
        this.voluntaryService
          .getAll(
            'fisica',
            this.pagination.currentPage,
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

  getAll(): void {
    this.pagination = { currentPage: 1, itemsPerPage: 10 } as Pagination;
    this.voluntaryService
      .getAll(
        'fisica',
        this.pagination.currentPage,
        this.pagination.itemsPerPage
      )
      .subscribe({
        next: (paginationResult: PaginationResult<Voluntary[]>) => {
          this.voluntary = paginationResult.result;
          this.dataSource.data = paginationResult.result;
          this.pagination = paginationResult.pagination;
        },
        error: (error: any) => {
          console.error(error);
          this.toastr.error('Não foi possível carregar voluntários');
        },
      })
      .add(() => (this.isLoading = false));
  }

  getAddress(address: Address): string {
    return `${address.cidade}-${address.estado}`;
  }

  setPagination(evento: PageEvent) {
    this.pagination.itemsPerPage = evento.pageSize;
    this.pagination.currentPage = evento.pageIndex + 1;
    this.getAll();
  }

  newDonation(donator: any) {
    this.dialog.open(DonationModalComponent, { data: { donator: donator } });
  }

  cleanFiltter() {
    (document.getElementById('search') as HTMLInputElement).value = '';
    this.getAll();
  }
}
