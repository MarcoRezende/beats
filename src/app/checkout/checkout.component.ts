import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import sampleData from '../../assets/data.json';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
  @Input() notifier: Subject<boolean> = new Subject<boolean>();

  value: boolean;

  myCart: any = [];
  subtotal: number = 0;

  payMethod: string = 'visa';

  isValidCC: any = null;

  currentQR: number = 1;

  constructor(private _shareService: ShareService) { }

  getCartItems(t = null) {
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

  validateCard(cardNumber) {
    console.log(cardNumber)
    var cardno = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;

    if (cardNumber.length) {
      this.isValidCC = cardNumber.match(cardno) ? true : false;
    } else {
      this.isValidCC = null;
    }
  }

  getRandomNumber() {
    if (this.payMethod !== 'bitcoin') {
      this.currentQR = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    }
  }

  ngOnInit() {
  	this.getCartItems("init");
  }

}
