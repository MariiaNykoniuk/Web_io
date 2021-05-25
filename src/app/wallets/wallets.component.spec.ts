import {ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import { WalletsComponent } from './wallets.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('WalletsComponent', () => {
  let component: WalletsComponent;
  let fixture: ComponentFixture<WalletsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletsComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = getTestBed().get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return list of wallets', () =>{
    let lists = component.showWallets('20')
    expect(lists).toBeUndefined();
  });

  it('should logout', () => {
    component.logout();
    expect(component).toBeDefined();
  });

  it('should edit', () =>
  {
    component.edit();
    expect(component).toBeDefined();
  });

  it('should delete', () =>{
    component.delete();
    expect(component).toBeDefined();
  })
});
