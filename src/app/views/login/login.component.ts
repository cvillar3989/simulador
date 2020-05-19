import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { LoginRequest } from 'src/app/models/login-request';
import { LoginResponse } from 'src/app/models/login-response';
import { ActivatedRoute } from '@angular/router';
import { QueryParamsLoginRequest } from 'src/app/models/query-params-login-request';
import { QueryParamsLoginResponse } from 'src/app/models/query-params-login-Response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //?clientId=xxx&scope=eee&redirect_uri=aaa&state=yyy

  loginFormGroup: FormGroup;
  userFormControl: FormControl;
  passFormControl: FormControl;
  queryParamsLoginRequest: QueryParamsLoginRequest;

  constructor(private route: ActivatedRoute, private service: AuthorizationService) {
    let valitorsCommon = [Validators.required];
    this.userFormControl = new FormControl('', valitorsCommon);
    this.passFormControl = new FormControl('', valitorsCommon);
    this.loginFormGroup = new FormGroup({
      userFormControl: this.userFormControl,
      passFormControl: this.passFormControl,
    });
    this.queryParamsLoginRequest = new QueryParamsLoginRequest();
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.queryParamsLoginRequest.clientId = params.client_id;
        this.queryParamsLoginRequest.redirect_uri = params.redirect_uri;
        this.queryParamsLoginRequest.scope = params.scope;
        this.queryParamsLoginRequest.state = params.state;
      });
  }

  authenticate(): void {
    this.service.authenticate(this.converterFormGroupToModel(this.loginFormGroup))
      .subscribe((loginResponse: LoginResponse) => {
        let queryParamsLoginResponse = this.queryParamsLoginRequest as QueryParamsLoginResponse;
        queryParamsLoginResponse.code = loginResponse.code;
        queryParamsLoginResponse.result = loginResponse.result;
        this.service.redirect(queryParamsLoginResponse);
      },
        (error: any) => {

      });
  }

  private converterFormGroupToModel(loginFormGroup: FormGroup): LoginRequest {
    let loginRequest: LoginRequest = new LoginRequest();
    loginRequest.userName = this.loginFormGroup.value.userFormControl;
    loginRequest.password = this.loginFormGroup.value.passFormControl;
    return loginRequest;
  }

}
