import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

id = localStorage.getItem('id');
wallets: any = [];
  name: string;
  lastname: string;
  firstname: string;
  funds: string;
  owner_id : string;
  Wallet_name1: string;
  Wallet_name2: string;
transactions: any = [];
list$: Subject<any[]>;
  baseURL = 'http://127.0.0.1:8000/';
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.showWallets(this.id);
  }

  showWallets(id_user: string): void {
    this.http.get(this.baseURL + 'wallets/list/' + id_user)
      .pipe(

        tap(wallets => console.log("wallets array", wallets))
      )
      .subscribe(response => {this.wallets = response})
  }

  showTransactions(Name: string): void {

    this.name = Name;
    console.log(this.name)
    this.http.get(this.baseURL + 'transaction/' + localStorage.getItem('id')+'/' + this.name)
      .pipe(

        tap(transactions => console.log("transactions array", transactions))
      )
      .subscribe(response => this.transactions = response)
  }

  showWallet1(From_wallet: string): void {
    this.http.get<any>(this.baseURL + 'wallet/' + localStorage.getItem('id') + '/' + From_wallet)
      .subscribe(response => {
        // console.log(response);
        this.Wallet_name1 = response['name'];
      });
  }
  showWallet2(To_wallet: string): void {
    this.http.get<any>(this.baseURL + 'wallet/' + To_wallet)
      .subscribe(response => {
        // console.log(response);
        this.Wallet_name2 = response['name'];
        this.owner_id = response['owner_id'];
        //this.showUser(this.owner_id)
      });
  }

  showUser(id_user: string): void {
    this.http.get<any>(this.baseURL + 'user/' + id_user)
      .subscribe(response => {
        // console.log(response);
        this.firstname = response['first_name'];
        this.lastname = response['last_name'];
      });
  }
  logout(): void {
    localStorage.setItem('id', null);
    this.router.navigate(['/']);
  }

}
