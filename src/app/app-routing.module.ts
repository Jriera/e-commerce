import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoggedGuardGuard } from './logged-guard.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'checkout', component:CheckoutComponent},
  {path:'auth', component:AuthComponent},
  {path:'profile', component:ProfileComponent,canActivate:[LoggedGuardGuard]},
  {path:':category', component:ProductListComponent},
  {path:':category/:id', component:ProductDetailComponent},
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'})],//this is to reset to top of window on every route change
  exports: [RouterModule]
})
export class AppRoutingModule { }
