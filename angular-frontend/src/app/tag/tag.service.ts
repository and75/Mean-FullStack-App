/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
 import { Injectable } from '@angular/core';
 import { environment } from '../../environments/environment';
 import { Tag } from '../_models/tag';
 import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { Observable, of } from 'rxjs';
 import { catchError, map, tap } from 'rxjs/operators';
 import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  // le point d’accés à notre API
  private ApiServiceUrl = `${environment.apiUrl}tag`;
  constructor(private http: HttpClient, private authService: AuthService) { }

  get Header() {
    return new HttpHeaders().set("Authorization","Bearer " + this.AuthToken);
  }

  get AuthToken() {
    return this.authService.getAuthToken();
  }

  /** GET All Tag */
  getAll(onlyLabel=false): Observable<Tag[]> {
    const url = `${this.ApiServiceUrl}`;
    return this.http.get<Tag[]>(url, {headers:this.Header}).pipe(
      tap(_ => this.log(`fetched getAll Tags`)),
      catchError(this.handleError('getAll Tags', []))
    );
  } 

    /** GET All Tag */
    find(onlyLabel=false): Observable<Tag[]> {
      const url = `${this.ApiServiceUrl}/find`;
      return this.http.get<Tag[]>(url, {headers:this.Header}).pipe(
        tap(_ => this.log(`fetched find Tags`)),
        catchError(this.handleError('find Tags', []))
      );
    } 

  /** GET One Tag */
  getOne(id: number): Observable<any> {
    const url = `${this.ApiServiceUrl}/${id}`;
    return this.http.get<any>(url, {headers:this.Header}).pipe(
      tap(_ => this.log(`fetched get Tag id=${id}`)),
      catchError(this.handleError<any>(`get Tag id=${id}`))
    );
  }

  /** Add book */
  add(data): Observable<any> {
    const ApiUrl = `${this.ApiServiceUrl}/add`;
    //var formData: any = new FormData();
    return this.http.post<any>(ApiUrl, data, {headers:this.Header})
      .pipe(
        tap(_ => this.log(`fetched add Tag `)),
        catchError(this.handleError<Tag>(`add Tags`))
      );
  }

  /* Update a bookmark */
  update(id:string, data: any): Observable<any> {
    const ApiUrl = `${this.ApiServiceUrl}/${id}`;
    //var formData: any = new FormData();
    return this.http.patch<any>(ApiUrl, data, {headers:this.Header})
      .pipe(
        tap(_ => this.log(`fetched update Tag`)),
        catchError(
          this.handleError<Tag>(`update Tag`)
        )
      );
  }

  /** Delete one book  */
  delete(id: string): Observable<any> {
    let ApiUrl = `${this.ApiServiceUrl}/${id}`;
    return this.http.delete<any>(ApiUrl, {headers:this.Header})
      .pipe(
        tap(_ => this.log(`fetched delete Tag `)),
        catchError(this.handleError<any>(`delete Tag`))
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
