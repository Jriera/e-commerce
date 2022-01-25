import { Injectable } from '@angular/core';
import { user } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { FirebaseService } from './services/firebase.service';
import { UserHttpService } from './services/user-http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private uHttp:UserHttpService, private fb:FirebaseService){
    if(this.fb.currentUserUID){
      this.uHttp.isAdmin(this.fb.currentUserUID)
    }
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.uHttp.admin
    
  }
  
}
