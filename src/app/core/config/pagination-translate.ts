import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class PaginationTranslate extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Itens por página:';
  override nextPageLabel = 'Próxima página';
  override previousPageLabel = 'Página anterior';
  override firstPageLabel = 'Primeira página';
  override lastPageLabel = 'Última página';

  override getRangeLabel = function (
    page: number,
    pageSize: number,
    length: number
  ): string {
    const start = page * pageSize + 1;
    const end = (page + 1) * pageSize;
    return `${start} - ${end} de ${length}`;
  };

}
