import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star/star.component';
import { ConvertToSpacesPipe } from './convert-to-spaces.pipe';
import { GalleryComponent } from './gallery/gallery.component';
import { RxjsComponent } from './rxjsdemo';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileuploadComponent } from './fileupload/fileupload.component';



@NgModule({
  declarations: [
    StarComponent,
    GalleryComponent,
    RxjsComponent,
    ConvertToSpacesPipe,
    FileuploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path:'upload', component:FileuploadComponent}
    ])
  ],
  exports:[
    CommonModule,
    StarComponent,
    FormsModule,
    ReactiveFormsModule,
    ConvertToSpacesPipe,
  ]
})
export class SharedModule { }
