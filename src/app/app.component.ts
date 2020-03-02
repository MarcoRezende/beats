import { Component, OnInit } from '@angular/core';
import { ShareService } from './share.service';
import { Router, ActivatedRoute, Event, NavigationEnd } from '@angular/router';

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
        setTimeout(() => this.getCartItems(), 100);
      }
    });
  }

  getCartItems() {
    this.myCart = this.myCart.filter(item => item.added === true);

  	this._shareService.cart
  	  .subscribe(
  	    (obj) => {
          if (obj.task === "add") {
            if (!this.myCart.includes(obj.item)) {
              obj.item.added = true;
              this.myCart.push(obj.item)
              this.subtotal += obj.item.price;
            }
          } else if (obj.task === "remove") {
  	    	  if (this.myCart.includes(obj.item)) {
              obj.item.added = false;
              this.myCart = this.myCart.filter(item => item != obj.item);
              this.subtotal -= obj.item.price;
            }
  	      }
        }
  	  )
  }

  handleCartItem(product, task) {
    let obj = {task: task, item: product};
    this._shareService.getProduct(obj);
  }

  OnInit() {
    this.getCartItems();
  }
}