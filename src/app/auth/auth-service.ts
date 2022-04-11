import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";

@Injectable({
    providedIn:"root"
})
export class AuthService{
    authUrl="http://localhost:3000/api/";
    private token!:string |null;
    private isAuthenticated=false;
    private authStatusListener = new Subject<boolean>();
    private tokenTimer:any;
    constructor(private http:HttpClient,private router:Router){}
    getToken(){
        console.log("from method",this.token)
        return this.token;
    }
    getAuthStatusListener(){
        return this.authStatusListener.asObservable();
    }
    getIsAuthenticated(){
        return this.isAuthenticated;
    }
    createUser(email:string,password:string){
        const authData:AuthData={email:email, password:password};
        this.http.post(this.authUrl+'signup',authData).subscribe(response=>{
            console.log(response);
            this.router.navigate(['/']);
        })
    }
    login(email:string,password:string){
        const authData:AuthData={email:email,password:password};
        this.http.post<{token:string,expiresIn:number}>(this.authUrl+"login",authData).subscribe(response=>{
            const token=response.token;
            this.token=token;
            if(token){
            const expiresInDuration=response.expiresIn;
            this.isAuthenticated=true;
            this.authStatusListener.next(true);
            const now=new Date();
            const expirationDate= new Date(now.getTime()+expiresInDuration*1000);
            console.log(expirationDate);
            this.saveAuthData(token,expirationDate);
            console.log(this.token);
            this.router.navigate(['/']);
            }
        })
    }
    logout(){
        this.token=null;
        this.isAuthenticated=false;
        this.authStatusListener.next(false);
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/'])
    }
    private setAuthTimer(duration:number){
        console.log("setting timer:"+duration);
        this.tokenTimer=setTimeout(()=>{
            this.logout();
        },duration*1000);
    }
   private saveAuthData(token:string, expirationDate:Date){
       sessionStorage.setItem("token",token);
       sessionStorage.setItem("expiration",expirationDate.toISOString());
   }
   private clearAuthData(){
       sessionStorage.removeItem("token");
       sessionStorage.removeItem("expiration");
   }
}