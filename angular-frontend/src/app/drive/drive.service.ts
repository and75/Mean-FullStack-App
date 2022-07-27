/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */
 import { Injectable,Inject } from '@angular/core';
 import { environment } from '../../environments/environment';
 import { DriveModel, Drive } from '../_models/drive';
 import { HttpClient, HttpHeaders } from '@angular/common/http';
 import { Observable, of } from 'rxjs';
 import { catchError, tap } from 'rxjs/operators';
 import { AuthService } from '../auth.service';

 @Injectable({
   providedIn: 'root'
 })
 export class DriveService {
 
   
   private ApiServiceUrl = `${environment.apiUrl}drive`;
   
   constructor(
     private http: HttpClient, 
     private authService: AuthService) { }
 
   get Header() {
     return new HttpHeaders().set("Authorization","Bearer " + this.AuthToken);
   }
 
   get AuthToken() {
     return this.authService.getAuthToken();
   }
 
   /** GET All Books */
   getDrivers(): Observable<Drive[]> {
     const url = `${this.ApiServiceUrl}`;
     return this.http.get<DriveModel[]>(url, {headers:this.Header}).pipe(
       tap(_ => this.log(`fetched getDrivers (all)`)),
       catchError(this.handleError('getDrivers (all)', []))
     );
   } 
 
 
   /** GET One Drive */
   getDrive(id: number): Observable<any> {
     const url = `${this.ApiServiceUrl}/${id}`;
     return this.http.get<any>(url, {headers:this.Header}).pipe(
       tap(_ => this.log(`fetched getDrive id=${id}`)),
       catchError(this.handleError<any>(`getDrive id=${id}`))
     );
   }
 
   /** Add book */
   addDrive(data): Observable<any> {
     console.log(data);
     const ApiUrl = `${this.ApiServiceUrl}/add`;
     //var formData: any = new FormData();
     return this.http.post<any>(ApiUrl, data, {headers:this.Header})
       .pipe(
         tap(_ => this.log(`fetched addDrive `)),
         catchError(this.handleError<Drive>(`addDrive`))
       );
   }
 
   /* Update a Drive */
   updateDrive(id:string, data: any): Observable<any> {
     const ApiUrl = `${this.ApiServiceUrl}/${id}`;
     //var formData: any = new FormData();
     return this.http.patch<any>(ApiUrl, data, {headers:this.Header})
       .pipe(
         tap(_ => this.log(`fetched updateDrive`)),
         catchError(
           this.handleError<Drive>(`updateDrive`)
         )
       );
   }
 
   /** Delete one drive element  */
   deleteDrive(id: string): Observable<any> {
     let ApiUrl = `${this.ApiServiceUrl}/${id}`;
     return this.http.delete<any>(ApiUrl, {headers:this.Header})
       .pipe(
         tap(_ => this.log(`fetched deleteDrive `)),
         catchError(this.handleError<any>(`deleteDrive`))
       );
   }
 
   downloadDrive(id: string): Observable<any> {
     let ApiUrl = `${environment.apiUrl}drive/download/${id}`;
     return this.http.get<any>(ApiUrl, {
       headers:this.Header,
       responseType: 'blob' as 'json',
       reportProgress: true,
       observe: 'events'
      })
       .pipe(
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