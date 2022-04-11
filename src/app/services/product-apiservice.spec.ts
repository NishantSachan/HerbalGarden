import { ProductApiService } from "./product.api.services"
import { HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { TestBed, waitForAsync } from "@angular/core/testing";
import { IProduct } from "../data/product.model";

xdescribe('Product-ApiService',()=>{
    let productApiService:ProductApiService;
    let HttpClient:HttpTestingController;

    const productData:IProduct[]=[{
                "id":1,
                "productName":"Lavendar",
                "productCode":"HERB-LMG",
                "description": "Used in Perfumes",
                "price":80.5,
                "releaseDate":new Date(2021,8,7),
                "imageUrl":"assets/images/lavendar.jpg",
                "starRating":1.3
    }]    
    beforeEach(async ()=>{
        await TestBed.configureTestingModule({
            imports:[HttpClientTestingModule],
            providers:[ProductApiService]
        });
        productApiService=TestBed.inject(ProductApiService);
        HttpClient=TestBed.inject(HttpTestingController);
    });
    //Test case for http.get() from apiservice
    it('should successfully get products',waitForAsync(()=>{
        //Subscribe to the repsonse and asserts the result
        productApiService.getProducts().subscribe(data=>expect(data).toEqual(productData))
        let request=HttpClient.expectOne("http://localhost:3000/api/products");
        //Send the product data to the client
        request.flush(productData);
    }));
    
    it('should return error if request for products failed', waitForAsync(()=>{
        //hard code the error message
        const errorType='CANNOT_LOAD_PRODUCTS';
        //subscribe to the error and assert the error
        productApiService.getProducts().subscribe(()=>{},errorResponse=>expect(errorResponse.error).toEqual(errorType))
        let request=HttpClient.expectOne("http://localhost:3000/api/products");
        request.error(new ErrorEvent(errorType))
    }))
    //test there are no outstanding request
    afterEach(()=>HttpClient.verify);

})