import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-wallet',
  templateUrl: './edit-wallet.component.html',
  styleUrls: ['./edit-wallet.component.css']
})
export class EditWalletComponent implements OnInit {

   id = localStorage.getItem('id');

  access_token = localStorage.getItem('access_token');
  last_name: string;
   name: string;
  funds: string;
  baseURL = 'http://127.0.0.1:8000/';
  access_headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.access_token });
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

  }



  editWallet(LastName, Name, Funds): boolean {
    this.last_name=LastName.value;
    this.name = Name.value;
    this.funds= Funds.value;
    this.http.put(this.baseURL + 'wallet/' + localStorage.getItem('id') + '/' + this.last_name, null,{
      params: {
        name: this.name,
        funds: this.funds
      },
      observe: 'response'
    })
      .subscribe(response => {
        this.router.navigate(['/wallets/']);

    console.log(LastName.value)
        // console.log(response)
      });
    LastName.value = '';
    Name.value = '';
    Funds.value = '';
    return false;
  }
  logout(): void {
    localStorage.setItem('id', null);
    this.router.navigate(['/']);
  }

}
