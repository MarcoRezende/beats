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

  getCartItems() {
  	// forma temporaria de obter conteudo do carrinho
    this.myCart = sampleData.products.drum.filter(item => item.added === true);
  }

  setPaymentMethod(method) {
  	if (method !== this.payMethod) {
  		this.payMethod = method;
  	}
  	console.log(this.payMethod)
  }

  ngOnInit() {
  	this.getCartItems();
  }

}
