import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IProduct } from 'src/app/data/product.model';
import { ProductDetailComponent } from './product-detail.component';

xdescribe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let productData:IProduct;
  let mockProductApiService:any;
  let mockActivateRoute:any;
  let mockRouter:any;
  let mockauthservice:any;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    productData={
      "id":1,
      "productName":"Lavendar",
      "productCode":"HERB-LMG",
      "description": "Used in Perfumes",
      "price":80.5,
      "releaseDate":new Date(2021,8,7),
      "imageUrl":"assets/images/lavendar.jpg",
      "starRating":1.3
    }
    mockProductApiService=jasmine.createSpyObj(['getProduct'])
    component=new ProductDetailComponent(mockProductApiService,mockActivateRoute,mockRouter,mockauthservice);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should retrive the product',()=>{
    mockProductApiService.getProduct.and.returnValue(of(productData));
    
    component.getProduct(1);
    expect(component.product.productName).toBe('Lavendar')
  });
  it('should call getProduct',()=>{
    //Arrange
    mockProductApiService.getProduct.and.returnValue(of(productData));
    //Assert
    component.getProduct(1);
    expect(mockProductApiService.getProduct).toHaveBeenCalledWith(1);
    
  });
  it('should return a error',()=>{
    mockProductApiService.getProduct.and.returnValue(of(productData));
    component.getProduct(0)
    expect(component.errorMessage).toContain('Backend returned with code')
  })
});
