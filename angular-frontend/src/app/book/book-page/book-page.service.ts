/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiRes } from 'src/app/_models/api.res';
import { Page } from '../../_models/page';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthService } from '../../auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookPageService {

  // le point d’accés à notre API
  private ApiServiceUrl = `${environment.apiUrl}page`;
  constructor(private http: HttpClient, private authService: AuthService) { }

  get Header() {
    return new HttpHeaders().set("Authorization","Bearer " + this.AuthToken);
  }

  get AuthToken() {
    return this.authService.getAuthToken();
  }

  /** GET All Books */
  getPages(id: string): Observable<Page[]> {
    const url = `${this.ApiServiceUrl}/all/${id}`;
    return this.http.get<any>(url, {headers:this.Header}).pipe(
      tap(_ => this.log(`fetched getPages (all)`)),
      catchError(this.handleError('getPages (all)', []))
    );
  } 


  /** GET One Page */
  getPage(id: string): Observable<ApiRes> {
    const url = `${this.ApiServiceUrl}/${id}`;
    return this.http.get<ApiRes>(url, {headers:this.Header}).pipe(
      tap(_ => this.log(`fetched getPage id=${id}`)),
      catchError(this.handleError<any>(`getPage id=${id}`))
    );
  }

  /** Add book */
  addPage(bookId:string, data:Page): Observable<any> {
    const ApiUrl = `${this.ApiServiceUrl}/add`;
    //var formData: any = new FormData();
    return this.http.post<any>(ApiUrl, data, {headers:this.Header})
      .pipe(
        tap(_ => this.log(`fetched addBook `)),
        catchError(this.handleError<any>(`addBook`))
      );
  }

  /* Update a book */
  updatePage(id:string, data: any): Observable<any> {
    const ApiUrl = `${this.ApiServiceUrl}/${id}`;
    //var formData: any = new FormData();
    return this.http.patch<any>(ApiUrl, data, {headers:this.Header})
      .pipe(
        tap(_ => this.log(`fetched updateBook`)),
        catchError(
          this.handleError<Page>(`updateBook`)
        )
      );
  }

  /** Delete one book  */
  deletePage(id: string): Observable<any> {
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