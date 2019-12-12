import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  private _cart = new Subject<any>();
  private _allProducts = new Subject<any>();
  cart = this._cart.asObservable();
  allProducts = this._cart.asObservable();

  constructor() { }

  getProduct(item: any) {
  	this._cart.next(item)
  }

  getAllProduct(products: any) {
  	this._cart.next(products)
  }
}
