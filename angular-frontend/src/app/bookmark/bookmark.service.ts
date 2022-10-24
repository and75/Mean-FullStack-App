/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
 import { Injectable } from '@angular/core';
 import { environment } from '../../environments/environment';
 import { BookmarkModel, Bookmark } from '../_models/bookmark';
 import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { Observable, of } from 'rxjs';
 import { catchError, map, tap } from 'rxjs/operators';
 import { AuthService } from '../auth.service';

 
@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  // le point d’accés à notre API
  private ApiServiceUrl = `${environment.apiUrl}bookmark`;
  constructor(private http: HttpClient, private authService: AuthService) { }

  get Header() {
    return new HttpHeaders().set("Authorization","Bearer " + this.AuthToken);
  }

  get AuthToken() {
    return this.authService.getAuthToken();
  }

  /** GET All Bookmark */
  getAll(): Observable<Bookmark[]> {
    const url = `${this.ApiServiceUrl}`;
    return this.http.get<BookmarkModel[]>(url, {headers:this.Header}).pipe(
      tap(_ => this.log(`fetched getBooks (all)`)),
      catchError(this.handleError('getBooks (all)', []))
    );
  } 

  /** GET One Bookmark */
  getOne(id: number): Observable<any> {
    const url = `${this.ApiServiceUrl}/${id}`;
    return this.http.get<any>(url, {headers:this.Header}).pipe(
      tap(_ => this.log(`fetched getBook id=${id}`)),
      catchError(this.handleError<any>(`getBook id=${id}`))
    );
  }

  /** Add book */
  add(data): Observable<any> {
    const ApiUrl = `${this.ApiServiceUrl}/add`;
    //var formData: any = new FormData();
    return this.http.post<any>(ApiUrl, data, {headers:this.Header})
      .pipe(
        tap(_ => this.log(`fetched addBook `)),
        catchError(this.handleError<Bookmark>(`addBook`))
      );
  }

  /* Update a bookmark */
  update(id:string, data: any): Observable<any> {
    const ApiUrl = `${this.ApiServiceUrl}/${id}`;
    //var formData: any = new FormData();
    return this.http.patch<any>(ApiUrl, data, {headers:this.Header})
      .pipe(
        tap(_ => this.log(`fetched updateBook`)),
        catchError(
          this.handleError<Bookmark>(`updateBook`)
        )
      );
  }

  /** Delete one book  */
  delete(id: string): Observable<any> {
    let ApiUrl = `${this.ApiServiceUrl}/${id}`;
    return this.http.delete<any>(ApiUrl, {headers:this.Header})
      .pipe(
        tap(_ => this.log(`fetched deleteBook `)),
        catchError(this.handleError<any>(`deleteBook`))
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
