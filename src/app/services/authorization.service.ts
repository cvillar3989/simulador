import { Injectable } from '@angular/core';
import { AuthorizationConsumer } from '../consumers/authorization.consumer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { environment } from 'src/environments/environment';
import { QueryParamsLoginResponse } from '../models/query-params-login-Response';
import { InformationByConfirmationPaymentsSCA } from '../models/Information-by-confirmation-payments-sca-response';
import { PaymentSCARequest } from '../models/payment-sca-request';
import { QueryParamsPaymentCSAResponse } from '../models/query-params-payment-sca-response';
import { OTPRequest } from '../models/otp-request';
import { OTPResponse } from '../models/otp-response';
import { ConcentsResponse } from '../models/consents-response';
import { AccessRequest } from '../models/access-request';

@Injectable()
export class AuthorizationService {

  

  constructor(private consumer: AuthorizationConsumer) { }

  updateAccountsConsents(access:AccessRequest, aspspSession: string):Observable<any> {
    return this.consumer.updateAccountsConsents(access, aspspSession);
  }

  authenticate(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.consumer.authenticate(loginRequest);
  }

  sendPaymentSCA(paymentSCARequest: PaymentSCARequest, aspspSession: string): Observable<any> {
    let otp: OTPRequest = new OTPRequest();
    otp.otp = paymentSCARequest.code;
    return this.consumer.sendConsentsSCAOTP(otp, aspspSession);
  }

  sendConsentsSCAOTP(otp: OTPRequest, aspspSession: string): Observable<OTPResponse> {
    return this.consumer.sendConsentsSCAOTP(otp, aspspSession).pipe(map((otpResponseResult: OTPResponse) => {
      otpResponseResult.aspspSession = aspspSession;
      return otpResponseResult;
    }));
  }

  findAllAccounts(aspspSession: string): Observable<ConcentsResponse> {
    return this.consumer.findAllAccounts(aspspSession);
  }

  redirect(queryParamsLoginResponse: QueryParamsLoginResponse) {
    let externalUrl = this.getRedirectUrlWithParams(queryParamsLoginResponse);
    window.open(externalUrl, '_self');
  }

  redirectSCA(queryParamsPaymentCSAResponse: QueryParamsPaymentCSAResponse) {
    let externalUrl = this.getRedirectUrlWithParamsPaymentSCA(queryParamsPaymentCSAResponse);
    window.open(externalUrl, '_self');
  }

  getInfoInitPaymentsSCAAuth(aspspSession: string): Observable<InformationByConfirmationPaymentsSCA> {
    return this.consumer.getInfoInitPaymentsSCAAuth(aspspSession);
  }

  private getRedirectUrlWithParamsPaymentSCA(queryParamsPaymentCSAResponse: QueryParamsPaymentCSAResponse): string {
    let url = this.getRedirectUrlSCA();
    let queryParams = `?aspspSession=${queryParamsPaymentCSAResponse.aspspSession}&result=${queryParamsPaymentCSAResponse.result}`;
    return url + queryParams;
  }

  private getRedirectUrlWithParams(queryParamsLoginResponse: QueryParamsLoginResponse): string {
    let url = this.getRedirectUrl(queryParamsLoginResponse);
    let queryParams = `?client_id=${queryParamsLoginResponse.clientId}&scope=${queryParamsLoginResponse.scope}&redirect_uri=${queryParamsLoginResponse.redirect_uri}&state=${queryParamsLoginResponse.state}&result=${queryParamsLoginResponse.result}&code=${queryParamsLoginResponse.code}`;
    return url + queryParams;
  }

  private getRedirectUrl(queryParamsLoginResponse: QueryParamsLoginResponse): string {
    return environment.redirectURL;
  }

  private getRedirectUrlSCA(): string {
    return environment.redirectUrlSCA;
  }
}
