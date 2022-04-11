import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth-service";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
    providedIn:'root'
})
export class CheckUserAuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router, private jwtHelperService: JwtHelperService){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        let token;
        let email=null;
        if(this.authService.getIsAuthenticated()){
            token=sessionStorage.getItem('token');
            //if token exists for a user, retrieve the email(required) information
            if(token){
                token=JSON.stringify(sessionStorage.getItem('token'));
                email=this.jwtHelperService.decodeToken(token).email;
                console.log("Email: ",email);
            }
        }
        if(this.authService.getIsAuthenticated() && email==route.data['userName']){
            return true;
        }
        else{
            // throw new HttpErrorResponse({
            //     error : ""
            // })
            return false
        }
    }

}