import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  home: boolean = true;

  constructor() { }

  ngOnInit() {

   	var myToggle = function(element, class0, class1) {
   	  if ( !element.classList.contains(class0) ) {
      	element.classList.add(class0);
      	element.classList.remove(class1);
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
