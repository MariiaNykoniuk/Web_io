import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  email: string;
  firstName: string;
  lastName: string;
  password: string;
  baseURL = 'http://127.0.0.1:5000/';
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.firstName = 'Masha';
  }
  register(Email, Firstname, Lastname, Password): boolean {
    this.email = Email.value;
    this.firstName = Firstname.value;
    this.lastName = Lastname.value;
    this.password = Password.value;
    this.http.post(this.baseURL + 'user', null, {
      params: {
        email: this.email,
        first_name: this.firstName,
        last_name: this.lastName,
        password: this.password
      },
      observe: 'response'
    })
      .subscribe(response => {
        // localStorage.setItem('id', response.body.['id']);
        // localStorage.setItem('access_token', response.body['access_token']);
        // localStorage.setItem('refresh_token', response.body['refresh_token']);
        // console.log(localStorage.getItem('id'));
        // console.log(localStorage.getItem('access_token'));
        // console.log(localStorage.getItem('refresh_token'));
        this.router.navigate(['/login']);
      });

    Email.value = '';
    Firstname.value = '';
    Lastname.value = '';
    Password.value = '';
    return false;
  }
}
