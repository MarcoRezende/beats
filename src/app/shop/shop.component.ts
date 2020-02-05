import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareService } from '../share.service';
import sampleData from '../../assets/data.json';
export default sampleData;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

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
  isValid: boolean = false;
  ID: boolean = false;
  cart: any = [];

  constructor(private route: ActivatedRoute, private router: Router, private _shareService: ShareService) {
  	this.productID = this.route.snapshot.params.id
      this.route.queryParams.subscribe(values => {
        this.catalog = values.tag;
      });

      for (let i = 0; i < this.query.length; i++) {
        // if (this.catalog === this.query[i].name) { "filtro" para reduzir pesquisa
          for (let c = 0; c < this.data.products[this.query[i].prod].length; c++) {
            if (this.productID === this.data.products[this.query[i].prod][c].id) {
              this.product = this.data.products[this.query[i].prod].filter(product => product.id === this.productID);
              this.catalog = this.query[i].name;
              this.isValid = true;          
            }
          }
        // }
      }
      if (!this.isValid) {
        this.router.navigate(['/']);
      }
  }

  addToCart(product) {
    let obj = {task: "add", item: {}};
    obj.item = product; 
    this._shareService.getProduct(obj);
  }
  
  formatDate(date) {
    let reviewDate = new Date(date);
    let weekday = reviewDate.toLocaleString('default', { weekday: "short"});
    let month = reviewDate.toLocaleString('default', { month: "short"});
    let year = reviewDate.toLocaleString('default', { year: "numeric"});    
    return `${weekday}, ${month} ${year}` 
  }

  createRating(times = 0, element) {
    let elem = document.getElementById(element)
    for (let i = 0; i <= times; i++) {
      let icon = document.createElement('i')
      icon.className = "fas fa-star"    
      elem.append(icon)
    } 
  }

  zoomIn(event) {
    let img = document.getElementById("product-image");
    let posX = event.offsetX ? (event.offsetX) : event.pageX - img.offsetLeft;
    let posY = event.offsetY ? (event.offsetY) : event.pageY - img.offsetTop;
    
      
    img.style.transformOrigin = `${posX}px ${posY}px`;
    img.style.transform = "scale(4)";
    img.style.transition = "inherit";
  }

  zoomOut() {
    let img = document.getElementById("product-image");
      
    img.style.transform = "scale(1)";
    img.style.transition = "transform .3s ease";
  }

  ngOnInit() {
   
  }

}
