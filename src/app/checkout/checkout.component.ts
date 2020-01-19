import { Component, OnInit } from '@angular/core';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  myCart: any = [{name: "marco", price: 10}];

  constructor(private _shareService: ShareService) { }

  getCartItems() {
  	this._shareService.cart
  	  .subscribe(
  	    product => {
  	    	if (!this.myCart.includes(product)) {
	  	    	if (product.added) {
		  	    	this.myCart.push(product)
              		// this.subtotal += product.price;
		  	    	console.log(this.myCart)
	  	    	} else {
	  	    		this.myCart = this.myCart.filter(item => item != product);
	  	    	}
  	    	}
  	    }
  	  )
  }

  ngOnInit() {
  	this.getCartItems();
  }

}
