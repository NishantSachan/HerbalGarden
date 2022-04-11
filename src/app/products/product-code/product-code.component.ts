import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/data/product.model';
import { ProductApiService } from 'src/app/services/product.api.services';

@Component({
  selector: 'app-product-code',
  templateUrl: './product-code.component.html',
  styleUrls: ['./product-code.component.css']
})
export class ProductCodeComponent implements OnInit, OnDestroy{

  pageTitle="Products";
  errorMessage!:string;
  displayCode!:boolean;
  products!:IProduct[];
  sub$!:Subscription;
  

  //Used to highlight the selected product in the list
  selectedProduct!:IProduct|null;
  constructor(private apiService:ProductApiService, private store:Store<any>){}
  ngOnInit(): void {
    this.sub$=this.apiService.selectedProductChanges$.subscribe(
      currentProduct=>this.selectedProduct=currentProduct
    );
   this.apiService.getProducts().subscribe({
     next: (products:IProduct[])=>this.products=products,
     error: err=> this.errorMessage=err
   })
  this.store.select('products').subscribe(
    products=>{
      if(products){
        this.displayCode=products.showProductCode
      }
    }
  )
    
  }

  ngOnDestroy():void{
    this.sub$.unsubscribe();
  }
  checkChanged(){
    this.store.dispatch({type: '[Product] Toggle Product Code'})
  }
  productSelected(product:IProduct):void{
    this.apiService.changeSelectedProduct(product)
  }

}
