//angular imports
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

//firebase imports
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
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
  constructor(private ngfa: AngularFireAuth, private ngfs: AngularFirestore) {
    this.authStatusUpdate();
    this.redirectResult();
  }

  currentUserUID: string | null = null; //everytime a user logs in an UID is returned, otherwise it returns null
  authStatusSubj = new BehaviorSubject(this.currentUserUID); //we create a subject to keep track of any changes in the log in status of users
  currentUser$ = this.authStatusSubj.asObservable(); // we create an observable that will be used to watch for changes in login status

  currentUser: User | null = null; //we create a user object to keep track of the current user
  userSubject = new BehaviorSubject(this.currentUser);
  user$ = this.userSubject.asObservable(); //we create an observable that will be used to watch for changes in the current user

  authStatusUpdate() {
    //this function is used to update the login status of the user and is called in the service constructor
    this.ngfa.onAuthStateChanged((user) => {
      this.currentUserUID = user ? user.uid : null;
      this.currentUser = user ? user : null;
      this.authStatusSubj.next(this.currentUserUID);
      this.userSubject.next(this.currentUser);
    });
  }

  async redirectResult() {
    //this function captures the login information after the provider redirect login
    try {
      const result = await this.ngfa.getRedirectResult();

      if (result.user) {
        const user: User = {
          uid: result.user.uid,
          email: result.user.email,
          photoURL: result.user.photoURL,
          displayName: result.user.displayName,
          myCustomData: '',
          admin: false,
          isAnonymous: false,
          phoneNumber: '',
        };
        this.addUser(user); //we add the user to the users collection in firestore
      }

      return result.user;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async emailSignUp(email: string, password: string) {
    //this function is used to create a new user from the email and password provided
    try {
      const res = await this.ngfa.createUserWithEmailAndPassword(
        email,
        password
      );
      console.log(res);
      return res;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async emailSignIn(email: string, password: string) {
    //this function is used to login a user from the email and password provided
    try {
      const userCredential = await this.ngfa.signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        const fsUser: User = {
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
          myCustomData: '',
          admin: false,
          isAnonymous: false,
          phoneNumber: '',
        };
        this.addUser(fsUser); //we add the user to the users collection in firestore
      }
      console.log(user);
      return user;

      
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async googleLoginRedirect() {
    //this function is used to login a user from the google account using a redirect
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

  signOut() {
    //this function is used to sign out a user
    this.ngfa.signOut();
  }

  //TODO: extend the user functionality by adding custom datafields, such as admin status. In order to do so we will need to create a new user document in firestore and add the custom datafields to it. The user document will be created in the following way:
  //TODO 1. Create a new user document in firestore
  //TODO 2. Add the custom datafields to the user document
  //TODO 3. Add the user document to the users collection in firestore
  //TODO 4. Add the user document to the current user document in firestore
  //TODO The relation between the user document and the firebase user is done by the uid which will be common and used as a kind of Foreign Key.

  addUser(user: User) {
    //this function is used to add a new user document to the users collection in firestore
    const userRef: AngularFirestoreDocument<User> = this.ngfs.doc(
      `users/${user.uid}`
    );
    userRef.set({ ...user }, { merge: true });
  }

  getUser(uid: string) {
    //this function is used to get a user document from the users collection in firestore
    const userRef: AngularFirestoreDocument<User> = this.ngfs.doc(
      `users/${uid}`
    );
    userRef.valueChanges().subscribe((user) => {
      console.log(user);
      return user;
    });
  }
}
