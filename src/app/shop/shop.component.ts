import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import sampleData from '../../assets/data.json';
export default sampleData;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

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
  productID: string;

  constructor(private route: ActivatedRoute) {
  	this.productID = this.route.snapshot.params.id
    if (this.route.queryParams) { 
      this.route.queryParams.subscribe(values => {
        this.catalog = values.tag
      });

      // this.query = this.data.products.drum.map(item => item.id);
      for (let i = 0; i < this.query.length; i++) {
        if (this.catalog === this.query[i].name) {
          this.product = this.data.products[this.query[i].prod].filter(product => product.id === this.productID);
          console.log(this.product)
        } else {
          // redirecionar para 404
        }
      }
    }
  }
  
  formatDate(date) {
    let reviewDate = new Date(date);
    let weekday = reviewDate.toLocaleString('default', { weekday: "short"});
    let month = reviewDate.toLocaleString('default', { month: "short"});
    let year = reviewDate.toLocaleString('default', { year: "numeric"});
    console.log("Dia", reviewDate)
    return `${weekday}, ${month} ${year}` 
  }

  createRating(times = 0, element) {
    let elem = document.getElementById(element)
    let icon = document.createElement('i')
    icon.className = "fas fa-star"
    console.log("a", elem, element, icon)
    for (let i = 0; i <= times; i++) {
      elem.append(icon)
    }
  }

  zoomIn(event) {
    let img = document.getElementById("product-image");
    let posX = event.offsetX ? (event.offsetX) : event.pageX - img.offsetLeft;
    let posY = event.offsetY ? (event.offsetY) : event.pageY - img.offsetTop;

    console.log(posY, posX)
      
    img.style.transformOrigin = `${posX}px ${posY}px`;
    img.style.transform = `scale(4)`;
    img.style.transition = "inherit";
  }

  zoomOut() {
    let img = document.getElementById("product-image");
      
    img.style.transform = `scale(1)`;
    img.style.transition= "transform .3s ease";
  }

  ngOnInit() {
   	this.home = true;


   	let myToggle = function(element, class0, class1) {
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
   	}
  }

}
