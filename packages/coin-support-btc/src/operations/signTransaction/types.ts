import {
  ISignTransactionParams,
  ISignTransactionEvent,
  SignTransactionDeviceEvent,
} from '@cypherock/coin-support-interfaces';
import { SignTxnEvent } from '@cypherock/sdk-app-btc';

export type ISignBtcTransactionParams = ISignTransactionParams;

export type ISignBtcTransactionEvent = ISignTransactionEvent;

export const signBtcToDeviceEventMap: Partial<
  Record<SignTxnEvent, SignTransactionDeviceEvent | undefined>
> = {
  [SignTxnEvent.INIT]: SignTransactionDeviceEvent.INIT,
  [SignTxnEvent.CONFIRM]: SignTransactionDeviceEvent.CONFIRMED,
  [SignTxnEvent.PASSPHRASE]: SignTransactionDeviceEvent.PASSPHRASE_ENTERED,
  [SignTxnEvent.PIN_CARD]: SignTransactionDeviceEvent.CARD_TAPPED,
};
