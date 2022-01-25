import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
  admin:boolean  = false;
  adminSubj = new BehaviorSubject(this.admin);
  admin$ = this.adminSubj.asObservable();

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

  getUsers():Observable<User[]>{
    return this.http.get<User[]>('https://nest-commerce-api.herokuapp.com/users');
  }

  isAdmin(uid:string){
    
    this.getUsers().subscribe(users=>{
      const selectedUser=users.filter(user=>user.uid ===uid)
      if(selectedUser[0].admin){
        this.admin=true;
        this.adminSubj.next(this.admin);
      }
      
    });


  }

      
    

  
}
