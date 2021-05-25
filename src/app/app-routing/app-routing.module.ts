import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from '../registration/registration.component';
import {LoginComponent} from '../login/login.component';
import {ProfileComponent} from '../profile/profile.component';
import {EditUserComponent} from '../edit-user/edit-user.component';
import {WalletComponent} from '../wallet/wallet.component';
import {WalletsComponent} from '../wallets/wallets.component';
import {EditWalletComponent} from '../edit-wallet/edit-wallet.component';
import {TransactionsComponent} from '../transactions/transactions.component';
import {CreateTransactionComponent} from '../create-transaction/create-transaction.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
  },
  {
    path: 'user',
    component: RegistrationComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'user/:id',
    component: ProfileComponent,
  },
  {
    path: 'user/:id/edit',
    component: EditUserComponent,
  },
  {
    path: 'wallet',
    component: WalletComponent,
  },
  {
    path: 'wallets',
    component: WalletsComponent,
  },
  {
    path: 'wallet/edit',
    component: EditWalletComponent,
  },
  {
    path: 'transactions',
    component: TransactionsComponent,
  },
  {
    path: 'transaction',
    component: CreateTransactionComponent,
  }

];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
