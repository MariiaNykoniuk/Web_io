import {ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import { CreateTransactionComponent } from './create-transaction.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('CreateTransactionComponent', () => {
  let component: CreateTransactionComponent;
  let fixture: ComponentFixture<CreateTransactionComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTransactionComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = getTestBed().get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return wallet', () => {
    component.showWallet1('new wallet', 'wallet 4', 'Den', 'Loric', '200');
    expect(component).toBeDefined();
  });

  it('should return user', () => {
    component.showUser('Den', 'Loric');
    expect(component).toBeDefined();
  });

  it('should return wallet1', () => {
    component.showWallet2(60, 'wallet 4');
    expect(component).toBeDefined();
  });

  it('should create transaction', () => {
    component.createTransaction('6');
    expect(component).toBeDefined();
  });

  it('should logout', () => {
    component.logout();
    expect(component).toBeDefined();
  })
});
