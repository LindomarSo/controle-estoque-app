import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/shared/models/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private currentUserSource = new ReplaySubject<User>(1);
  public currentUser$ = this.currentUserSource.asObservable();
  public urlBase = environment.urlBase + 'account';

  constructor(private http: HttpClient) {}

  public login(model: any): Observable<void> {
    return this.http.post<User>(`${this.urlBase}/login`, model).pipe(
      take(1),
      map((response: User) => {
        const user = response;

        if (user) this.setCurrentUser(user);
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('user');
    this.currentUserSource.next(null!);
  }

  public setCurrentUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  public getUser(): Observable<User> {
    return this.http.get<User>(`${this.urlBase}/getuser`).pipe(take(1));
  }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.urlBase}/lista`).pipe(take(1));
  }

  public createUser(model: User): Observable<User> {
    return this.http.post<User>(`${this.urlBase}/register`, model).pipe(take(1));
  }
}
