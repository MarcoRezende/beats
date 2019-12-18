import { Component, OnInit } from '@angular/core';
import { ShareService } from './share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'beats';
  myCart: any = [];

  constructor(private _shareService: ShareService) {

  }

  getCartItems() {
  	this._shareService.cart
  	  .subscribe(
  	    product => {
  	    	if (!this.myCart.includes(product)) {
  	    	  product.added = true;
  	    	  this.myCart.push(product)
  	    	}
  	    }
  	  )
  	  console.log(this.myCart)
  }

  removeCartItem(product) {
    product.added = false;
    this.myCart = this.myCart.filter(item => item != product);
  }

  OnInit() {
  	this.getCartItems();
  }
}