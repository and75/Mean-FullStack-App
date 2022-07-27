/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BookModel, Book } from '../_models/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  // le point d’accés à notre API
  private ApiServiceUrl = `${environment.apiUrl}book`;
  constructor(private http: HttpClient, private authService: AuthService) { }

  get Header() {
    return new HttpHeaders().set("Authorization","Bearer " + this.AuthToken);
  }

  get AuthToken() {
    return this.authService.getAuthToken();
  }

  /** GET All Books */
  getBooks(): Observable<Book[]> {
    const url = `${this.ApiServiceUrl}`;
    return this.http.get<BookModel[]>(url, {headers:this.Header}).pipe(
      tap(_ => this.log(`fetched getBooks (all)`)),
      catchError(this.handleError('getBooks (all)', []))
    );
  } 


  /** GET One Book */
  getBook(id: number): Observable<any> {
    const url = `${this.ApiServiceUrl}/${id}`;
    return this.http.get<any>(url, {headers:this.Header}).pipe(
      tap(_ => this.log(`fetched getBook id=${id}`)),
      catchError(this.handleError<any>(`getBook id=${id}`))
    );
  }

  /** Add book */
  addBook(data): Observable<any> {
    console.log(data);
    const ApiUrl = `${this.ApiServiceUrl}/add`;
    //var formData: any = new FormData();
    return this.http.post<any>(ApiUrl, data, {headers:this.Header})
      .pipe(
        tap(_ => this.log(`fetched addBook `)),
        catchError(this.handleError<Book>(`addBook`))
      );
  }

  /* Update a book */
  updateBook(id:string, data: any): Observable<any> {
    const ApiUrl = `${this.ApiServiceUrl}/${id}`;
    //var formData: any = new FormData();
    return this.http.patch<any>(ApiUrl, data, {headers:this.Header})
      .pipe(
        tap(_ => this.log(`fetched updateBook`)),
        catchError(
          this.handleError<Book>(`updateBook`)
        )
      );
  }

  /** Delete one book  */
  deleteBook(id: string): Observable<any> {
    let ApiUrl = `${this.ApiServiceUrl}/${id}`;
    return this.http.delete<any>(ApiUrl, {headers:this.Header})
      .pipe(
        tap(_ => this.log(`fetched deleteBook `)),
        catchError(this.handleError<any>(`deleteBook`))
      );
  }

  downloadPdf(id: string): Observable<any> {
    let ApiUrl = `${environment.apiUrl}drive/download/${id}`;
    return this.http.get<any>(ApiUrl, {headers:this.Header,responseType: 'blob' as 'json'})
      .pipe(
        tap(_ => this.log(`fetched downloadPdf `)),
        catchError(this.handleError<any>(`downloadPdf`))
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