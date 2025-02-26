import { getCoinSupport } from '@cypherock/coin-support';
import { IDatabase, IAccount } from '@cypherock/db-interfaces';
import { lastValueFrom, merge, from, Observable } from 'rxjs';

import logger from '../utils/logger';

const MAX_RETRIES = 3;

export interface ISyncAccountsEvent {
  account: IAccount;
  isSuccessful: boolean;
}

export const syncSingleAccount = async (params: {
  db: IDatabase;
  account: IAccount;
}): Promise<ISyncAccountsEvent> => {
  const { db, account } = params;
  const support = getCoinSupport(account.familyId);
  let isSuccessful = false;
  let retryCount = 0;
  let error: any;

  while (!isSuccessful && retryCount < MAX_RETRIES) {
    try {
      await lastValueFrom(
        support.syncAccount({
          accountId: account.__id ?? '',
          db,
        }),
      );
      isSuccessful = true;
    } catch (e) {
      retryCount += 1;
      logger.warn(
        `Error in syncing account ${account.name} ${account.assetId}, retryCount: ${retryCount}`,
      );
      logger.warn(e);
      error = e;
    }
  }

  if (!isSuccessful && error) {
    logger.error(
      `Error in syncing account ${account.name} ${account.assetId}. Max retries exceeded `,
    );
    logger.error(error);
  }

  return { account, isSuccessful };
};

export const syncAccounts = (params: {
  db: IDatabase;
  accounts: IAccount[];
}) => {
  const { db, accounts } = params;

  const allObservables: Observable<ISyncAccountsEvent>[] = [];
  for (const account of accounts) {
    const observable = from(
      syncSingleAccount({
        account,
        db,
      }),
    );

    allObservables.push(observable);
  }

  return merge(...allObservables);
};
