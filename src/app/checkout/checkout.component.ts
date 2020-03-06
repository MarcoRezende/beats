import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import sampleData from '../../assets/data.json';
import { ShareService } from '../share.service';
import { SharedService } from '../shared.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {

  registerForm: FormGroup;  
  submitted = false;
  value: boolean;
  myCart: any = [];
  subtotal: number = 0;
  payMethod: string = 'visa';
  currentQR: number = 1;
  BTC: any;
  allInnerImgs: any = [];
  innerImgsLoaded: boolean = false;
  allImgs: any = [];
  mainImgLoaded: boolean = false;
  fakeDelay: boolean = false;
  showModal: boolean = false;

  constructor(private _shareService: ShareService, private _sharedService: SharedService, private formBuilder: FormBuilder, private titleService: Title) { }

  getCartItems(t = null) {
    if (t === "init") {
      // esvaziando carrinho
      this.myCart = [];

      // categorias de produtos disponiveis
      let itemCategory = ["vst", "drum", "midi", "loops"];

      // obtendo itens adicionados ao carrinho
      for (let i = 0; i < itemCategory.length; i++) {
        let cat = itemCategory[i];
        sampleData.products[cat].map((product) => {
          if (product.hasOwnProperty('added')) {
            if (product.added) {
              this.myCart.push(product)
              this.subtotal += product.price;
            }
          }
        })
      } 
    } else {
      this._shareService.cart
      .subscribe(
        (obj) => {
          if (obj.task === "add") {
            if (!this.myCart.includes(obj.item)) {
              obj.item.added = true;
              this.myCart.push(obj.item)
              this.subtotal += obj.item.price;
            }
          } else if (obj.task === "remove") {
            if (this.myCart.includes(obj.item)) {
              obj.item.added = false;
              this.myCart = this.myCart.filter(item => item != obj.item);
              this.subtotal -= obj.item.price;
            }
          }
        }
      )     
    }
  }

  setPaymentMethod(method) {
  	if (method !== this.payMethod) {
      if (method === 'bitcoin') {
        this.updateBTCPrice();
        this.getRandomQR();
      }

      // esvaziando array de referencias de imagens
      this.allInnerImgs = [];

      // atribuindo 'false' ao trocar de metodo de pagamento
      this.innerImgsLoaded = false;
      this.payMethod = method;
    }
  }

  getRandomQR() {
    if (this.payMethod !== 'bitcoin') {
      this.currentQR = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    }
  }

  updateBTCPrice() {
    this._sharedService.getTicker(this.subtotal).subscribe((data)=>{
      this.BTC = data;
    });
  }

  // facil acesso aos dados do form group por parte dos form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    if (this.payMethod === 'visa') {
      this.submitted = true;

      let toDisable = ['Num', 'Exp', 'CVV'];

      // desabilitando certas propriedades se o metodo de pagamento atual for diferente de "visa"
      if (this.payMethod !== 'visa') {
        for (let i = 0; i < toDisable.length; i++) {
          this.registerForm.controls[`card${toDisable[i]}`].disable();
        }
      } else {
        // habilitando propriedades caso estejam desativadas
        if (this.registerForm.controls.cardNum.status === "DISABLED") {
          for (let i = 0; i < toDisable.length; i++) {
            this.registerForm.controls[`card${toDisable[i]}`].enable();
          }
        }
      }

      // parando aqui se o form for invalido
      if (this.registerForm.invalid) {
        return;
      }

      this.mainImgLoaded = false;

      setTimeout((function() {
        this.showModal = true;

        this.getCartItems();
        this.myCart.forEach(item => item.added = false)

      }.bind(this)), 5000)
    }
  }

  updateImgState(item, task) {
    if (task === 'main') {
      this.allImgs.push(item)

      if (this.allImgs.length === 3) {
        this.mainImgLoaded = true;
      }
    } else {
      let innerImgs = document.getElementsByClassName('inner-imgs');

      this.allInnerImgs.push(item);

      if (this.allInnerImgs.length === innerImgs.length) {
        this.innerImgsLoaded = true;
      }
      
    }
    
  }

  setDocTitle(title: string) {
    this.titleService.setTitle(title);
  }

  modelChanged(e:string, id:string, t:string) {
    let el = <HTMLInputElement>document.getElementById(id);
    if (e.length > 0) {
      if (t === 'Date') {
        el.value = e.replace(/[^\dA-Z]/g, '').replace(/(.{2})/g, '$1/').trim().slice(0, 5);
      } else if (t === 'CardNum') {
        el.value = e.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
      }
    } 
  }

  formatUserInfo(str:string, t:string) {
    let fStr = t === 'name' ? `${str.charAt(0).toUpperCase()}${str.slice(1).replace(/^(.{20}).*/, "$1...")}` : `${str.replace(/^(.{20}).*/, "$1...")}`;
    return fStr;
  }

  ngOnInit() {
    this.setDocTitle('Beatz | Checkout');
  	this.getCartItems("init");
    this.updateBTCPrice();

    if (this.myCart.length === 0) {
      this.mainImgLoaded = true;
    }

    let today = new Date();
    let mm = String(today.getMonth() + 1).padStart(1, '0');
    let cardExp = `^((0[${mm}-9]|1[0-2])\/?([2-9][0-9])|(0[1-9]|1[0-2])\/?([2-9][1-9]))$`;
    let regCardExp = new RegExp(cardExp);

    // adicionando propriedades ao form group
    this.registerForm = this.formBuilder.group({
      fName: ['', [Validators.required, Validators.minLength(1), Validators.pattern(/^[A-zÀ-ú\x{00C0}\x{00FF}][A-zÀ-ú\x{00C0}\x{00FF}\'\-]+([\ A-zÀ-ú\x{00C0}\x{00FF}][A-zÀ-ú\x{00C0}\x{00FF}\'\-]+)*$/)]],
      lName: ['', [Validators.required, Validators.minLength(1), Validators.pattern(/^[A-zÀ-ú\x{00C0}\x{00FF}][A-zÀ-ú\x{00C0}\x{00FF}\'\-]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      cardNum: ['', [Validators.required, Validators.pattern(/^(?:4[0-9]{3}\s(?:[0-9]{4}\s[0-9]{4}\s[0-9]{4})?)$/)]],
      cardExp: ['', [Validators.required, Validators.pattern(regCardExp)]],
      cardCVV: ['', [Validators.required, Validators.pattern(/^[0-9]{3}$/)]]
    });
  }

}
