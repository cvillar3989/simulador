import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { InformationByConfirmationPaymentsSCA } from 'src/app/models/Information-by-confirmation-payments-sca-response';
import { PaymentSCARequest } from 'src/app/models/payment-sca-request';
import { QueryParamsPaymentCSAResponse } from 'src/app/models/query-params-payment-sca-response';
import { OTPResponse } from 'src/app/models/otp-response';
import { OTPRequest } from 'src/app/models/otp-request';
import { map } from 'rxjs/operators';

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
  redirectToRegisterOTP: boolean;
  otpResponse: OTPResponse;

  constructor(private router: Router,private route: ActivatedRoute, private service: AuthorizationService) {
    let valitorsCommon = [Validators.required];
    this.codeFormControl = new FormControl('', valitorsCommon);
    this.coordinatesFormControl = new FormControl('', valitorsCommon);
    this.paymentsFormGroup = new FormGroup({
      codeFormControl: this.codeFormControl,
      coordinatesFormControl: this.coordinatesFormControl
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
      this.service.redirectSCA(queryParamsPaymentCSAResponse); },
      (error: any) => { });
      
  }

  validCode() {
    let otpRequest = new OTPRequest();
    otpRequest.otp = this.paymentsFormGroup.value.codeFormControl;
    this.service.sendConsentsSCAOTP(otpRequest, this.aspspSession).pipe(map((otpResponse: any)=>{
      return {otpResponse: otpResponse};
    })).subscribe((otpResponse: any) => {
        if (otpResponse.otpResponse.result) {
          this.router.navigate([`${environment.contextApp}/consents/sca2.html`], otpResponse);
        }
      },
      (error: any) => { 
        console.error(error);
      });
  }

  onClickEnlaceInput(event: any) {
  }

}
