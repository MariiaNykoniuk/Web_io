import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  baseURL = 'http://127.0.0.1:8000/';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login(Email, Password): boolean {
    this.email = Email.value;
    this.password = Password.value;
    Email.value = '';
    Password.value = '';
    this.http.post(this.baseURL + 'login', null, {
      params: {
        email: this.email,
        password: this.password
      },
      observe: 'response'
    })
      .subscribe((response) => {
        console.log(response);
        localStorage.setItem('id', response.body['id']);
        //localStorage.setItem('access_token', response.body['access_token']);
        //localStorage.setItem('refresh_token', response.body['refresh_token']);
        this.router.navigate(['/user/' + localStorage.getItem('id')]);
      });
    return false;
  }
}
