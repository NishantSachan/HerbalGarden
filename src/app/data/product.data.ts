import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { IProduct } from "./product.model";
@Injectable({
    providedIn:'root',
})
export class ProductDataService implements InMemoryDbService{
    createDb(){
    
    const products : IProduct[]= [
            {
                
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
           
        
            },
            {
                "id":3,
                "productName":"Thyme",
                "productCode":"HERB-THY",
                "description":"Used for medical purposes",
                "price":250.5,
                "releaseDate":new Date(2021,7,9),
                "imageUrl":"assets/images/thyme.jpg",
                "starRating":4.5
       
            }

        ];
        return {products};
    }
}
