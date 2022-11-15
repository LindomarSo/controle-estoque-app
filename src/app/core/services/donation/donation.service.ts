import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators'
import { Donation } from 'src/app/shared/models/voluntary/donation.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonationService {

  url = environment.urlBase + 'doacao/'

  constructor(private http: HttpClient) { }

  getAll(): Observable<Donation[]>{
    return this.http.get<Donation[]>(this.url).pipe(take(1));
  }

  getDonationById(id: number): Observable<Donation>{
    return this.http.get<Donation>(`${this.url}${id}`).pipe(take(1));
  }
}
