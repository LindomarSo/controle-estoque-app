import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators'
import { PaginationResult } from 'src/app/shared/models/pagination/pagination.model';
import { Donation } from 'src/app/shared/models/voluntary/donation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  url = environment.urlBase + 'doacao'

  constructor(private http: HttpClient) { }

  getAll(pageNumber?: number | string, pageSize?: number | string, search?: string): Observable<PaginationResult<Donation[]>>{
    const paginationResult: PaginationResult<Donation[]> = new PaginationResult<Donation[]>();
    let httpParams = new HttpParams();

    if (!!pageNumber && !!pageSize) {
      httpParams = httpParams.append('numeroPagina', pageNumber.toString());
      httpParams = httpParams.append('tamanhoPagina', pageSize.toString());
    }

    if (!!search) {
      httpParams = httpParams.append('descricao', search)
    }

    return this.http.get<Donation[]>(this.url, { observe: 'response', params: httpParams}).pipe(take(1), map((response: any) => {
      paginationResult.result = response.body;

      if(response.headers.has('Pagination'))
        paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));

      return paginationResult;
    }));
  }

  getDonationById(id: number): Observable<Donation>{
    return this.http.get<Donation>(`${this.url}/${id}`).pipe(take(1));
  }

  getUnties(): Observable<string[]>{
    return this.http.get<string[]>(`${this.url}/unidades`).pipe(take(1));
  }

  createDonation(model: Donation[]) : Observable<Donation[]>{
    return this.http.post<Donation[]>(this.url, model).pipe(take(1));
  }

  updateDonation(model: Donation) : Observable<Donation>{
    return this.http.put<Donation>(this.url, model).pipe(take(1));
  }
}
