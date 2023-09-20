import {Component, OnInit} from '@angular/core';
import {TransactionService} from "../transaction.service";
import {TRANSACTION} from "../mock-transaction";
import {TransactionInterface} from "../transaction.interface";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  montant_color:string='';
  solde:number = 1000;
  message:string = '';
  listTransaction : TransactionInterface[] = TRANSACTION;

  public form: FormGroup = new FormGroup({
    label: new FormControl(''),
    date: new FormControl(''),
    montant: new FormControl(''),
    categorie: new FormControl(''),

  });
  constructor(private service: TransactionService) {
  }

  ngOnInit() {
    this.getAllTransaction();
  }

  getAllTransaction(){
    this.listTransaction = this.service.getALl();
    return this.listTransaction;
  }

  onSubmit(){
    let transaction = {
      'id' : 0,
      "label": "",
      'montant': '',
      "categorie": "",
      'date': "",

    };
    if(this.form.valid){
      let lastIndex = TRANSACTION.length - 1;
      let lastId = TRANSACTION[lastIndex].id;
      let date = new Date();
      let transaction = {
        'id': lastId + 1,
        "label": this.form.value.label,
        'montant': this.form.value.montant,
        'categorie': this.form.value.categorie,
        'date':  date,
      };
      console.log(this.form.value.categorie);
      if(this.form.value.categorie === "entree"){
        this.solde =  this.solde + +this.form.value.montant;
        this.montant_color = "table-success";
        this.message= "https://www.quizz.biz/uploads/quizz/1784208/orig/1.jpg?1691438437";
      }else {
        this.solde =  this.solde - +this.form.value.montant;
        this.montant_color = "table-danger";
        this.message= "https://i.ytimg.com/vi/OsCZXuD8wQo/maxresdefault.jpg?sqp=-oaymwEmCIAKENAF8quKqQMa8AEB-AHUBoAC4AOKAgwIABABGHIgQSguMA8=&rs=AOn4CLAOk-7EOt7xMlJDwDbxk2lJT3izJg";

      }
      this.listTransaction.push(transaction);
      console.log(transaction);
      console.log(this.listTransaction);

    }else{
      console.log('nono');
    }
  }


}
