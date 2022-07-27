/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { User, UserModel } from './../_models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from './../auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // le point d’accés à notre API
  private ApiServiceUrl = `${environment.apiUrl}custumer`;
  private loggedInUser: UserModel = null;
  constructor(private http: HttpClient, private authService: AuthService) { }

  get Header() {
    return new HttpHeaders().set("Authorization","Bearer " + this.AuthToken);
  }

  get AuthToken() {
    return this.authService.getAuthToken();
  }

  /** GET Users */
  getUsers(): Observable<User[]> {
    const url = `${this.ApiServiceUrl}`;
    return this.http.get<UserModel[]>(url, {headers:this.Header}).pipe(
      tap(_ => this.log(`fetched getUser`)),
      catchError(this.handleError('getUsers', []))
    );
  }

  /** GET User */
  getUser(id: number): Observable<User> {
    const url = `${this.ApiServiceUrl}/${id}}`;
    return this.http.get<UserModel>(url, {headers:this.Header}).pipe(
      tap(_ => this.log(`fetched getUser id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /** Add user */
  addUser(data): Observable<any> {
    console.log(data);
    const ApiUrl = `${this.ApiServiceUrl}/add`;
    //var formData: any = new FormData();
    return this.http.post<any>(ApiUrl, data, {headers:this.Header})
      .pipe(
        tap(_ => this.log(`fetched addUser `)),
        catchError(this.handleError<User>(`addUser`))
      );
  }

  /* Update a user */
  updateUser(id:string, data: any): Observable<any> {
    console.log(data);
    const ApiUrl = `${this.ApiServiceUrl}/${id}`;
    //var formData: any = new FormData();
    return this.http.patch<any>(ApiUrl,data,{headers:this.Header})
      .pipe(
        tap(_ => this.log(`fetched updateUser`)),
        catchError(
          this.handleError<User>(`updateUser`)
        )
      );
  }

  /** Delete one user  */
  deleteUser(id: string): Observable<any> {
    let ApiUrl = `${this.ApiServiceUrl}/${id}`;
    return this.http.delete<any>(ApiUrl, {headers:this.Header})
      .pipe(
        tap(_ => this.log(`fetched deleteUser `)),
        catchError(this.handleError<any>(`deleteUser`))
      );
  }

  /* handleError */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /* log */
  private log(log: string) {
    console.info(log);
  }

}