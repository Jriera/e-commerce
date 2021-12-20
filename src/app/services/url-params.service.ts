import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlParamsService {
  urlParams=new Subject<string>();// create the subject, that is the data we want to watch
  constructor() {}

  get() {
    return this.urlParams.asObservable();//creae the observable that streams the data changes
  }

  set(urlParams: string) {
    this.urlParams.next(urlParams);// update the value of the subject
  }
}
