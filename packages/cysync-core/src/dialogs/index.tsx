import { ReactComponentLike } from 'prop-types';
import { DialogName } from '~/store';
import { CreateWalletGuide } from './CreateWalletGuide';
import { WalletActionsDialogBox } from './WalletActions';
import { WalletSyncError } from './WalletSyncError';
import { AddAccountGuide } from './AddAccount';

export const dialogs: Record<DialogName, ReactComponentLike> = {
  addAccount: AddAccountGuide,
  walletSyncError: WalletSyncError,
  walletActions: WalletActionsDialogBox,
  createWalletGuide: CreateWalletGuide,
};
