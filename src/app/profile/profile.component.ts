import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id = localStorage.getItem('id');
  access_token = localStorage.getItem('access_token');
  refresh_token = localStorage.getItem('refresh_token');
  firstname: string;
  lastname: string;
  email: string;
  baseURL = 'http://127.0.0.1:5000/';
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.access_token });
    this.showUser(this.id, headers);
  }

  showUser(id_user: string, headers: HttpHeaders): void {
    this.http.get<any>(this.baseURL + 'user/' + id_user)
      .subscribe(response => {
        // console.log(response);
        this.firstname = response['first_name'];
        this.lastname = response['last_name'];
        this.email = response['email'];
      });
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
