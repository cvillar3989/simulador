// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const nrbe = '0128';
export const environment = {
  production: false,
  redirectUrlSCA: 'https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/sca/callback',
  redirectURL: 'https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/authorization/callback',
  endpointAuth: 'https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/authorization/login',
  redirectSVAURL: 'https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/authorization/callback',
  contextApp: '',
  nrbe: nrbe,
  endpoints: { 
    getSVAPaymentsAccounts: `assets/json/AccountsSVAResponse.json`,
    putSVAPaymentsSCA: `https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/sca/${nrbe}/payments`,
    //getSVAPaymentsAccounts: `https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/sca/${nrbe}/users/accounts`
    getPaymentsSCA: `assets/json/InformationByConfirmationPaymentsSCAResponse.json`,
    //getPaymentsSCA: `https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/sca/${nrbe}/payments`
    putPaymentsSCA: `https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/sca/${nrbe}/payments`,
    //getConsentsSCAAccounts: `https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/sca/${nrbe}/consents`,
    getConsentsSCAAccounts: `assets/json/AccountsResponse.json`,
    //postConsentsSCAOTP: `https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/sca/${nrbe}/validation`
    postConsentsSCAOTP: `assets/json/OTPResponse.json`,
    putConsentsSCA: `https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/sca/${nrbe}/consents`
  },
  headers: {
    ASPSPSimulatorSession: 'ASPSP-Simulator-Session'
  }
  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
