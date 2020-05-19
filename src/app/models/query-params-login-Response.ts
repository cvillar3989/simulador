import { QueryParamsLoginRequest } from './query-params-login-request';

export class QueryParamsLoginResponse extends QueryParamsLoginRequest{
    result:string;
    code:string;
}
