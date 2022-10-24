import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable, shareReplay, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Activity } from '../_models/activity'

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  private ApiServiceUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  get Header() {
    return new HttpHeaders().set("Authorization", "Bearer " + this.AuthToken);
  }

  get AuthToken() {
    return this.authService.getAuthToken();
  }

  globalReport() {
    const url = `${this.ApiServiceUrl}stats/global-report`;
    return this.http.get<Activity[]>(url, { headers: this.Header }).pipe(
      tap(_ => this.log(`fetched statsGetReport ->  activityGetAll`)),
      catchError(this.handleError('Error SharedModule ->  statsGetReport', []))
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
