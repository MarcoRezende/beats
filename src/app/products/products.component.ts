import { Component, OnInit } from '@angular/core';
import sampleData from '../../assets/data.json';
export default sampleData;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  data: any = sampleData;

  constructor() { }

  ngOnInit() {
  console.log(this.data)
  }

}