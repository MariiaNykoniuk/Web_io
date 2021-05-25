import {ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

import { WalletComponent } from './wallet.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('WalletComponent', () => {
  let component: WalletComponent;
  let fixture: ComponentFixture<WalletComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpMock = getTestBed().get(HttpTestingController);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create wallet', () => {
    let walletname: object = {
      value: 'Testing wallet'
    },
      fundsin: object = {
      value: '34000'
      }
      component.createwallet(walletname, fundsin);
    expect(component).toBeDefined();
  });

  it('should logout', () => {
    component.logout();
    expect(component).toBeDefined();
  })
});
