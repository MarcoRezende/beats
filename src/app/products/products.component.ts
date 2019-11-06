import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import sampleData from '../../assets/data.json';
export default sampleData;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  home: boolean = false;
  data: any = sampleData;
  catalog: string = "";
  query: any = [
    {name:'vst-expansion',prod:'vst'}, 
    {name:'drum-kit',prod:'drum'}, 
    {name:'loops',prod:'loops'}, 
    {name:'midi-kit',prod:'midi'}
  ];
  product: any;

  constructor(private route: ActivatedRoute) {
    if (this.route.queryParams._value.catalog) { 
      this.route.queryParams.subscribe(values => {
        this.catalog = values.catalog
      });
      for (let i = 0; i < this.query.length; i++) {
        if (this.catalog === this.query[i].name) {
          this.product = this.data.products[this.query[i].prod];
        } else {
          // redirecionar para 404
        }
      }
    }
  }


  ngOnInit() {
    var myToggle = function(element, class0, class1) {
      if ( !element.classList.contains(class1) ) {
      	element.classList.remove(class0);
      	element.classList.add(class1);
      }
    }

    if (!this.home) {
     let header = document.getElementsByTagName('header')[0];
     let nav = document.getElementsByTagName('nav')[0];
     myToggle(header, 'header-home', 'header-not-home');
     myToggle(nav, 'home-nav', 'not-home-nav');
   }
 }

}