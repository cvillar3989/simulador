import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorizationService } from './services/authorization.service';
import { AuthorizationConsumer } from './consumers/authorization.consumer';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { ButtonBarCancelAndContinueComponent } from './components/button-bar-cancel-and-continue/button-bar-cancel-and-continue.component';
import { InputWithValidationComponent } from './components/input-with-validation/input-with-validation.component';
import { LogoComponent } from './components/logo/logo.component';
import { PaymentsSCAComponent } from './views/payments-sca/payments-sca.component';
import { ConsentsSCAComponent } from './views/consents-sca/consents-sca.component';
import { RegisterCodeComponent } from './views/consents-sca/register-code/register-code.component';
import { SelectAccountComponent } from './views/consents-sca/select-account/select-account.component';
import { InputWithValidTitleAndLinkComponent } from './components/input-with-valid-title-and-link/input-with-valid-title-and-link.component';
import { HideCenterAccountPipe } from './pipes/hide-center-account.pipe';
import { DateTextPipe } from './pipes/date-text.pipe';
import { SVAPaymentsComponent } from './views/sva-payments/sva-payments.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ButtonBarCancelAndContinueComponent,
    InputWithValidationComponent,
    LogoComponent,
    PaymentsSCAComponent,
    SVAPaymentsComponent,
    ConsentsSCAComponent,
    RegisterCodeComponent,
    SelectAccountComponent,
    InputWithValidTitleAndLinkComponent,
    HideCenterAccountPipe,
    DateTextPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    { provide: AuthorizationService, useClass: AuthorizationService },
    { provide: AuthorizationConsumer, useClass: AuthorizationConsumer }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
