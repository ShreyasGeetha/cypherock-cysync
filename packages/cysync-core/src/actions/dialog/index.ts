import { IDialogState, openDialog } from '~/store';

export const openAddAccDialog = (data: IDialogState['addAccount']['data']) =>
  openDialog({ name: 'addAccount', data });

export const openAddAccountDialog = () =>
  openDialog({ name: 'addAccount', data: undefined });

export const openWalletSyncErrorDialog = () =>
  openDialog({ name: 'walletSyncError', data: undefined });

export const openWalletActionsDialog = () =>
  openDialog({ name: 'walletActions', data: undefined });

export const openCreateWalletGuideDialog = () =>
  openDialog({ name: 'createWalletGuide', data: undefined });
