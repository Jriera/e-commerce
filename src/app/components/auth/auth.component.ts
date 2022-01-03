import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { FormBuilder, Validators } from '@angular/forms';

import { GoogleAuthProvider } from 'firebase/auth';
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


/* signin(email:string,password:string){
  this.auth.signInWithEmailAndPassword(email,password)
  .then(userCredential=>{
    const user = userCredential.user;
   
    console.log(user);
  })
  .catch(err=>{
    console.log(err);
  })
} */

googleLogin(){
  this.firebaseService.googleLoginRedirect();
}

async getGoogleResult(){
  const result = await this.firebaseService.redirectResult();
  console.log(result);
}

/* googleLogin(){
  const provider = new GoogleAuthProvider();
  this.auth.signInWithPopup(provider)
  .then(result=>{
    if (result.credential) {
      // @type {firebase.auth.OAuthCredential} 
      var credential:any = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // ...
    }
    
    console.log(result);
    console.log(token)
  })
  .catch(err=>{
    console.log(err);
  })
} */



currentUser(){
  this.auth.onAuthStateChanged(user=>{
    console.log(user);
  });
}


}
