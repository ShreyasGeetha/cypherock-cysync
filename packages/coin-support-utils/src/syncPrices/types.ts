import { ISyncPricesParams } from '@cypherock/coin-support-interfaces';
import { IDatabase } from '@cypherock/db-interfaces';

export type GetCoinIds = (db: IDatabase) => Promise<string[]>;

export interface ICreateSyncPricesObservableParams extends ISyncPricesParams {
  getCoinIds: GetCoinIds;
}
