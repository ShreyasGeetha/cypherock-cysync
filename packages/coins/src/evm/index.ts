import coinList from './coins';

import { coinFamiliesMap, ICoinInfo, ICoinUnit } from '../types';

type EvmFamily = typeof coinFamiliesMap.evm;

export interface IEvmCoinInfo extends ICoinInfo {
  family: EvmFamily;
  chain: number;
  network: string;
}

export const EvmIdMap = {
  ethereum: 'ethereum',
  polygon: 'polygon',
  binance: 'binance',
  fantom: 'fantom',
  avalanche: 'avalanche',
  arbitrum: 'arbitrum',
  optimism: 'optimism',
} as const;

export type EvmId = (typeof EvmIdMap)[keyof typeof EvmIdMap];

const units: ICoinUnit[] = [
  {
    name: 'Gwei',
    abbr: 'Gwei',
    magnitude: 9,
  },
  {
    name: 'Mwei',
    abbr: 'Mwei',
    magnitude: 6,
  },
  {
    name: 'Kwei',
    abbr: 'Kwei',
    magnitude: 3,
  },
  {
    name: 'wei',
    abbr: 'wei',
    magnitude: 0,
  },
];

export const evmCoinList: Record<string, IEvmCoinInfo> = coinList.reduce<
  Record<string, IEvmCoinInfo>
>(
  (list, coin) => ({
    ...list,
    [coin.id]: {
      family: coinFamiliesMap.evm,
      id: coin.id,
      name: coin.name,
      abbr: coin.abbr,
      isTest: coin.isTest,
      coinGeckoId: coin.coinGeckoId,
      coinIndex: coin.coinIndex,
      feesUnit: coin.feesUnit,
      chain: coin.chain,
      network: coin.network,
      units: [
        { name: coin.name, abbr: coin.abbr, magnitude: coin.magnitude },
        ...units,
      ],
    },
  }),
  {},
);
