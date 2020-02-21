import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private httpClient: HttpClient) { }

  public getTicker(value){
    return this.httpClient.get(`https://blockchain.info/tobtc?currency=USD&value=${value}`);
  }
}