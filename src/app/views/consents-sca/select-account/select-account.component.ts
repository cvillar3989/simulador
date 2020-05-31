import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OTPResponse } from 'src/app/models/otp-response';
import { environment } from 'src/environments/environment';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ConcentsResponse } from 'src/app/models/consents-response';
import { map } from 'rxjs/operators';
import { Account } from './models/account';
import { AccountResponse } from 'src/app/models/account-response';
import { AccessAccountsResponse } from 'src/app/models/access-accounts-response';
import { Consent } from './models/consent';
import { AccessAccountsRequest } from 'src/app/models/access-accounts-request';
import { AccountRequest } from 'src/app/models/account-request';
import { AccessRequest } from 'src/app/models/access-request';
import { QueryParamsPaymentCSAResponse } from 'src/app/models/query-params-payment-sca-response';

enum TypeAccount {
  BALANCES = 'balances',
  TRANSACTIONS = 'transactions'

}

@Component({
  selector: 'app-select-account',
  templateUrl: './select-account.component.html',
  styleUrls: ['./select-account.component.css']
})
export class SelectAccountComponent implements OnInit {

  selectAccountFormGroup: FormGroup;
  accountsFormControl: FormControl;
  otpResponse: OTPResponse;
  redirectToRegisterOTP: boolean;
  consent: Consent;
  accounts: Array<Account>;

  constructor(private router: Router, private service: AuthorizationService) {
    let valitorsCommon = [Validators.required];
    this.accountsFormControl = new FormControl('', valitorsCommon);
    this.selectAccountFormGroup = new FormGroup({
      accountsFormControl: this.accountsFormControl
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

  isDisabled(access: AccessAccountsResponse): boolean {
    return access.accessType == "01" ? true : false;
  }

  converterToConsent = (concentsResponse: ConcentsResponse): Consent => {
    let accountsBalanaces: Array<Account> = concentsResponse.access.balances.map((accountResponse: AccountResponse) => {
      const account = new Account();
      account.iban = accountResponse.iban;
      account.currency = accountResponse.currency;
      account.checked = account.disabled = this.isDisabled(concentsResponse.access);
      account.typeAccount = TypeAccount.BALANCES;
      return account;
    });
    let accountsTransaction: Array<Account> = concentsResponse.access.transactions.map((accountResponse: AccountResponse) => {
      const account = new Account();
      account.iban = accountResponse.iban;
      account.currency = accountResponse.currency;
      account.checked = account.disabled = this.isDisabled(concentsResponse.access);
      account.typeAccount = TypeAccount.TRANSACTIONS;
      return account;
    });
    let consent = new Consent();
    consent.accounts = accountsBalanaces.concat(accountsTransaction);
    consent.validUntil = concentsResponse.validUntil;
    return consent;
  }

  ngOnInit() {
    if (this.redirectToRegisterOTP) {
      console.log("ngOnInit()-accounts-consents-redirectToRegisterOTP");
      this.router.navigate([`${environment.contextApp}consents/sca.html`]);
    } else {
      console.log("ngOnInit()-accounts-consents");
      this.service.findAllAccounts(this.otpResponse.aspspSession)
        .pipe(map(this.converterToConsent))
        .subscribe((consentResult: Consent) => {
          this.consent = consentResult;
        },
          (error: any) => {
            console.error(error);
          });
    }
  }

  onClickCheckBox(account: Account) {
    account.checked = !account.checked;
    this.accountsFormControl.setValue(this.isSomeAccountChecked() ? 'true' : '');
  }

  isSomeAccountChecked(): boolean {
    return this.consent.accounts.some((account: Account) => account.checked);
  }


  sendAccounts() {
    const filterAccountByTypeChecked = (account: Account, typeAccount: TypeAccount): boolean => {
      return account.typeAccount == typeAccount && account.checked == true;
    }
    let accountBalances: Array<Account> = this.consent.accounts.filter((account: Account) => filterAccountByTypeChecked(account, TypeAccount.BALANCES));
    let accountTransactions: Array<Account> = this.consent.accounts.filter((account: Account) => filterAccountByTypeChecked(account, TypeAccount.TRANSACTIONS));
    const mappingAccountRequest = (account: Account): AccountRequest => {
      let accountRequest: AccountRequest = new AccountRequest();
      accountRequest.iban = account.iban;
      return accountRequest;
    }
    let accessAccountsRequest: AccessAccountsRequest = new AccessAccountsRequest();
    accessAccountsRequest.balances = accountBalances.map(mappingAccountRequest);
    accessAccountsRequest.transactions = accountTransactions.map(mappingAccountRequest);
    let accessRequest: AccessRequest = new AccessRequest();
    accessRequest.access = accessAccountsRequest;
    this.service.updateAccountsConsents(accessRequest, this.otpResponse.aspspSession)
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
