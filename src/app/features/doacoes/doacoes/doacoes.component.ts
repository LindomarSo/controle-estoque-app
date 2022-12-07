import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DonationService } from 'src/app/core/services/donation/donation.service';
import { Pagination, PaginationResult } from 'src/app/shared/models/pagination/pagination.model';
import { MatDialog } from '@angular/material/dialog'
import { Donation } from 'src/app/shared/models/voluntary/donation.model';
import { DonationViewComponent } from '../donation-view/donation-view.component';

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

  displayedColumns: string[] = [
    'doador',
    'doacao',
    'destino',
    'dataEntrada',
    'qtd',
    'unidade',
    'acoes'
  ];

  constructor(private donationService: DonationService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.pagination = { currentPage: 1, itemsPerPage: 5 } as Pagination;
    this.getAll();
    this.configPagination();
  }

  getAll(): void {
    this.spinner.show();
    this.donationService.getAll(this.pagination.currentPage, this.pagination.itemsPerPage).subscribe({
      next: (response: PaginationResult<Donation[]>) => {
        this.donation = response.result;
        this.dataSource.data = this.donation;
        this.pagination = response.pagination;
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error('Error ao carregar doações');
      }
    }).add(() => this.spinner.hide());
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

  configPagination(): void {
    const portuguesRangeLabel = (page: number, pageSize: number, length: number) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }

      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

      return `${startIndex + 1} - ${endIndex} de ${length}`;
    }
    this.paginator._intl.itemsPerPageLabel = "Doações por página";
    this.paginator._intl.nextPageLabel = "Próxima página"
    this.paginator._intl.previousPageLabel = "Página anterior"
    this.paginator._intl.getRangeLabel = portuguesRangeLabel;
  }

  openView(donation: Donation): void {
    this.dialog.open(DonationViewComponent, { data: donation });
  }
}
