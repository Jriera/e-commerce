import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  url:string = environment.baseUrl;

  constructor(private http:HttpClient) { }
  
  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(this.url+'/products');
  }
  getProduct(id:number):Observable<Product>{
    return this.http.get<Product>(this.url+'/products/'+id);
  }
  getProductsByCategory(category:string):Observable<Product[]>{
    return this.http.get<Product[]>(this.url+'/products/category/'+category);
  }

  getMenClothingProducts():Observable<Product[]>{
    const menClothing = "men's clothing";
    return this.http.get<Product[]>(this.url+'/products/category/'+menClothing);
  }
  getWomenClothingProducts():Observable<Product[]>{
    const womenClothing = "women's clothing";
    return this.http.get<Product[]>(this.url+'/products/category/'+womenClothing);
  }
    


}
