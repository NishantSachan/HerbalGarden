export interface IProduct {
    id:number,
    productName:string,
    productCode:string,
    description:string,
    price:number,
    tags?:string[],
    imageUrl:string,
    releaseDate:Date,
    starRating:number
}
