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
  product: any = "";

  constructor(private route: ActivatedRoute) { 
    this.catalog = this.route.queryParams._value.catalog
    if (this.catalog === 'vst-expansion') {
      this.product = this.data.products.vst;
    } else if (this.catalog === 'drum-kit') {
      this.product = this.data.products.drum
    } else if (this.catalog === 'loops') {
      this.product = this.data.products.loops
    } else if (this.catalog === 'midi-kit') {
      this.product = this.data.products.midi
    } else {
      // redirecionar para pagina de erro 404
    }
  }


  ngOnInit() {
   	this.home = true;

   	var myToggle = function(element, class0, class1) {
      if ( !element.classList.contains(class1) ) {
      	element.classList.remove(class0);
      	element.classList.add(class1);
   	  }
    }

   	if (this.home) {
	   	let header = document.getElementsByTagName('header')[0];
	   	let nav = document.getElementsByTagName('nav')[0];
	   	myToggle(header, 'header-home', 'header-not-home');
	   	myToggle(nav, 'home-nav', 'not-home-nav');
	   	console.log(nav)	
   	}
  }

}