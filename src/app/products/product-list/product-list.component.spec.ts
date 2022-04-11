import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IProduct } from 'src/app/data/product.model';
import { ProductListComponent } from './product-list.component';

xdescribe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productData:IProduct[];
  let mockProductApiService:any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListComponent ]
    })
    .compileComponents();
  });
//Create the test data and mock object for apiservice
  beforeEach(async()=>{
    productData=[{
      "id":1,
      "productName":"Lavendar",
      "productCode":"HERB-LMG",
      "description": "Used in Perfumes",
      "price":80.5,
      "releaseDate":new Date(2021,8,7),
      "imageUrl":"assets/images/lavendar.jpg",
      "starRating":1.3
},
{
            
  "id":2,
  "productName":"Lemon Grass",
  "productCode":"HERB-LMG",
  "description": "Used in soups and Thai cuisines",
  "price":180.5,
  "releaseDate":new Date(2020,10,7),
  "imageUrl":"assets/images/lemongrass.jpg",
  "starRating":2.5


}
]
mockProductApiService=jasmine.createSpyObj(['getProducts'])
component=new ProductListComponent(mockProductApiService);
  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should retrive the all products',()=>{
    mockProductApiService.getProducts.and.returnValue(of(productData));
    
    component.ngOnInit();
    expect(component.products.length).toBe(2);
    // expect(component.products[1].productName).toBe('Lemon Grass')
  })
  it('should call getProducts',()=>{
    //Arrange
    mockProductApiService.getProducts.and.returnValue(of(productData));
    //Assert
    component.ngOnInit();
    expect(mockProductApiService.getProducts).toHaveBeenCalled();
  })
});
