/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
 import { Injectable } from '@angular/core';
 import { environment } from '../../environments/environment';
 import { AuthorModel, Author } from '../_models/author';
 import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { Observable, of } from 'rxjs';
 import { catchError, map, tap } from 'rxjs/operators';
 import { AuthService } from '../auth.service';
 
 @Injectable({
   providedIn: 'root'
 })
 export class AuthorService {
 
   // le point d’accés à notre API
   private ApiServiceUrl = `${environment.apiUrl}author`;
   constructor(private http: HttpClient, private authService: AuthService) { }
 
   get Header() {
     return new HttpHeaders().set("Authorization","Bearer " + this.AuthToken);
   }
 
   get AuthToken() {
     return this.authService.getAuthToken();
   }
 
   /** GET All Books */
   getAll(): Observable<Author[]> {
     const url = `${this.ApiServiceUrl}`;
     return this.http.get<Author[]>(url, {headers:this.Header}).pipe(
       tap(_ => this.log(`fetched getAll Authors`)),
       catchError(this.handleError('getAll Authors', []))
     );
   } 
 
 
   /** GET One Author */
   getOne(id: number): Observable<any> {
     const url = `${this.ApiServiceUrl}/${id}`;
     return this.http.get<any>(url, {headers:this.Header}).pipe(
       tap(_ => this.log(`fetched getOne Author id=${id}`)),
       catchError(this.handleError<any>(`getOne Author id=${id}`))
     );
   }
 
   /** Add book */
   add(data): Observable<any> {
     const ApiUrl = `${this.ApiServiceUrl}/add`;
     //var formData: any = new FormData();
     return this.http.post<any>(ApiUrl, data, {headers:this.Header})
       .pipe(
         tap(_ => this.log(`fetched add Author `)),
         catchError(this.handleError<Author>(`add Author`))
       );
   }
 
   /* Update a book */
   update(id:string, data: any): Observable<any> {
     const ApiUrl = `${this.ApiServiceUrl}/${id}`;
     //var formData: any = new FormData();
     return this.http.patch<any>(ApiUrl, data, {headers:this.Header})
       .pipe(
         tap(_ => this.log(`fetched update Author`)),
         catchError(
           this.handleError<Author>(`update Author`)
         )
       );
   }
 
   /** Delete one book  */
   delete(id: string): Observable<any> {
     let ApiUrl = `${this.ApiServiceUrl}/${id}`;
     return this.http.delete<any>(ApiUrl, {headers:this.Header})
       .pipe(
         tap(_ => this.log(`fetched delete Author `)),
         catchError(this.handleError<any>(`delete Author`))
       );
   }
   
   
   /* handleError */
   private handleError<T>(operation = 'operation', result?: T) {
     return (error: any): Observable<T> => {
       console.log(`${operation} failed: ${error.message}`);
       console.error(error);
       return of(result as T);
     };
   }
 
   /* log */
   private log(log: string) {
     console.info(log);
   }
 
 }