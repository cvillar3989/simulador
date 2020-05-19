import { TPPResponse } from './tpp-response';
import { AccessAccountsResponse } from './access-accounts-response';

export class ConcentsResponse {
    tpp: TPPResponse;
    access: AccessAccountsResponse;
    recurringIndicator: boolean;
    validUntil: string;
    frequencyPerDay: number;
    lastActionDate: string;
    consentStatus: string;
}
