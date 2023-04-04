export class Pagination {
  pageNumber!: number;
  totalItems!: number;
  itemsPerPage!: number;
  totalPages!: number;
}

export class PaginationResult<T> {
  result!: T;
  pagination!: Pagination;
}
