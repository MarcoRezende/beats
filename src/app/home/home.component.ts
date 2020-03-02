import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
}) 
export class HomeComponent implements OnInit {
  
  home: boolean = true;

  constructor(private titleService: Title) { }

  setDocTitle(title: string) {
    this.titleService.setTitle(title);
  }

  ngOnInit() {
    this.setDocTitle('Beatz | Home');
  }

}
