import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Category } from 'src/app/features/doacoes/donation-modal/donation-modal.component';
import { PaginationResult } from 'src/app/shared/models/pagination/pagination.model';
import { BarChartData } from 'src/app/shared/models/voluntary/barChartData';
import { Donation } from 'src/app/shared/models/voluntary/donation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DonationService {
  url = environment.urlBase + 'doacao';

  constructor(private http: HttpClient) {}

  getAll(
    pageNumber?: number | string,
    pageSize?: number | string,
    search?: string,
    typePerson?: string
  ): Observable<PaginationResult<Donation[]>> {
    const paginationResult: PaginationResult<Donation[]> = new PaginationResult<
      Donation[]
    >();
    let httpParams = new HttpParams();

    if (!!pageNumber && !!pageSize) {
      httpParams = httpParams.append('numeroPagina', pageNumber.toString());
      httpParams = httpParams.append('tamanhoPagina', pageSize.toString());
    }

    if (!!search) {
      httpParams = httpParams.append('descricao', search);
    }

    if (!!typePerson) {
      httpParams = httpParams.append('tipoEntidade', typePerson);
    }

    return this.http
      .get<Donation[]>(this.url, { observe: 'response', params: httpParams })
      .pipe(
        take(1),
        map((response: any) => {
          paginationResult.result = response.body;

          if (response.headers.has('Pagination'))
            paginationResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );

          return paginationResult;
        })
      );
  }

  getDonationById(id: number): Observable<Donation> {
    return this.http.get<Donation>(`${this.url}/${id}`).pipe(take(1));
  }

  getBarChartData(data: string): Observable<BarChartData[]> {
    return this.http
      .get<BarChartData[]>(`${this.url}/graph/${data}`)
      .pipe(take(1));
  }

  getUnties(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/unidades`).pipe(take(1));
  }

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${environment.urlBase}categoria`)
      .pipe(take(1));
  }

  createDonation(model: any): Observable<any> {
    return this.http.post<any>(this.url, model).pipe(take(1));
  }

  createUpdateDonation(model: any): Observable<any> {
    return this.http.post<any>(`${this.url}/retirado`, model).pipe(take(1));
  }

  updateDonation(model: any): Observable<any> {
    return this.http.put<any>(this.url, model).pipe(take(1));
  }
}
