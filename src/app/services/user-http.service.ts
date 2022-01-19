import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  constructor(private http:HttpClient) { }

  saveUser(user:User){
    return this.http.post('https://nest-commerce-api.herokuapp.com/users',{
      "email":user.email,
      "uid":user.uid,
      "displayName":user.displayName,
      "photoURL":user.photoURL,
      "admin":false
    });
  }

  
}
