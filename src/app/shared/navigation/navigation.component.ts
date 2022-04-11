import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth-service";

@Component({
    selector: 'app-nav',
    templateUrl: './navigation.component.html'
  })
  
export class NavigationComponent implements OnInit, OnDestroy{
  userIsAuthenticated=false;
  private authListenerSub$:any;
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.userIsAuthenticated=this.authService.getIsAuthenticated();
    this.authListenerSub$=this.authService.getAuthStatusListener().subscribe(
      isAuthenticated=>{
        this.userIsAuthenticated=isAuthenticated;
      }
    )
  }
  onLogout(){
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.authListenerSub$.unsubscribe();
  }
}