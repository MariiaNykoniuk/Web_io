import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWalletComponent } from './edit-wallet.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('EditWalletComponent', () => {
  let component: EditWalletComponent;
  let fixture: ComponentFixture<EditWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWalletComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit wallet', () => {
    let LastName: object = {
      value: 'new wallet'
    },
      Name: object = {
      value: 'neeew wallet'
      },
      Funds: object = {
      value: '2130'
      }
      component.editWallet(LastName, Name, Funds);
    expect(component).toBeDefined();
  });

  it('should logout', () => {
    component.logout();
    expect(component).toBeDefined();
  })
});
