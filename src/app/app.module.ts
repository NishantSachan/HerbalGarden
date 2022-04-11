import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { ErrorPageComponent } from './shared/error.component';
import { ProductModule } from './products/product.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductDataService } from './data/product.data';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    // InMemoryWebApiModule.forRoot(ProductDataService),
    HttpClientModule,
    ProductModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
