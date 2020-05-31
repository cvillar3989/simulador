import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { OTPRequest } from 'src/app/models/otp-request';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register-code',
  templateUrl: './register-code.component.html',
  styleUrls: ['./register-code.component.css']
})
export class RegisterCodeComponent implements OnInit {

  registerCodeFormGroup: FormGroup;
  codeFormControl: FormControl;
  aspspSession: string;

  constructor(private router: Router, private route: ActivatedRoute, private service: AuthorizationService) {
    let valitorsCommon = [Validators.required];
    this.codeFormControl = new FormControl('', valitorsCommon);
    this.registerCodeFormGroup = new FormGroup({
      codeFormControl: this.codeFormControl
    });
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.aspspSession = params.aspspSession;
      });
  }

  validCode() {
    let otpRequest = new OTPRequest();
    otpRequest.otp = this.registerCodeFormGroup.value.codeFormControl;
    this.service.sendConsentsSCAOTP(otpRequest, this.aspspSession).pipe(map((otpResponse: any)=>{
      return {otpResponse: otpResponse};
    })).subscribe((otpResponse: any) => {
        if (otpResponse.otpResponse.result) {
          console.log("validCode-consents");
          console.log("path: "+`${environment.contextApp}/consents/sca2.html`+", component: "+otpResponse);
          this.router.navigate([`${environment.contextApp}/consents/sca2.html`], otpResponse);
        }
      },
      (error: any) => { 
        console.error(error);
      });
  }
}
