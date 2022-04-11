import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { IPicture } from "./Picture";

@Injectable({
    providedIn:'root'
})
export class PictureService{
    private pictures:IPicture[]=[];
    private picturesUpdated=new Subject<IPicture[]>();
    url="http://localhost:3000/api/pictures"
    constructor(private http:HttpClient){}
    addPicture(title:string,content:string,image:File){
        const pictureData=new FormData();
        pictureData.append("title",title)
        pictureData.append("content",content)
        pictureData.append("image",image,title)
        this.http.post<{message:string, pic:IPicture}>("http://localhost:3000/api/pictures",pictureData)
        .subscribe(responseData=>{
            const pic:IPicture={
                id:responseData.pic.id,
                title:title,
                content:content,
                imagePath:responseData.pic.imagePath           
            };
            console.log("Response Data: Id Obtained",pic['id']);
            this.pictures.push(pic);
            this.picturesUpdated.next([...this.pictures]);
        });
    }
}