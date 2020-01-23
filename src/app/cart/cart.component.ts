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

  getCartItems() {
  	// forma temporaria de obter conteudo do carrinho
    this.myCart = sampleData.products.drum.filter(item => item.added === true);
  }

  ngOnInit() {
  	this.getCartItems();
  }

}
