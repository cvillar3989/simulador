import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { AccountsResponse } from 'src/app/models/accounts-response';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountResponse } from 'src/app/models/account-response';
import { QueryParamsPaymentCSAResponse } from 'src/app/models/query-params-payment-sca-response';
import { OTPResponse } from 'src/app/models/otp-response';
import { environment } from 'src/environments/environment';
import { Account } from './models/account';

@Component({
  selector: 'app-select-account-sva',
  templateUrl: './select-account-sva.component.html',
  styleUrls: ['./select-account-sva.component.css']
})
export class SelectAccountsSVAComponent implements OnInit {

  selectAccountFormGroup: FormGroup;
  accountFormControl: FormControl;
  aspspSession: string;
  otpResponse: OTPResponse;
  redirectToRegisterOTP: boolean;
  accounts: AccountsResponse;
  account: string;

  constructor(private router: Router, private route: ActivatedRoute, private service: AuthorizationService) {
    let valitorsCommon = [Validators.required];
    this.accountFormControl = new FormControl('', valitorsCommon);
    this.selectAccountFormGroup = new FormGroup({
      accountFormControl: this.accountFormControl
    }); 
    const navigation = this.router.getCurrentNavigation();
    if (null == navigation) {
      this.redirectToRegisterOTP = true;
    } else if (!navigation.extras['otpResponse']) {
      this.redirectToRegisterOTP = true;
    } else {
      this.otpResponse = navigation.extras['otpResponse'];
    }
  }
  

  ngOnInit() {
    if (this.redirectToRegisterOTP) {
      this.router.navigate([`${environment.contextApp}sva-payments/sca.html`]);
    } else {
      console.log("ngOnInit()-accounts-sva");
    this.route.queryParams
      .subscribe(params => {
        this.service.getAccountsSVAPaymentsSCA(this.otpResponse.aspspSession)
          .subscribe((accountsResponseResult: AccountsResponse) => {
            this.accounts = accountsResponseResult;
          },
          (error: any) => {
            console.error(error);
          });
      });
    }
  }

  onClickCheckBox(account: AccountResponse) {
    console.log("Account: "+ JSON.stringify(account));
    this.accountFormControl.setValue(account);
    return this.account = account.resourceId;
  }

  sendAccount() {
    console.log("AccountId: "+ JSON.stringify(this.account));
    let accountRequest: Account = new Account();
    accountRequest.accountId = this.account;
    this.service.sendIdAccountSVAPaymentSCA(accountRequest, this.otpResponse.aspspSession)
    .subscribe((result: any) => {
      let queryParamsPaymentCSAResponse:QueryParamsPaymentCSAResponse = new QueryParamsPaymentCSAResponse();
      queryParamsPaymentCSAResponse.aspspSession = this.otpResponse.aspspSession;
      queryParamsPaymentCSAResponse.result = this.otpResponse.result;
      this.service.redirectSCA(queryParamsPaymentCSAResponse);
    }, (error: any) => {
      console.error(error);
    });
  }
}

