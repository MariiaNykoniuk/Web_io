import {ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = getTestBed().get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should profile', () =>{
    component.showUser('10');
    expect(component).toBeDefined();
  });

  it('should logout', () => {
    component.logout();
    expect(component).toBeDefined();
  });

  it('should edit user', () => {
    component.edit();
    expect(component).toBeDefined();
  });

  it('should delete', () => {
    component.delete();
    expect(component).toBeDefined();
  })
});
