import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { DonationService } from 'src/app/core/services/donation/donation.service';
import {
  Pagination,
  PaginationResult,
} from 'src/app/shared/models/pagination/pagination.model';
import { MatDialog } from '@angular/material/dialog';
import { Donation } from 'src/app/shared/models/voluntary/donation.model';
import { VoluntaryService } from 'src/app/core/services/voluntary/voluntary.service';
import { debounceTime, Subject } from 'rxjs';
import { DonationModalComponent } from '../donation-modal/donation-modal.component';

@Component({
  selector: 'app-doacoes',
  templateUrl: './doacoes.component.html',
  styleUrls: ['./doacoes.component.scss'],
})
export class DoacoesComponent implements OnInit {
  dataSource = new MatTableDataSource<Donation>();
  pagination: Pagination = new Pagination();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  donation: Donation[] = [];
  typePerson: string[] = [];
  personSelected: string = '';
  search: string = '';
  isLoading = true;

  displayedColumns: string[] = [
    'doacao',
    'doador',
    'categoria',
    'unidade',
    'destino',
    'dataEntrada',
    'qtd',
    'estoque',
    'acoes',
  ];

  termGetChanged: Subject<string> = new Subject<string>();

  constructor(
    private donationService: DonationService,
    private toastr: ToastrService,
    private voluntaryService: VoluntaryService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.pagination = { currentPage: 1, itemsPerPage: 10 } as Pagination;
    this.getAll();
    this.getTypePerson();
  }

  filterDonations(fillter: any): void {
    this.pagination = { currentPage: 1, itemsPerPage: 10 } as Pagination;
    if (this.termGetChanged.observers.length === 0) {
      this.termGetChanged.pipe(debounceTime(100)).subscribe((filtterBy) => {
        this.donationService
          .getAll(
            this.pagination.currentPage,
            this.pagination.itemsPerPage,
            filtterBy
          )
          .subscribe({
            next: (paginationReuslt) => {
              this.donation = paginationReuslt.result;
              this.dataSource.data = this.donation;
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

  getAll(term?: string, type?: string): void {
    this.isLoading = true;
    this.donationService
      .getAll(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        term,
        type
      )
      .subscribe({
        next: (response: PaginationResult<Donation[]>) => {
          this.donation = response.result;
          this.dataSource.data = this.donation;
          this.pagination = response.pagination;
        },
        error: (error: any) => {
          console.error(error);
          this.toastr.error('Error ao carregar doações');
        },
      })
      .add(() => (this.isLoading = false));
  }

  setPagination(evento: PageEvent) {
    this.pagination.itemsPerPage = evento.pageSize;
    this.pagination.currentPage = evento.pageIndex + 1;
    this.getAll();
  }

  getDate(date: string): string {
    let data = date.substring(0, 10);
    let dateArray = data.split('-');

    return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`;
  }

  openDonate(donate: Donation) {
    this.dialog.open(DonationModalComponent, {
      data: { donate: donate, donator: donate.entidade },
    });
  }

  getTypePerson(): void {
    this.voluntaryService.getPersonType().subscribe({
      next: (response: string[]) => {
        this.typePerson = response;
      },
      error: () => {
        this.toastr.error('Erro ao carregar tipo de doador');
      },
    });
  }

  getByPersonSelected() {
    this.pagination = { currentPage: 1, itemsPerPage: 10 } as Pagination;
    this.getAll('', this.personSelected);
  }

  cleanFiltter() {
    this.personSelected = '';
    this.getAll();
  }

  getTitle(title: string): string {
    let length = title.length;

    return length > 30 ? title.substring(0, 30) + '...' : title;
  }
}
