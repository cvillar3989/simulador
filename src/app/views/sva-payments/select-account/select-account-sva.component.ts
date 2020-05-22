import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { AccountsResponse } from 'src/app/models/accounts-response';
import { ActivatedRoute } from '@angular/router';
import { AccountResponse } from 'src/app/models/account-response';
import { QueryParamsPaymentCSAResponse } from 'src/app/models/query-params-payment-sca-response';

@Component({
  selector: 'app-select-account-sva',
  templateUrl: './select-account-sva.component.html',
  styleUrls: ['./select-account-sva.component.css']
})
export class SelectAccountsSVAComponent implements OnInit {

  selectAccountFormGroup: FormGroup;
  accountFormControl: FormControl;
  aspspSession: string;
  accountsResponse: AccountsResponse;
  account: AccountResponse;

  constructor(private route: ActivatedRoute, private service: AuthorizationService) {
    let valitorsCommon = [Validators.required];
    this.accountFormControl = new FormControl('', valitorsCommon);
    this.selectAccountFormGroup = new FormGroup({
      accountFormControl: this.accountFormControl
    });
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.aspspSession = params.aspspSession;
        this.service.getAccountsSVAPaymentsSCA(this.aspspSession)
          .subscribe((accountsResponseResult: AccountsResponse) => {
            this.accountsResponse = accountsResponseResult;
          },
          (error: any) => {
            console.error(error);
          });
      });
  }

  onClickCheckBox(account: AccountResponse) {
    let accountResponse: AccountResponse = new AccountResponse();
    this.accountFormControl.setValue(account);
    return this.account= account
  }

  sendAccount() {
    console.log("Account: "+ JSON.stringify(this.account));
    this.service.sendIdAccountSVAPaymentSCA(this.account, this.aspspSession).subscribe((accountResponse: any) => {
      let queryParamsPaymentCSAResponse = new QueryParamsPaymentCSAResponse();
      queryParamsPaymentCSAResponse.aspspSession = this.aspspSession;
      queryParamsPaymentCSAResponse.result = accountResponse.result;
      this.service.redirectSCA(queryParamsPaymentCSAResponse);
    }, (error: any) => {
        console.error(error);
      });
  }


}
