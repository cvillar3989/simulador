import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { InformationByConfirmationPaymentsSCA } from 'src/app/models/Information-by-confirmation-payments-sca-response';
import { PaymentSCARequest } from 'src/app/models/payment-sca-request';
import { QueryParamsPaymentCSAResponse } from 'src/app/models/query-params-payment-sca-response';
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

  constructor(private router: Router,private route: ActivatedRoute, private service: AuthorizationService) {
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

 validCode() {
    let otpRequest = new OTPRequest();
    otpRequest.otp = this.paymentsFormGroup.value.codeFormControl;
    this.service.sendConsentsSCAOTP(otpRequest, this.aspspSession).pipe(map((otpResponse: any)=>{
      return {otpResponse: otpResponse};
    })).subscribe((otpResponse: any) => {
        if (otpResponse.otpResponse.result) {
          this.router.navigate([`${environment.contextApp}next`], otpResponse);
        }
      },
      (error: any) => { 
        console.error(error);
      });
  }

  onClickEnlaceInput(event: any) {
  }

}
