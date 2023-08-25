import { CoinSupport, IPreparedTransaction, IReceiveEvent, IReceiveParams, ISignTransactionEvent, ISyncPricesParams, ICreateAccountEvent, ISyncPriceHistoriesParams, IGetAccountHistoryResult, IGetCoinAllocationsParams } from '@cypherock/coin-support-interfaces';
import { ITransaction } from '@cypherock/db-interfaces';
import { Observable } from 'rxjs';
export { updateLogger } from './utils/logger';
export declare class NearSupport implements CoinSupport {
    receive(params: IReceiveParams): Observable<IReceiveEvent>;
    createAccounts(): Observable<ICreateAccountEvent>;
    syncAccount(): Observable<void>;
    initializeTransaction(): Promise<IPreparedTransaction>;
    prepareTransaction(): Promise<IPreparedTransaction>;
    signTransaction(): Observable<ISignTransactionEvent>;
    broadcastTransaction(): Promise<ITransaction>;
    validateAddress(): boolean;
    getCoinAllocations(params: IGetCoinAllocationsParams): Promise<import("@cypherock/coin-support-interfaces").IGetCoinAllocationsResult>;
    getAccountHistory(): Promise<IGetAccountHistoryResult>;
    syncPrices(params: ISyncPricesParams): Observable<void>;
    syncPriceHistories(params: ISyncPriceHistoriesParams): Observable<void>;
}
//# sourceMappingURL=index.d.ts.map