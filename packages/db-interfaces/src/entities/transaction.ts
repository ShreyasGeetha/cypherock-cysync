import type { IEntity, IRepository, IGetOptions, ObjectLiteral } from './base';

export const TransactionStatusMap = {
  pending: 'pending',
  failed: 'failed',
  success: 'success',
} as const;

export type TransactionStatus =
  (typeof TransactionStatusMap)[keyof typeof TransactionStatusMap];

export const TransactionTypeMap = {
  receive: 'receive',
  send: 'send',
};

export type TransactionType =
  (typeof TransactionTypeMap)[keyof typeof TransactionTypeMap];

export interface ITransactionInputOutput {
  address: string;
  amount: string;
  isMine: boolean;
}

export interface ITransaction extends IEntity {
  hash: string;
  fees: string;
  amount: string;
  status: TransactionStatus;
  type: TransactionType;
  timestamp: number;
  blockHeight: number;
  inputs: ITransactionInputOutput[];
  outputs: ITransactionInputOutput[];
  confirmations?: number;
  extraData?: ObjectLiteral;
  // foreign keys
  accountId: string;
  walletId: string;
  assetId: string;
  familyId: string;
  parentTransactionId?: string;
  parentAccountId?: string;
  parentAssetId?: string;
}

export interface IDetailedTransaction extends ITransaction {
  accountName: string;
  walletName: string;
  value: string; // balance in unit fetched from price info
}

export interface ITransactionRepository extends IRepository<ITransaction> {
  getTransactionList: (
    params: IGetOptions<ITransaction>,
  ) => Promise<IDetailedTransaction[]>;
}
