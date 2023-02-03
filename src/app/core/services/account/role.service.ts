import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Role } from 'src/app/shared/models/user/role';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  urlBase = environment.urlBase + 'role';

  constructor(private http: HttpClient) { }

  public get(): Observable<Role[]> {
    return this.http.get<Role[]>(this.urlBase).pipe(take(1));
  }

  public update(model: Role): Observable<Role> {
    return this.http.put<Role>(this.urlBase + '/update', model).pipe(take(1));
  }
}
