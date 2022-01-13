import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { FormBuilder, Validators } from '@angular/forms';

import { GoogleAuthProvider } from 'firebase/auth';
import { User } from 'src/app/models/user';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private auth:AngularFireAuth, 
    private fb:FormBuilder,
    private firebaseService:FirebaseService
    ) { }

  ngOnInit(): void {
    this.getGoogleResult();
    this.currentUser();
  }

  signUpForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  })


signup(email:string,password:string){
    this.firebaseService.emailSignUp(email,password);
  }
login(email:string,password:string){
    this.firebaseService.emailSignIn(email,password);
    
}




googleLogin(){
  this.firebaseService.googleLoginRedirect();
}

async getGoogleResult(){
  const result = await this.firebaseService.redirectResult();
  console.log(result);
}





currentUser(){
  this.auth.onAuthStateChanged(user=>{
    console.log(user);
    
    
  });



}




}
