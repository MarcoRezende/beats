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
  allImgs: any = [];
  imgsLoaded: boolean = false;

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

  handleCartItem(product, task) {
    let obj = {task: task, item: product};
    this._shareService.getProduct(obj);
  }

  sortItems(sortType = 'date') {
    this.allItems.sort(function(a,b){
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
    this.setPage(1)
  }

  goToTop(ele) {
    if (ele[0] !== "activeLink") {
      this.allImgs = []; 
      
      this.imgsLoaded = false;
      // scroll to the top of the page
      document.getElementById('top').scrollIntoView(true);
    } 
  }

  updateImgState(item) {
    this.allImgs.push(item)

    if (this.allImgs.length === this.pagedItems.length) {
      this.imgsLoaded = true;
    }
  }

  ngOnInit() {
    this.setPage(1)

    this.sortItems();
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