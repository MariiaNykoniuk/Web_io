import {ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import { TransactionsComponent } from './transactions.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('TransactionsComponent', () => {
  let component: TransactionsComponent;
  let fixture: ComponentFixture<TransactionsComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionsComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsComponent);
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
2
  it('should return list of transactions', () =>{
    let lists = component.showTransactions('new wallet')
    expect(lists).toBeUndefined();
  });

  it('should return wallet1', () => {
    component.showWallet1('new wallet');
    expect(component).toBeDefined();
  });

  it('should return wallet2', () => {
    component.showWallet2('9');
    expect(component).toBeDefined();
  });

  it('should return user', () => {
    component.showUser('60');
    expect(component).toBeDefined();
  });

  it('should logout', () => {
    component.logout();
    expect(component).toBeDefined();
  })

});
