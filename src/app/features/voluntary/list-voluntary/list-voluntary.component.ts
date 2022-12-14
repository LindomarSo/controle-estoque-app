import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { VoluntaryService } from 'src/app/core/services/voluntary/voluntary.service';
import { Pagination } from 'src/app/shared/models/pagination/pagination.model';
import { Donation } from 'src/app/shared/models/voluntary/donation.model';
import { Voluntary } from 'src/app/shared/models/voluntary/voluntary.model';
import { Address } from '../../../shared/models/voluntary/address.model';

@Component({
  selector: 'app-list-voluntary',
  templateUrl: './list-voluntary.component.html',
  styleUrls: ['./list-voluntary.component.scss']
})
export class ListVoluntaryComponent implements OnInit {

  dataSource = new MatTableDataSource<Voluntary>();
  @ViewChild(MatPaginator, {static: true})
  paginator!: MatPaginator;
  pagination = { } as Pagination;
  voluntary!: Voluntary[];
  displayedColumns: string[] = [
    'Nome',
    'Telefone',
    'CPF_CNPJ',
    'Endereco',
    'escolaridade',
    'quemCadastrou',
    'acoes'
  ];

  constructor(private voluntaryService: VoluntaryService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.pagination = { currentPage: 1, itemsPerPage: 3 } as Pagination;
    this.getAll();
    this.pagination.totalItems = this.voluntary?.length;
    console.log(this.dataSource.data)
    this.configPagination();
  }

  getAll(): void{
    this.voluntaryService.getAll().subscribe({
      next: (voluntary: Voluntary[]) => {
        this.dataSource.data = voluntary;
        console.log(this.dataSource.data)
        this.toastr.success('voluntários carregados!');
      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error('Não foi possível carregar voluntários');
      }
    }).add();
  }

  getAddress(address: Address): string{
    return `${address.cidade}-${address.estado}`;
  }

  setPagination(evento: PageEvent){
    this.pagination.itemsPerPage = evento.pageSize;
    this.pagination.currentPage = evento.pageIndex + 1;
  }

  configPagination(): void {
    const portuguesRangeLabel = (page: number, pageSize: number, length: number) => {
      if(length === 0 || pageSize === 0){
        return `0 de ${length}`;
      }

      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length)
                                           : startIndex + pageSize;

      return `${startIndex + 1} - ${endIndex} de ${length}`;
    }
    this.paginator._intl.itemsPerPageLabel = "Voluntários por página";
    this.paginator._intl.nextPageLabel = "Próxima página"
    this.paginator._intl.previousPageLabel = "Página anterior"
    this.paginator._intl.getRangeLabel = portuguesRangeLabel;
  }
}
