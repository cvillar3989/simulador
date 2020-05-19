import { InstructedAmount } from './instructed-amount-payments-sca-response';
import { DebtorAccount } from './debtor-account-payments-sca-response';
import { CreditorAccount } from './creditor-account-payments-sca-response';

export class InformationByConfirmationPaymentsSCA{
    instructedAmount: InstructedAmount;
    debtorAccount: DebtorAccount;
    creditorAccount: CreditorAccount;
    creditorAgent:string;
    creditorName: string;
    comition: string;
    creditorAddress: any;
    chargeBearer:string; 
    remittanceInformationUnstructured: string;
    requestedExecutionDate: string;
    requestedExecutionTime:string;
}
