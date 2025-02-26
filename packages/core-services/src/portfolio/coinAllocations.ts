import { getCoinSupport } from '@cypherock/coin-support';
import { ICoinAllocation } from '@cypherock/coin-support-interfaces';
import { coinFamiliesMap } from '@cypherock/coins';
import { BigNumber } from '@cypherock/cysync-utils';
import { IDatabase } from '@cypherock/db-interfaces';

export interface ICoinAllocationWithPercentage extends ICoinAllocation {
  percentage: number;
}

export const getCoinAllocations = async (db: IDatabase) => {
  const coinFamiliesList = Object.keys(coinFamiliesMap);

  const allocations: ICoinAllocation[] = [];
  const allocationsWithPercentage: ICoinAllocationWithPercentage[] = [];

  for (const coinFamily of coinFamiliesList) {
    const coinSupport = getCoinSupport(coinFamily);
    allocations.push(
      ...(await coinSupport.getCoinAllocations({ db })).allocations,
    );
  }

  const total = allocations.reduce((t, a) => t.plus(a.value), new BigNumber(0));

  for (const allocation of allocations) {
    allocationsWithPercentage.push({
      ...allocation,
      percentage: new BigNumber(allocation.value)
        .dividedBy(total)
        .multipliedBy(100)
        .toNumber(),
    });
  }

  return allocationsWithPercentage;
};
