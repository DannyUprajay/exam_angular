import { Injectable } from '@angular/core';
import {TRANSACTION} from "./mock-transaction";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor() { }

  getALl(){
    return TRANSACTION;
  }
}
