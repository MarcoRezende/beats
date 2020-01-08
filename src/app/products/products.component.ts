import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import sampleData from '../../assets/data.json';
import { ShareService } from '../share.service';
import { PagerService } from '../pager.service';
import { HttpClient , HttpHeaders, HttpResponse  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  category: string;
  isQuery: boolean = false;
  currentProduct: any;

  // array of all items to be paged
  private allItems: any;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  constructor(private route: ActivatedRoute, private router: Router, private _shareService: ShareService, private http: HttpClient, private pagerService: PagerService) {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.queryParams.subscribe(values => {
        this.catalog = values.catalog;
      });
      for (let i = 0; i < this.query.length; i++) {
        if (this.catalog === this.query[i].name) {
          this.product = this.data.products[this.query[i].prod];
          this.isQuery = true;
          this.currentProduct = this.query[i].prod;
        }
      }
      if (!this.isQuery) {
        this.router.navigate(['/']);
      }
      this.category = this.product[0].category;
  }

  addToCart(product) {
    this._shareService.getProduct(product);
  }

  sortItems(sortType = 'date') {
    this.product.sort(function(a,b){
      if (sortType === 'date') {
        return <any>new Date(b.release_date) - <any>new Date(a.release_date);
      }

      if (sortType === 'price') {
        return a.price - b.price;
      }

      if (sortType === 'price-desc' || sortType === 'rating') {
        let v = sortType === 'price-desc' ? 'price' : 'rating';
        return b[v] - a[v];
      }
    });
  }

  goToTop(ele) {
    console.log(ele[0])
    if (ele[0] !== "activeLink") {
      // scroll to the top of the page
      document.getElementById('top').scrollIntoView(true);
    }
  }

  ngOnInit() {
    this.setPage(1)

    this.sortItems();
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

  setPage(page: number) {
    // get data
    this.allItems = this.product;
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

}