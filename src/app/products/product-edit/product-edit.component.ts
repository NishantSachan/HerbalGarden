import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductApiService } from '../../services/product.api.services';
import { IProduct } from '../../data/product.model';
import { NumberValidator } from '../../shared/validators/number.validator';
import { GenericValidator } from '../../shared/validators/genericValidator';



@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @ViewChildren(FormControlName,{read:ElementRef})formInputElements!:ElementRef[];


  pageTitle!:string;
  
  errorMessage='';
  productForm!:FormGroup;
  products:IProduct[]=[];
  product!:IProduct;
  //Validation properties
  displayMessage:{[key:string] :string} ={};
  private validationMessages!:{[key:string]: {[key:string] : string}}
  private genericValidator:GenericValidator;
  private sub$!:Subscription;
 
  constructor(private fb:FormBuilder , private router:Router,private route:ActivatedRoute,private apiService:ProductApiService) { 
    console.log("From constructor");
    //Defines all of the validation messages for the form.you can also create this in a seperate file or database
    this.validationMessages={
      
      productName : {
        required:'Product name is required',
        minlength:'product name must be atleast 3 characters',
        maxlength: 'product name must not exceed 20 characters'
      },
      productCode : { required : 'Product code is required'},
      price:{
        required:'Price is required',
        range: 'Range must be between 10 and 1000'
      },
      releaseDate:{},
      starRating : {range : 'Rate the product between 1(lowest) and 5(highest)'}

    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {

    //Create a formGroup using Formbuilder .group method
    this.productForm = this.fb.group({
      
      productName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      productCode:['',Validators.required],
      price:['',[Validators.required,NumberValidator.range(10,1000)]],
      releaseDate:[''],
      starRating:['',NumberValidator.range(1,5)],
      tags:this.fb.array([]),
      description:''
    });
    //Read the product id from the route parameter
    this.sub$=this.route.paramMap.subscribe(
     params => { const id=Number(params.get('id'));
      this.getProduct(id)
    }
  );
}

    ngAfterViewInit(){
      //Watch for the blur event from any element on the form 
      const controlsBlurs: Observable<any>[]=this.formInputElements.map(
      (FormControl:ElementRef) => fromEvent(FormControl.nativeElement,'blur'));

      merge(this.productForm.valueChanges,...controlsBlurs).subscribe( value => {
          this.displayMessage = this.genericValidator.processMessage(this.productForm);
        });

      //old code with error processing
      // this.productForm.valueChanges.subscribe( value =>{
      //   this.displayMessage = this.genericValidator.processMessage(this.productForm);
      // })

    }

    
  get tags():FormArray {
    return this.productForm.get('tags') as FormArray
  }

    addTag():void{
      this.tags.push(new FormControl);
    }
    deleteTag(index:number):void{
      this.tags.removeAt(index);
      this.tags.markAsDirty();
    }

    
  getProduct(id:number){
    this.sub$=this.apiService.getProduct(id).subscribe({
      next: (product:IProduct) => this.displayProduct(product),
      error: err=> this.errorMessage=err
    });
 
  }

  displayProduct(product:IProduct){
    if(this.productForm)
    {
      this.productForm.reset();
    }

    //save the received product to the instance property
    this.product=product;
    if(this.product?.id ===0){
      this.pageTitle='Add Product'
    }
    else{
      this.pageTitle=`Edit Product : ${this.product?.productName}`
    }
    //update the data on the form
    this.productForm.patchValue({
      
      productName:this.product.productName,
      productCode:this.product.productCode,
      price:this.product.price,
      tags:this.product.tags,
      releaseDate: new Date(this.product.releaseDate).toISOString().split('T')[0],
      starRating:this.product.starRating,
      description:this.product.description

    });
    this.productForm.setControl('tags',this.fb.array(this.product.tags || [] ));

  }//end of the displayProduct()

    saveProduct(){
      if(this.productForm.valid){
        if(this.productForm.dirty)
        { 
          const p = { ...this.product, ...this.productForm.value};
          if(p.id === 0){
            
            this.apiService.createProduct(p).subscribe(
              {
                next:() => this.OnSaveComplete(),
                error:err=>this.errorMessage=err
              } );

          }
          else{
            this.apiService.updateProduct(p).subscribe(
              {
                next:() => this.OnSaveComplete(),
                error:err=>this.errorMessage=err
              } );
          }
         
      }
      else{
        this.OnSaveComplete();
    }
      }
      else{
        this.errorMessage='please correct the validation error';
        console.log(this.errorMessage)
      }

    }

    OnSaveComplete():void{
      //Reset the form to clear
      this.productForm.reset();
      this.router.navigate(['/products'])
    }
    deleteProduct():void{
      if(this.product.id === 0){
        //Don't delete,because it was never saved
      this.OnSaveComplete();
    }
    else
    {
      if(confirm(`Do you want to delete the product : ${this.product.productName} ?`)){
        this.apiService.deleteProduct(this.product.id).subscribe(
          {
            next:() => this.OnSaveComplete(),
            error : err=>this.errorMessage=err
          }
        );
      }
    }
  }
}