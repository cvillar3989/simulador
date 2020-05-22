const nrbe = '0128';
export const environment = {
  production: false,
  redirectUrlSCA: 'https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/sca/callback',
  redirectURL: 'https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/authorization/callback',
  endpointAuth: 'https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/authorization/login',
  contextApp: '',
  nrbe: nrbe,
  endpoints: {
    getSVAPaymentsAccounts: `https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/sca/${nrbe}/users/accounts`,
    putSVAPaymentsSCA: `https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/sca/${nrbe}/payments`,
    getPaymentsSCA: `https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/sca/${nrbe}/payments`,
    putPaymentsSCA: `https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/sca/${nrbe}/payments`,
    getConsentsSCAAccounts: `https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/sca/${nrbe}/consents`,
    postConsentsSCAOTP: `https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/sca/${nrbe}/validation`,
    putConsentsSCA: `https://hub-i.redsys.es:16443/asp-sim-sb/services/rest/mock-ups/sca/${nrbe}/consents`
  },
  headers: {
    ASPSPSimulatorSession: 'ASPSP-Simulator-Session'
  }
};
