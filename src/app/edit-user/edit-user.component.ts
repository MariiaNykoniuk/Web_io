import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  id = localStorage.getItem('id');
  access_token = localStorage.getItem('access_token');
  refresh_token = localStorage.getItem('refresh_token');
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  baseURL = 'http://127.0.0.1:5000/';
  access_headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.access_token });
  refresh_headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.refresh_token });

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
     this.showUser(this.id);
  }
  showUser(id_user: string): void {
    this.http.get<any>(this.baseURL + 'user/' + id_user, null)
      .subscribe(response => {
        // console.log(response);
        this.firstname = response['first_name'];
        this.lastname = response['last_name'];
        this.email = response['email'];
      })
  }
  editUser(Email, Firstname, Lastname, Password): boolean {
    this.email = Email.value;
    this.firstname = Firstname.value;
    this.lastname = Lastname.value;
    this.password = Password.value;
    this.http.put(this.baseURL + 'user/' + localStorage.getItem('id'), null,{
      params: {
        email: this.email,
        first_name: this.firstname,
        last_name: this.lastname,
        password: this.password
      },
      observe: 'response'
    })
      .subscribe(response => {
        this.router.navigate(['/user/' + this.id]);
        // console.log(response)
      });
    Firstname.value = '';
    Lastname.value = '';
    Email.value = '';
    Password.value = '';
    return false;
  }

}
