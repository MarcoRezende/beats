import { Component, OnInit } from '@angular/core';
import sampleData from '../../assets/data.json';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  myCart: any = [];
  subtotal: number = 0;

  payMethod: string = 'visa';

  constructor(private _shareService: ShareService) { }

  getCartItems(t) {
    if (t === "init") {
      // esvaziando carrinho
      this.myCart = [];

      // categorias de produtos disponiveis
      let itemCategory = ["vst", "drum", "midi", "loops"];

      // obtendo itens adicionados ao carrinho
      for (let i = 0; i < itemCategory.length; i++) {
          let cat = itemCategory[i];
          sampleData.products[cat].map((product) => {
              if (product.hasOwnProperty('added')) {
                  if (product.added) {
                      this.myCart.push(product)
                      this.subtotal += product.price;
                  }
              }
          })
      }
    } else {
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
  }

  setPaymentMethod(method) {
  	if (method !== this.payMethod) {
  		this.payMethod = method;
  	}
  }

  ngOnInit() {
  	this.getCartItems("init");
  }

}
