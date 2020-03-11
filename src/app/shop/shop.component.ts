import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ShareService } from '../share.service';
import sampleData from '../../assets/data.json';
export default sampleData;
import { Title } from '@angular/platform-browser';

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
  allInnerImgs: any = [];
  innerImgsLoaded: boolean = false;
  mainImgLoaded: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private _shareService: ShareService, private titleService: Title) {
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
    let obj = {task: "add", item: product};
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

  updateImgState(item:any,task:string,e:string='OK',el:any) {
    if (e !== 'OK') {
      el.src = '../../assets/imgs/products/not-found-art-900x800.png'
    }

    if (task === 'main') {
      this.mainImgLoaded = true;
    } else {
      let innerImgs = document.getElementsByClassName('profile-pic');

      this.allInnerImgs.push(item);

      if (this.allInnerImgs.length === innerImgs.length) {
        this.innerImgsLoaded = true;
      }
    }
  }

  setDocTitle(title: string) {
    let prefix = 'Beatz | ';
    this.titleService.setTitle(`${prefix}${title}`);
  }

  ngOnInit() {
    this.setDocTitle(`${this.product[0].name}`);
  }

}
