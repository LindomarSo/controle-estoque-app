import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';
import { VoluntaryService } from 'src/app/core/services/voluntary/voluntary.service';
import { Pagination, PaginationResult } from 'src/app/shared/models/pagination/pagination.model';
import { Address } from 'src/app/shared/models/voluntary/address.model';
import { Donation } from 'src/app/shared/models/voluntary/donation.model';
import { Voluntary } from 'src/app/shared/models/voluntary/voluntary.model';

@Component({
  selector: 'app-list-partner',
  templateUrl: './list-partner.component.html',
  styleUrls: ['./list-partner.component.scss']
})
export class ListPartnerComponent implements OnInit {
  dataSource = new MatTableDataSource<Voluntary>();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  pagination = {} as Pagination;
  voluntary: Voluntary[] = [];
  displayedColumns: string[] = [
    'Empresa',
    'Telefone',
    'CNPJ',
    'Endereco',
    'quem_cadastrou',
    'acoes'
  ];

  termGetChanged: Subject<string> = new Subject<string>();

  constructor(private voluntaryService: VoluntaryService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.pagination = { currentPage: 1, itemsPerPage: 10 } as Pagination;
    this.getAllPartners();
    setTimeout(() => { this.configPagination();  }, 0)
  }

  filterEntities(fillter: any): void {
    this.pagination = { currentPage: 1, itemsPerPage: 10 } as Pagination;
    if (this.termGetChanged.observers.length === 0) {

      this.termGetChanged.pipe(debounceTime(500)).subscribe(filtterBy => {
        this.voluntaryService.getAll('juridica', this.pagination.currentPage,
          this.pagination.itemsPerPage, filtterBy).subscribe({
            next: (paginationReuslt) => {
              this.voluntary = paginationReuslt.result;
              this.dataSource.data = this.voluntary;
              this.pagination = paginationReuslt.pagination;
            },
            error: (err) => {
              this.toastr.error('Erro ao carregar doações');
            }
          })
      })
    }

    this.termGetChanged.next(fillter.value);
  }

  getAllPartners(): void {
    this.voluntaryService.getAll('juridica', this.pagination.currentPage, this.pagination.itemsPerPage).subscribe({
      next: (response: PaginationResult<Voluntary[]>) => {
        this.voluntary = response.result;
        this.dataSource.data = this.voluntary;
        this.pagination = response.pagination;
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error('Erro ao carregar empresas');
       }
    })
  }

  getAddress(address: Address): string {
    return `${address.cidade}-${address.estado}`;
  }

  setPagination(evento: PageEvent) {
    this.pagination.itemsPerPage = evento.pageSize;
    this.pagination.currentPage = evento.pageIndex + 1;
    this.getAllPartners();
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
    this.paginator._intl.itemsPerPageLabel = "Itens por página";
    this.paginator._intl.nextPageLabel = "Próxima página"
    this.paginator._intl.previousPageLabel = "Página anterior"
    this.paginator._intl.getRangeLabel = portuguesRangeLabel;
  }

  cleanFiltter() {
    (document.getElementById("search") as HTMLInputElement).value = '';
    this.getAllPartners();
  }
}
