import { openDialog } from '~/store';

export const openWalletSyncErrorDialog = () =>
  openDialog({ name: 'walletSyncError', data: undefined });

export const openWalletActionsDialog = () =>
  openDialog({ name: 'walletActions', data: undefined });

export const openCreateWalletGuideDialog = () =>
  openDialog({ name: 'createWalletGuide', data: undefined });

export const openAddAccountDialog = () =>
  openDialog({ name: 'addAccountDialog', data: undefined });

export const openReceiveGuideDialog = () =>
  openDialog({ name: 'receiveGuide', data: undefined });
