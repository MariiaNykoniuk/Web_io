import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserComponent } from './edit-user.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit user', () => {
    let Email: object = {
      value: 'email@email.com'
    },
      Firstname: object = {
      value: 'Mary'
      },
      Lastname: object = {
      value: 'Nylon'
      },
      Password: object = {
      value: 'password'
      }
      component.editUser(Email, Firstname, Lastname, Password);
    expect(component).toBeDefined();
  });

  it('should logout', () => {
    component.logout();
    expect(component).toBeDefined();
  })
});
