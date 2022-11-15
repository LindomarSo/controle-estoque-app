import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pagination, PaginationResult } from 'src/app/shared/models/pagination/pagination.model';
import { Donation } from 'src/app/shared/models/voluntary/donation.model';

@Component({
  selector: 'app-doacoes',
  templateUrl: './doacoes.component.html',
  styleUrls: ['./doacoes.component.scss'],
})
export class DoacoesComponent implements OnInit {

  dataSource = new MatTableDataSource<Donation>();
  pagination: Pagination = new Pagination();
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator

  displayedColumns: string[] = [
    'doador',
    'doacao',
    'destino',
    'dataEntrada',
    'unidade'
  ];

  ngOnInit(): void {
    this.dataSource.data = this.donation;
    this.pagination.totalItems = this.donation.length;

    this.configPagination();
  }

  donation: Donation[] = [
    {
      id: 1,
      materialDoado: "Um Violão",
      preco: "350,00",
      quantidade: 1,
      destino: "Crianças",
      dtEntrada: "2022-11-05T00:00:00",
      dtRetirada: "",
      retiradaPor: "",
      disponibilidade: "",
      habilidade: "",
      entidadeId: 1,
      userId: 1,
      unidade: "Samambaia Sul",
      user: {
        id: 1,
        nomeCompleto: "Lindomar Dias",
        email: "lindomar"
      },
      entidade: {
        id: 1,
        nome: "Laura Catarina Luna da Luz",
        telefone: "6939273913"
      }
    }as Donation,
  ];

  setPagination(evento: PageEvent) {
    this.pagination.itemsPerPage = evento.pageSize;
    this.pagination.currentPage = evento.pageIndex + 1;
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
}
