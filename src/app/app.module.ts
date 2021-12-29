import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { BasicNavComponent } from './components/basic-nav/basic-nav.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { StoreInfoComponent } from './components/store-info/store-info.component';
import { FooterComponent } from './components/footer/footer.component';

import { FadeInDirective } from './directives/gsap/fade-in.directive';
import { SlideDirective } from './directives/gsap/slide.directive';
import { FallDirective } from './directives/gsap/fall.directive';
import { CoreAnimationDirective } from './directives/gsap/core-animation.directive';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    ProductListComponent,
    ProductDetailComponent,
    BasicNavComponent,
    CoreAnimationDirective,
    FadeInDirective,
    SlideDirective,
    FallDirective,
    DepartmentsComponent,
    StoreInfoComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
