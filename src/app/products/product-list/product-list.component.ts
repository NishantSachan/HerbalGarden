import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IProduct } from '../../data/product.model';

import { ProductApiService } from '../../services/product.api.services';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit,AfterViewInit{
  products$!: Observable<IProduct[]>;
  showImage:boolean=false;
  imageWidth=50;
  imageMargin=3;
  
  filteredProducts!:IProduct[]
  // sub!: Subscription;
  @ViewChild('input')filteredElementRef:any;
  errorMessage:string='';

_listFilter!:string;
  
set listFilter(value:string){
  this._listFilter=value;
  //this.filteredProducts=this.listFilter ? this.performFilter(this.listFilter):this.products$;
}
get listFilter():string{
  return this._listFilter;
}

constructor( private apiService:ProductApiService){
  console.log("****"+this.filteredElementRef)
}
ngAfterViewInit(){
  // this.filteredElementRef.nativeElement.focus();
  // console.log("From After View Init "+this.filteredElementRef)
}

performFilter(filterBy:string){
  let products:any=[];
  filterBy=filterBy.toLocaleLowerCase();
  this.products$.subscribe({
    next:pdts=>products=pdts
  })
  return products.filter((product:IProduct)=>{
    return product.productName.toLocaleLowerCase().indexOf(filterBy);
  })
  // return this.products.filter((product:IProduct)=>{
  //   return product.productName.toLocaleLowerCase().indexOf(filterBy)!==-1;
  // })
}
  ngOnInit(): void {
    this.products$=this.apiService.getProducts()
    .pipe(
      catchError(err=>
        {this.errorMessage=err
        return of([])})
    )
    // this.sub=this.apiService.getProducts().subscribe(
    //   {next:product=>{this.products=product},
    //   error:err=>this.errorMessage=err      
    // }
    // );
    // // this.products=this.productService.getProducts();
    // this.filteredProducts=this.products;
  }

  toggleImage():void{
    this.showImage=!this.showImage;
  }
  pdtMessage=""
  onRatingClicked(message:string){
    this.pdtMessage=message;
  }
  selectedProduct:string='none';
  
  getSelected(product:IProduct):boolean{
    return product.productName==this.selectedProduct;
  }
  // ngOnDestroy():void{
  //   this.sub.unsubscribe();
  // }

  

}
