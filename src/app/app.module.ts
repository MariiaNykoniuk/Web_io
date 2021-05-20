import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { WalletComponent } from './wallet/wallet.component';
import { WalletsComponent } from './wallets/wallets.component';
import { EditWalletComponent } from './edit-wallet/edit-wallet.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CreateTransactionComponent } from './create-transaction/create-transaction.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    EditUserComponent,
    WalletComponent,
    WalletsComponent,
    EditWalletComponent,
    TransactionsComponent,
    CreateTransactionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [ AppComponent]
})
export class AppModule { }
