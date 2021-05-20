import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {

  id = localStorage.getItem('id');

  access_token = localStorage.getItem('access_token');
   wallet_name_from: string;
   wallet_id_from: string;
   wallet_name_to: string;
   wallet_id_to: string;
   recipient_name: string;
   recipient_surname: string;
   resipient_id: number;
   funds: string;
  baseURL = 'http://127.0.0.1:8000/';
  access_headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.access_token });
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  showWallet1(Wallet_name_from, Wallet_name_to, Recipient_name, Recipient_surname, Funds): void {
    this.wallet_name_from=Wallet_name_from.value;
    this.wallet_name_to = Wallet_name_to.value;
    this.recipient_name = Recipient_name.value;
    this.recipient_surname = Recipient_surname.value;
    this.funds = Funds.value;

    this.http.get<any>(this.baseURL + 'wallet/' + localStorage.getItem('id') + '/' + Wallet_name_from.value)
      .subscribe(response => {
        // console.log(response);
        this.wallet_id_from = response['id'];
        this.showUser(this.recipient_name, this.recipient_surname);
      });
  }

  showUser(Recipient_name: string, Recipient_surname: string): void {
    this.http.get<any>(this.baseURL + 'user/' + Recipient_name + '/'+Recipient_surname)
      .subscribe(response => {
        // console.log(response);
        this.resipient_id= response['id'];
        //console.log(this.resipient_id);
        this.showWallet2(this.resipient_id, this.wallet_name_to)
      });
  }

  showWallet2(Recipient_id: number, Wallet_name_to: string): void {
    console.log(Recipient_id);
    console.log(Wallet_name_to);
    this.http.get<any>(this.baseURL + 'wallet/' + Recipient_id + '/' + Wallet_name_to)
      .subscribe(response => {
        // console.log(response);
        this.wallet_id_to = response['id'];
        //this.showUser(this.recipient_name, this.recipient_surname);
        console.log(this.wallet_id_to);
        this.createTransaction(this.wallet_id_from)
      });
  }

  createTransaction(Wallet_id_from: string): boolean {
      this.http.post(this.baseURL+'transaction/' + localStorage.getItem('id') + '/' + Wallet_id_from, null, {
        params: {
          to_wallet: this.wallet_id_to,
          amount: this.funds
        },
        observe: 'response'
      })
         .subscribe(response => {
        this.router.navigate(['/transactions']);
      });

      return false;
  }
  logout(): void {
    localStorage.setItem('id', null);
    this.router.navigate(['/']);
  }
}
