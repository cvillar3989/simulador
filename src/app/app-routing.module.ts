import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { PaymentsSCAComponent } from './views/payments-sca/payments-sca.component';
import { ConsentsSCAComponent } from './views/consents-sca/consents-sca.component';
import { environment } from 'src/environments/environment';
import { RegisterCodeComponent } from './views/consents-sca/register-code/register-code.component';
import { SelectAccountComponent } from './views/consents-sca/select-account/select-account.component';
import { SVAPaymentsSCAComponent } from './views/sva-payments/sva-payments-sca.component';
import {SelectAccountsSVAComponent} from './views/sva-payments/select-account/select-account-sva.component';


const routes: Routes = [
  /*{ path: `${environment.contextApp}login.html`, component: LoginComponent },
  { path: `${environment.contextApp}payments/sca.html`, component: PaymentsSCAComponent, },
  { path: `${environment.contextApp}sca.html`, component: PaymentsSCAComponent, }
  { path: `${environment.contextApp}sca.html`, component: SVAPaymentsComponent, }*/
  { path: `${environment.contextApp}sca.html`, component: SelectAccountsSVAComponent,}
  /*{ 
    path: `${environment.contextApp}consents`, 
    component: ConsentsSCAComponent,
    children: [
      {
        path: '',
        redirectTo: 'sca.html',
        pathMatch: 'full'
      },
      { path: 'sca.html', component: RegisterCodeComponent },
      { path: 'sca2.html', component: SelectAccountComponent },
    ]
  }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
