import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Pagination } from 'src/app/shared/models/pagination/pagination.model';
import { Donation } from 'src/app/shared/models/voluntary/donation.model';
import { Voluntary } from 'src/app/shared/models/voluntary/voluntary.model.ts';
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

  constructor() { }


  displayedColumns: string[] = [
    'Nome',
    'Telefone',
    'CPF_CNPJ',
    'Endereco',
    'Doacoes',
    'Qtd',
    'Preco',
    'acoes'
  ];

  ngOnInit(): void {
    this.dataSource.data = this.voluntary;
    this.pagination.totalItems = this.voluntary.length;

    this.configPagination();
  }

  voluntary: Voluntary[] = [
    {
      id: 1,
      nome: 'Fernando Silva',
      telefone: '61986587552',
      documento: '35422815068',
      endereco: { cidade: 'Brasilia', estado: 'DF'} as Address,
      doacoes: [{ materialDoado: 'Violão', quantidade: 1, preco: '500,00' }] as Donation[]
    } as Voluntary,
    {
      id: 1,
      nome: 'Lara Isabela Jaqueline Souza',
      telefone: '8337121649',
      documento: '77073721235',
      endereco: { cidade: 'João Pessoa', estado: 'PB'} as Address,
      doacoes: [{ materialDoado: 'Uma Sexta', quantidade: 1, preco: '60,00' }] as Donation[]
    } as Voluntary,
    {
      id: 1,
      nome: 'Julia Benedita',
      telefone: '8929038257',
      documento: '30901043699',
      endereco: { cidade: 'Picos', estado: 'PI'} as Address,
      doacoes: [{ materialDoado: 'Um Computador', quantidade: 1, preco: '2500,00' }] as Donation[]
    } as Voluntary,
    {
      id: 1,
      nome: 'Fernando Silva',
      telefone: '61986587552',
      documento: '35422815068',
      endereco: { cidade: 'Brasilia', estado: 'DF'} as Address,
      doacoes: [{ materialDoado: 'Violão', quantidade: 1, preco: '500,00' }] as Donation[]
    } as Voluntary,
    {
      id: 1,
      nome: 'Lara Isabela Jaqueline Souza',
      telefone: '8337121649',
      documento: '77073721235',
      endereco: { cidade: 'João Pessoa', estado: 'PB'} as Address,
      doacoes: [{ materialDoado: 'Uma Sexta', quantidade: 1, preco: '60,00' }] as Donation[]
    } as Voluntary,
    {
      id: 1,
      nome: 'Julia Benedita',
      telefone: '8929038257',
      documento: '30901043699',
      endereco: { cidade: 'Picos', estado: 'PI'} as Address,
      doacoes: [{ materialDoado: 'Um Computador', quantidade: 1, preco: '2500,00' }] as Donation[]
    } as Voluntary,
  ]

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
