import { Component, OnDestroy, OnInit } from '@angular/core';
import { IProduct } from '../../data/product.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductApiService } from 'src/app/services/product.api.services';
import { AuthService } from 'src/app/auth/auth-service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit,OnDestroy {
pageTitle="Product Detail"
product!:IProduct;
  imageWidth!: 100;
  imageMargin=5;
  sub$!:Subscription;
  errorMessage!:string;
  id!:number
  userIsAuthenticated=false;

constructor(private apiService:ProductApiService, private route:ActivatedRoute, private router:Router,private authService:AuthService) { }

  ngOnInit(): void {
    const param=this.route.snapshot.paramMap.get('id');
    if(param){
      this.id=Number(param)
      
        this.getProduct(this.id);
    }
    this.userIsAuthenticated=this.authService.getIsAuthenticated();
  }
  getProduct(id:number){
    this.sub$=this.apiService.getProduct(id).subscribe({
      next:data=>this.product=data,
      error:err=>this.errorMessage=err
    })    
  }
  onBack(){
    this.router.navigate(['/products']);
  }  
  onEdit(){
    if(!isNaN(this.id)){
    this.router.navigate(['products/'+this.id+'/edit']);
    }
  }
  delete(){
    if(!isNaN(this.id)){
      this.sub$=this.apiService.deleteProduct(this.id).subscribe({
        next:() => this.onBack(),
        error:err=>this.errorMessage=err
      })
      this.onBack();
      }
  }
  ngOnDestroy():void{
    if(this.sub$){
    this.sub$.unsubscribe();
    }
  }
}
