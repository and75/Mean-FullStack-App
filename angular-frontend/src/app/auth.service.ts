import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, delay } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';
import { User } from './_models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import { LoggedInUser } from './_models/loggedInUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	ctrlLoggedIn: boolean = false; //Is the user logged in?
	ctrlAdmin: boolean = false;
	redirectUrl: string; //Where to redirect the user after authentication?
	private ApiServiceUrl = `${environment.apiUrl}custumer`;
	roles: object = null;

	constructor(
		private localStorage: LocalStorageService, 
		private http: HttpClient
	) { }

	getUserId(){
		return this.localStorage.load('user-id');
	}
	
	getAuthToken(){
		return this.localStorage.load('authtoken');
	}
	
	setSession(res:any) {
		if(res.succes){
			let token = "JzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpva";
			let user:User = decode(res.payload.authToken);
			this.localStorage.store('user-id', user._id);
			this.localStorage.store('authtoken', res.payload.authToken);
			this.localStorage.store('apptoken', token);
		}
	}

	isLoggedIn() {
		if (this.localStorage.load('authtoken')) {
			return this.localStorage.load('authtoken');
		} else {
			return false;
		}
	}

    getLoggedInUser():Promise<LoggedInUser>{
		return new Promise((resolve, reject)=>{
			try {
				const token = this.localStorage.load('authtoken');
				const user:User = decode(this.localStorage.load('authtoken'));
				const ret = {
					name:user.firstName+' '+user.lastName,
					id: user._id
				}
				resolve(ret)
			} catch (error) {
				reject(error)
			}
		});
	}

	//Connection method
	login(formData:any): Observable<any> {
		const ApiUrl = `${this.ApiServiceUrl}/login`;
		return this.http.post<any>(ApiUrl, formData)            
			.pipe(
				tap(res => this.setSession(res)),
				tap(_ => this.log(`fetched login `)),
				catchError(this.handleError<User>(`login`))
			);
	}

	//Disconnection method
	logout():Promise<boolean>{
		const action = new Promise<boolean>((resolve, reject)=>{
			try {
				this.log(`fetched logout `)
				this.localStorage.remove('authtoken');
				this.localStorage.remove('apptoken');
				resolve(true);
			} catch (error) {
				reject(false);
			}
		})
		return action;
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
