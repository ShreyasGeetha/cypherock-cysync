import { evmCoinList } from '@cypherock/coins';
import { assert } from '@cypherock/cysync-utils';
import WAValidator from 'multicoin-address-validator';

export const validateAddress = (params: {
  address: string;
  coinId: string;
}) => {
  const { address, coinId } = params;
  const coin = evmCoinList[coinId];

  assert(coin, new Error(`Cannot find coin details for coin: ${coinId}`));

  return WAValidator.validate(address, 'eth', coin.isTest ? 'testnet' : 'prod');
};
