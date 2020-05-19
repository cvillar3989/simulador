import { AccountResponse } from './account-response';

export class AccessAccountsResponse {
    accessType:string;
    balances: Array<AccountResponse>;
    transactions: Array<AccountResponse>;
}
