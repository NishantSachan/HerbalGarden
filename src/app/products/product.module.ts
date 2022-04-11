import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail/product-detail.guard';
import { ProductEditGuard } from './product-edit/product-edit.guard';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AuthModule } from '../auth/auth.module';
import { AuthInterceptor } from '../auth/auth-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CheckUserAuthGuard } from '../auth/checkuser-auth.guard';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './state/product.reducer';
import { ProductCodeComponent } from './product-code/product-code.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductCodeComponent
  ],
  providers:[{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AuthModule,
    JwtModule.forRoot({
      config:{ tokenGetter :()=>{
       return sessionStorage.getItem('token') ? JSON.parse(sessionStorage.getItem('token') as string).token : null 
      }}
    }),
    RouterModule.forChild([
      {
        path: 'products',
        component: ProductListComponent
      },
      {
        path: 'products/:id',
        component: ProductDetailComponent,
      },
      {
        path: 'products/:id/edit',
        component: ProductEditComponent,
        canActivate:[ProductEditGuard,CheckUserAuthGuard],
        canDeactivate: [ProductEditGuard],
        data:{userName:"nishant@gmail.com"},
      }
      ]),
    // StoreModule.forFeature('products',productReducer)
  ],
  exports:[FormsModule,ReactiveFormsModule]
})
export class ProductModule { }

