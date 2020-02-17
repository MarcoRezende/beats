import { Component, OnInit, Input } from '@angular/core';
import { ShareService } from '../share.service';
import sampleData from '../../assets/data.json';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  myCart: any = [];
  subtotal: number = 0;

  constructor(private _shareService: ShareService) { }

  getCartItems(t = "none") {
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
    console.log(this.myCart)
  }

  removeItemFromCart(product) {
    let obj = {task: "remove", item: product};

    this._shareService.getProduct(obj);
    this.getCartItems();
    this._shareService.getProduct(obj);
  }

  ngOnInit() {
  	this.getCartItems("init");
  }

}
