import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './shared/error.component';

const routes: Routes = [
  { path:'', redirectTo:'home', pathMatch:'full' },
  { path:'index', redirectTo:'home', pathMatch:'full' },
  { path:'home', component:HomeComponent },
  // { path: 'products',
  //     loadChildren:()=>
  //   import('./products/product.module').then(m=>m.ProductModule)
  // },
  { path:"**", component:ErrorPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
