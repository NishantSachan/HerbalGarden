import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { IProduct } from "../data/product.model";


@Injectable({
    providedIn:'root'
})
export class ProductApiService{
    private productsUrl='http://localhost:3000/api/products'
    indexArray!:IProduct[];
    index!: IProduct;
    constructor(private http:HttpClient){}
    private selectedProductSource =new BehaviorSubject<IProduct |null >(null);
    selectedProductChanges$ =this.selectedProductSource.asObservable();
    changeSelectedProduct(selectedProduct:IProduct|null):void{
        this.selectedProductSource.next(selectedProduct);
    }
    getProducts():Observable<IProduct[]>{
        return this.http.get<IProduct[]>(this.productsUrl).pipe(tap(data=>{console.log("All Products "+JSON.stringify(data));this.indexArray=data}),catchError(this.handleError));
    }

    getProduct(id:number):Observable<IProduct>{
        if(id===0){
            return of(this.initializeProduct());
        }
        const url=`${this.productsUrl}/${id}`
        return this.http.get<IProduct>(url).pipe(tap(data=>console.log("Product "+JSON.stringify(data))),catchError(this.handleError));
    }
    createProduct(product:IProduct){
        const headers=new HttpHeaders({'Content-Type':'application/json'});
        this.index=(this.indexArray.pop() || this.initializeProduct());
        product.id=this.index.id+1
        return this.http.post<IProduct>(this.productsUrl,product,{headers}).pipe(tap(data=>console.log("Created Product: "+JSON.stringify(data))),catchError(this.handleError));
    
    }

    updateProduct(product:IProduct){
        const url=`${this.productsUrl}/${product.id}`
        const headers=new HttpHeaders({'Content-Type':'application/json'})
        return this.http.patch<IProduct>(url,product,{headers}).pipe(
            tap(() => console.log(" Updated Product: "+ product.id)),
            map(() =>product),         
            catchError(this.handleError) );    
    }
    deleteProduct(id:number){
        const url=`${this.productsUrl}/${id}`
        const headers=new HttpHeaders({'Content-Type':'application/json'});
        return this.http.delete<IProduct>(url,{headers}).pipe(tap(data=>console.log("Deleted Product: "+JSON.stringify(data))),catchError(this.handleError));
    }

    //Helper method for Error handling
    private handleError(err:any){
        let errorMessage:string;
        if(err.error instanceof ErrorEvent){
            errorMessage=`An error occured ${err.error.message}`
        }
        else{
            errorMessage=`Backend returned with code ${err.status} : ${err.body.error}`
        }
        console.log(err);
        return throwError(errorMessage);
    }
    //helper method to initialize a new product.
    private initializeProduct():IProduct{
        return {
            id:0,
            productName:"",
            productCode:"",
            description:"",
            price:0,
            tags:[""],
            imageUrl:"",
            releaseDate:new Date(''),
            starRating:0
        }
    }
}