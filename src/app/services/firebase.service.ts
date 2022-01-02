//angular imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//firebase imports
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { GoogleAuthProvider, onAuthStateChanged } from '@angular/fire/auth';


//rxJS imports
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap, map, expand } from 'rxjs/operators';

//interface imports
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  
  constructor(private ngfa: AngularFireAuth) {
    this.authStatusUpdate();
  }

  
  currentUserUID: string|null = null; //everytime a user logs in an UID is returned, otherwise it returns null
  authStatusSubj = new BehaviorSubject(this.currentUserUID); //we create a subject to keep track of anychanges in the log in status of users
  currentUser$= this.authStatusSubj.asObservable(); // we create an observable that will be used to watch for changes in login status

  authStatusUpdate() { //this function is used to update the login status of the user and is called in the service constructor
    this.ngfa.onAuthStateChanged(user => {
      this.currentUserUID = user ? user.uid : null;
      this.authStatusSubj.next(this.currentUserUID);
    });
  }

  async emailSignUp(email:string,password:string){ //this function is used to create a new user from the email and password provided
    try {
      const res = await this.ngfa.createUserWithEmailAndPassword(email, password);
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async emailSignIn(email:string,password:string){ //this function is used to login a user from the email and password provided
    try {
      const userCredential = await this.ngfa.signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      return user;

      console.log(user);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async googleLoginRedirect(){ //this function is used to login a user from the google account using a redirect
    const provider = new GoogleAuthProvider();
    try {
      const result = await this.ngfa.signInWithRedirect(provider);
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  //TODO: extend the user functionality by adding custom datafields, such as admin status. In order to do so we will need to create a new user document in firestore and add the custom datafields to it. The user document will be created in the following way:
  //TODO 1. Create a new user document in firestore
  //TODO 2. Add the custom datafields to the user document
  //TODO 3. Add the user document to the users collection in firestore
  //TODO 4. Add the user document to the current user document in firestore
  //TODO The relation between the user document and the firebase user is done by the uid which will be common and used as a kind of Foreign Key.




  
}
