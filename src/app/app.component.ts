import { Component, ViewChild } from '@angular/core';
import { MessageService } from './data/message.service';
import { GalleryComponent } from './shared/gallery/gallery.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'herbgarden';
  @ViewChild(GalleryComponent)
  gallery!:GalleryComponent;
  constructor(private messageService:MessageService){}
  message:string=this.messageService.displayMessage();
  addNewPicture(){
    this.gallery.pictures.unshift(this.gallery.generateImage())
  }
  removeFirstPicture(){
    this.gallery.pictures.shift()
  }

}
