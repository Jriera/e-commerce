import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from './services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuardGuard implements CanActivate {

  constructor(private fbService:FirebaseService, private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let status:boolean = false
      this.fbService.authStatusSubj.subscribe(authStatus => {
      if(authStatus){
        status = true;
      }
      else{
        status = false;
      }
    });
    status===false?this.router.navigate(['/']):null

    return status;
  }
  
}
