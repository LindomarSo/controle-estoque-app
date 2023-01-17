import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { Voluntary } from 'src/app/shared/models/voluntary/voluntary.model';
import { environment } from 'src/environments/environment';
import { PaginationResult } from 'src/app/shared/models/pagination/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class VoluntaryService {

  url = environment.urlBase + 'entidade/'

  constructor(private http: HttpClient) { }

  getAll(person: string, pageNumber?: number | string, pageSize?: number | string, search?: string): Observable<PaginationResult<Voluntary[]>> {
    const paginationResult: PaginationResult<Voluntary[]> = new PaginationResult<Voluntary[]>();
    let httpParams = new HttpParams();

    if (!!pageNumber && !!pageSize) {
      httpParams = httpParams.append('numeroPagina', pageNumber.toString());
      httpParams = httpParams.append('tamanhoPagina', pageSize.toString());
    }

    if (!!search) {
      httpParams = httpParams.append('descricao', search)
    }

    return this.http.get<Voluntary[]>(`${this.url}pessoa/${person}`, { observe: 'response', params: httpParams })
      .pipe(take(1), map((response: any) => {
        paginationResult.result = response.body;

        if (response.headers.has('Pagination'))
          paginationResult.pagination = JSON.parse(response.headers.get('Pagination'));

        return paginationResult;
      }));
  }

  getVoluntaryById(id: number): Observable<Voluntary> {
    return this.http.get<Voluntary>(`${this.url}${id}`).pipe(take(1));
  }

  getPersonType(): Observable<any>{
    return this.http.get<any>(`${this.url}pessoa`).pipe(take(1));
  }

  getSchooling(): Observable<any>{
    return this.http.get<any>(`${this.url}escolaridade`).pipe(take(1));
  }

  post(voluntary: Voluntary): Observable<Voluntary>{
    return this.http.post<Voluntary>(this.url, voluntary).pipe(take(1));
  }
}
