import { Component, OnInit } from '@angular/core';
import { ShareService } from './share.service';
import { Router, Event, NavigationEnd } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'beats';
  myCart: any = [];
  subtotal: number = 0;
  home: boolean = true;

  constructor(private route: ActivatedRoute, private _shareService: ShareService, private router: Router) {
    router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd ) {
        this.home = event.url === '/' ? true : false;
        console.log(this.home)
      }
    });
  }

  getCartItems() {
  	this._shareService.cart
  	  .subscribe(
  	    product => {
  	    	if (!this.myCart.includes(product)) {
  	    	  product.added = true;
  	    	  this.myCart.push(product)
            this.subtotal += product.price;
  	    	}
  	    }
  	  )
  }

  removeCartItem(product) {
    product.added = false;
    this.myCart = this.myCart.filter(item => item != product);
    this.subtotal -= product.price;

  }

  OnInit() {
  	this.getCartItems();
  }
}