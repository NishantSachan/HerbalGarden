import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth-service';

import { ProductEditComponent } from './product-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ProductEditGuard implements CanActivate,CanDeactivate<unknown> {
  userIsAuthenticated=false;
  constructor(private router:Router,private authService:AuthService){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.userIsAuthenticated=this.authService.getIsAuthenticated();
    if(!this.userIsAuthenticated){
      alert("Please Login First");
      this.router.navigate(['/login'])
    return false;
    }
    return true;
  }
  canDeactivate(component:ProductEditComponent):boolean
  {
    if(component.productForm.dirty){
      const prodName=component.product.productName || 'New Product'
      return confirm(`Would you like to navigate and loose all changes to ${prodName}`)
    }
    return true;
  }
  
}
