import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { InformationByConfirmationPaymentsSCA } from 'src/app/models/Information-by-confirmation-payments-sca-response';
import { PaymentSCARequest } from 'src/app/models/payment-sca-request';
import { QueryParamsPaymentCSAResponse } from 'src/app/models/query-params-payment-sca-response';
import { SelectAccountsSVAComponent } from './select-account/select-account-sva.component';
@Component({
  selector: 'app-payments-sca',
  templateUrl: './sva-payments-sca.component.html',
  styleUrls: ['./sva-payments-sca.component.css']
})
export class SVAPaymentsSCAComponent implements OnInit{

  paymentsFormGroup: FormGroup;
  codeFormControl: FormControl;
  coordinatesFormControl: FormControl;
  aspspSession: string;
  informationByConfirmationPaymentsSCA: InformationByConfirmationPaymentsSCA;

  constructor(private route: ActivatedRoute, private service: AuthorizationService) {
    let valitorsCommon = [Validators.required];
    this.codeFormControl = new FormControl('', valitorsCommon);
    this.coordinatesFormControl = new FormControl('', valitorsCommon);
    this.paymentsFormGroup = new FormGroup({
      codeFormControl: this.codeFormControl,
      coordinatesFormControl: this.coordinatesFormControl
    });
  }

  ngOnInit() {
    console.log("SVAPaymentsSCAComponent");
    this.route.queryParams
      .subscribe(params => {
        this.aspspSession = params.aspspSession;
        this.service.getInfoInitPaymentsSCAAuth(this.aspspSession)
          .subscribe((informationByConfirmationPaymentsSCAResult: InformationByConfirmationPaymentsSCA) => {
            this.informationByConfirmationPaymentsSCA = informationByConfirmationPaymentsSCAResult;
           },
            (error: any) => { });
      });
  }

  sendPayments() {
    let paymentSCARequest = new PaymentSCARequest();
    paymentSCARequest.coordinate = this.paymentsFormGroup.value.coordinatesFormControl;
    paymentSCARequest.code = this.paymentsFormGroup.value.codeFormControl;
    this.service.sendPaymentSCA(paymentSCARequest, this.aspspSession).subscribe((paymentSCAResponse: any) => {
      let queryParamsPaymentCSAResponse = new QueryParamsPaymentCSAResponse();
      queryParamsPaymentCSAResponse.aspspSession = this.aspspSession;
      queryParamsPaymentCSAResponse.result = paymentSCAResponse.result;
      this.service.redirectSCA(queryParamsPaymentCSAResponse);
    },
      (error: any) => { });
      
  }

  onClickEnlaceInput(event: any) {
  }

}