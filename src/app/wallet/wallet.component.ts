import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  id = localStorage.getItem('id');
  walletName: string;
  fundsIn: string;
  baseURL = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }
  createwallet(walletname, fundsin): boolean {
      this.walletName = walletname.value;
      this.fundsIn = fundsin.value;
      this.http.post(this.baseURL+'wallet', null, {
        params: {
          name: this.walletName,
          owner_id: localStorage.getItem('id'),
          funds: this.fundsIn
        },
        observe: 'response'
      })
         .subscribe(response => {
        this.router.navigate(['/wallets']);
      });

      walletname.value = '';
      fundsin.value = '';
      return false;
  }

  logout(): void {
    localStorage.setItem('id', null);
    this.router.navigate(['/']);
  }
}
