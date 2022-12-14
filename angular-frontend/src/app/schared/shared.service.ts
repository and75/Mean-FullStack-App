import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders,HttpParams } from '@angular/common/http';
import { Observable, shareReplay, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Comment } from '../_models/comment';
import { Activity} from '../_models/activity'


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private ApiServiceUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  get Header() {
    return new HttpHeaders().set("Authorization", "Bearer " + this.AuthToken);
  }

  get AuthToken() {
    return this.authService.getAuthToken();
  }

  driveUpload(file: File, data: any): Observable<HttpEvent<any>> {
    //this.log(data);
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('obj', JSON.stringify(data));
    const req = new HttpRequest('POST', `${this.ApiServiceUrl}drive/upload`, formData, {
      headers: this.Header,
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req).pipe();
  }

  driveDownload(id: string): Observable<any> {
    let ApiUrl = `${environment.apiUrl}drive/download/${id}`;
    return this.http.get<any>(ApiUrl, {
      headers: this.Header,
      responseType: 'blob' as 'json',
      reportProgress: true,
      observe: 'events'
    }).pipe(
        shareReplay(1),
        catchError(this.handleError<any>(`downloadPdf`))
    );
  }

  driveGetFiles(): Observable<any> {
    return this.http.get(`${this.ApiServiceUrl}drive/`);
  }

  /** GET All Comment */
  commentGetAll(relObj:string): Observable<Comment[]> {
    const url = `${this.ApiServiceUrl}comment/for/${relObj}`;
    return this.http.get<Comment[]>(url, {headers:this.Header}).pipe(
      tap(_ => this.log(`fetched  SharedModule -> commentGetAll`)),
      catchError(this.handleError('Error SharedModule -> commentGetAll', []))
    );
  } 

  /** Add comment */
  commentAdd(data): Observable<any> {
    const ApiUrl = `${this.ApiServiceUrl}comment/add`;
    //var formData: any = new FormData();
    return this.http.post<Comment>(ApiUrl, data, {headers:this.Header})
      .pipe(
        tap(_ => this.log(`fetched SharedModule -> commentAdd `)),
        catchError(this.handleError<any>(`Error SharedModule -> commentAdd`))
      );
  }

  /* Update a bookmark */
  commentUpdate(id:string, data: any): Observable<any> {
    const ApiUrl = `${this.ApiServiceUrl}comment/${id}`;
    //var formData: any = new FormData();
    return this.http.patch<Comment>(ApiUrl, data, {headers:this.Header})
      .pipe(
        tap(_ => this.log(`fetched SharedModule -> commentUpdate`)),
        catchError(
          this.handleError<any>(`Error SharedModule ->  commentUpdate`)
        )
      );
  }

  /** Delete one book  */
  commentDelete(id: string): Observable<any> {
    let ApiUrl = `${this.ApiServiceUrl}comment/${id}`;
    return this.http.delete<Comment>(ApiUrl, {headers:this.Header})
      .pipe(
        tap(_ => this.log(`fetched SharedModule ->  commentDelete `)),
        catchError(this.handleError<any>(`Error SharedModule ->  commentDelete`))
      );
  }

  activityGetAll(skip:number, limit:number, subject:string){
    const url = `${this.ApiServiceUrl}activity/`;
    let queryParams = new HttpParams();
    queryParams = queryParams.append("limit",limit);
    queryParams = queryParams.append("skip",skip);
    queryParams = queryParams.append("subject",subject);
    return this.http.get<any>(url, {headers:this.Header, params:queryParams}).pipe(
      tap(_ => this.log(`fetched SharedModule ->  activityGetAll`)),
      catchError(this.handleError('Error SharedModule ->  activityGetAll', []))
    );
  }

  statsGetReport(){
    const url = `${this.ApiServiceUrl}stats/global-report`;
    return this.http.get<Activity[]>(url, {headers:this.Header}).pipe(
      tap(_ => this.log(`fetched statsGetReport ->  activityGetAll`)),
      catchError(this.handleError('Error SharedModule ->  statsGetReport', []))
    );
  }

  activityGetAllForUser(){}
  activityDelete(){}

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
