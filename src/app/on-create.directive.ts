import { Directive, Output, EventEmitter, Input, SimpleChange} from '@angular/core';

@Directive({
  selector: '[OnCreateDirective]'
})
export class OnCreateDirective {

  @Output() OnCreateDirective: EventEmitter<any> = new EventEmitter<any>();
  constructor() {}
  ngOnInit() {      
     setTimeout(() => this.OnCreateDirective.emit(), 10);
  } 

}
