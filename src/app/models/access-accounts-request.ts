import { AccountRequest } from './account-request';

export class AccessAccountsRequest {
    balances: Array<AccountRequest>;
    transactions: Array<AccountRequest>;
}
