import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request';
import { Observable, Observer } from 'rxjs';
import { LoginResponse } from '../models/login-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InformationByConfirmationPaymentsSCA } from '../models/Information-by-confirmation-payments-sca-response';
import { PaymentSCARequest } from '../models/payment-sca-request';
import { OTPRequest } from '../models/otp-request';
import { OTPResponse } from '../models/otp-response';
import { ConcentsResponse } from '../models/consents-response';
import { AccessRequest } from '../models/access-request';
import { AccountsResponse } from '../models/accounts-response';
import { AccountResponse} from '../models/account-response';

@Injectable()
export class AuthorizationConsumer {

  

  constructor(private http: HttpClient) { }

  updateAccountsConsents(access: AccessRequest, aspspSession: string):Observable<any> {
    const headers = this.getHeaders(aspspSession);
    return this.http.put(environment.endpoints.putConsentsSCA, access, {headers});
  }

  authenticate(login: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.endpointAuth, { user: login.userName, password: login.password });
  }

  getAccountsSVAPaymentsSCA(aspspSession: string): Observable<AccountsResponse> {
    const headers = this.getHeaders(aspspSession);
    return this.http.get<AccountsResponse>(environment.endpoints.getSVAPaymentsAccounts, {headers});
  }

  sendIdAccountSVAPaymentSCA(accountsResponse: AccountResponse, aspspSession: string): Observable<any>{
    const headers = this.getHeaders(aspspSession);
    return this.http.put(environment.endpoints.putSVAPaymentsSCA, accountsResponse, {headers});
  }

  getInfoInitPaymentsSCAAuth(aspspSession: string): Observable<InformationByConfirmationPaymentsSCA> {
    const headers = this.getHeaders(aspspSession);
    return this.http.get<InformationByConfirmationPaymentsSCA>(environment.endpoints.getPaymentsSCA, {headers});
  }

  sendPaymentSCA(paymentSCARequest: PaymentSCARequest, aspspSession: string): Observable<any>{
    const headers = this.getHeaders(aspspSession);
    return this.http.put(environment.endpoints.putPaymentsSCA, paymentSCARequest, {headers});
  }

  sendConsentsSCAOTP(otp: OTPRequest, aspspSession: string): Observable<OTPResponse> {
    const headers = this.getHeaders(aspspSession);
    return this.http.post<OTPResponse>(environment.endpoints.postConsentsSCAOTP, otp, {headers});
  }
  
  findAllAccounts(aspspSession: string): Observable<ConcentsResponse>{
    const headers = this.getHeaders(aspspSession);
    return this.http.get<ConcentsResponse>(environment.endpoints.getConsentsSCAAccounts,{headers});
  }

  private getHeaders(aspspSession: string): HttpHeaders{
    return new HttpHeaders().set(environment.headers.ASPSPSimulatorSession, aspspSession);
  }
}
