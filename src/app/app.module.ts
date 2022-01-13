import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
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
import { InputErrorPrinterComponent } from './components/input-error-printer/input-error-printer.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthComponent } from './components/auth/auth.component';

import { FadeInDirective } from './directives/gsap/fade-in.directive';
import { SlideDirective } from './directives/gsap/slide.directive';
import { FallDirective } from './directives/gsap/fall.directive';
import { CoreAnimationDirective } from './directives/gsap/core-animation.directive';


import { environment } from '../environments/environment';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { ProfileComponent } from './components/profile/profile.component';








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
    InputErrorPrinterComponent,
    AuthComponent,
    ProfileComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
