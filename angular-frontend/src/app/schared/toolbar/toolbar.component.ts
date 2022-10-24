import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { LoggedInUser } from 'src/app/_models/loggedInUser';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  public loggedInUser:LoggedInUser = null;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.getloggedInUser();
  }

  getloggedInUser(){
    this.authService.getLoggedInUser().then((res)=>{
      this.loggedInUser = res;
      console.log('this.loggedInUser',this.loggedInUser)    
    });
  }

  logOut(){
    this.authService.logout().then((res)=>{
        this.router.navigate(['/authentication'])
    }).catch(res=>{
       console.error(res);
    });
  }
  
}
