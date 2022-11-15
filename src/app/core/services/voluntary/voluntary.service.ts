import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators'
import { Injectable } from '@angular/core';
import { Voluntary } from 'src/app/shared/models/voluntary/voluntary.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoluntaryService {

  url = environment.urlBase + 'entidade/'

  constructor(private http: HttpClient) { }

  getAll(pageNumber?: number | string, pageSize?: number | string, search?: string): Observable<Voluntary[]>{

    let httpParams = new HttpParams();

    return this.http.get<Voluntary[]>(this.url + 'fisica').pipe(take(1));
  }

  getVoluntaryById(id: number): Observable<Voluntary>{
    return this.http.get<Voluntary>(`${this.url}${id}`).pipe(take(1));
  }
}
