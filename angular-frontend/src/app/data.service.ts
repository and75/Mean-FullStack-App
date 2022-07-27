import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  /*dataPath:string = "./../data/";
  
  constructor(private http:HttpClient) {

  }

  loadData(type:string): Observable<any> {
      let authToken = this.getAuthToken();
      let ApiUrl = `${this.ApiServiceUrl}user.validatetoken&auth_token=${authToken}`;
      console.log(ApiUrl)
      return this.http.get<any>(ApiUrl).pipe(
          tap(_ => this.log(`fetched ctrlToken `+authToken)),
          catchError(this.handleError<User>(`login`))
      );
    }
  }
  
  select(type:string, values:object):object{
      return {'result':'stocazzo'}
  }*/


}
