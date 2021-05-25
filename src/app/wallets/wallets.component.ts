import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {map, tap} from 'rxjs/operators';


@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent implements OnInit {
id = localStorage.getItem('id');
wallets: any = [];
list$: Subject<any[]>;
  name: string;
  funds: string;
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
      .subscribe(response => this.wallets = response)
  }


  logout(): void {
    localStorage.setItem('id', null);
    this.router.navigate(['/']);
  }

  edit(): void {
    this.router.navigate(['/user/' + localStorage.getItem('id') + '/edit']);
  }

  delete(): void {
    this.http.delete(this.baseURL + 'user/'+ localStorage.getItem('id'))
      .subscribe(response => {
        this.router.navigate(['/']);
        // console.log(response)
      });
  }
}
