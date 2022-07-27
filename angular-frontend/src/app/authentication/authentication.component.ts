/**
 * Proteus-app
 * Node/MongoDb/Angular/Angular Material - Stack
 * by Andrea Porcella 2022
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AlertService } from '../alerts/alert.service';
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit, OnDestroy   {

  title = 'app-test';
  public email: string;
  public password: string;
  public formLogin:any = {
    email:"",
    password:""
  };

  constructor(
    private authService: AuthService,
    public alertService: AlertService,
    private titleService: Title,
    private router: Router) {}

  ngOnInit() {
    this.titleService.setTitle('Authentication');
    this.formLogin.email = '';
    this.formLogin.password = '';
    if (this.authService.isLoggedIn()) {
      this.logout();
    }
  }

  ngOnDestroy(): void {
    this.formLogin.email = '';
    this.formLogin.password = '';
  }
 
  // Connects the user to the Guard
  login() {
    if(this.formLogin.email && this.formLogin.password){
      this.alertService.info('Performing loggin action ... ', {'keepAfterRouteChange':false, 'autoClose':true, 'spinner':false})
      this.authService.login(this.formLogin).subscribe((res:any) => {
        if (res.succes==true) {
          this.alertService.success(res.mess, {'keepAfterRouteChange':true, 'autoClose':true, 'spinner':false})
        } else if(res.succes==false) {
          this.alertService.clear();
          if(res.payload.error=="email"){
            this.formLogin.email=null;
          }
          if(res.payload.error=="password"){
            this.formLogin.password=null;
          }
          if(res.payload.error=="dberror"){
            this.formLogin.password=null;
            this.formLogin.email=null;
          }
          this.alertService.error(res.mess, {'keepAfterRouteChange':false, 'autoClose':true, 'spinner':false})
        }
        if (this.authService.isLoggedIn()) {
          // Retrieve the redirection URL from the authentication service
          // If no redirection has been defined, redirect the user to the list of pokemons.
          //let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
          // Redirect the user
          this.router.navigate(['home']);
        } else {
          this.formLogin.email = '';
          this.formLogin.password= '';
        }
      });
    } 
  }

  // Disconnect the user
  logout() {
    this.authService.logout();
    this.router.navigate(['authentication']);
  }

}


