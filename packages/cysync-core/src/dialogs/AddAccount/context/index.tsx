// The ReactNodes won't be rendered as list so key is not required
/* eslint-disable react/jsx-key */
import { getCoinSupport } from '@cypherock/coin-support';
import {
  ICreateAccountEvent,
  ICreatedAccount,
} from '@cypherock/coin-support-interfaces';
import { ICoinInfo } from '@cypherock/coins';
import { DropDownListItemProps } from '@cypherock/cysync-ui';
import { IAccount, IWallet } from '@cypherock/db-interfaces';
import lodash from 'lodash';
import React, {
  Context,
  FC,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
  useRef,
} from 'react';
import { Observer, Subscription } from 'rxjs';

import { syncAccounts } from '~/actions';
import { deviceLock, useDevice } from '~/context';
import { ITabs, useTabsAndDialogs } from '~/hooks';
import { useWalletDropdown } from '~/hooks/useWalletDropdown';
import {
  closeDialog,
  selectLanguage,
  useAppDispatch,
  useAppSelector,
} from '~/store';
import { getDB } from '~/utils';
import logger from '~/utils/logger';

import {
  AddAccountSelectionDialog,
  AddAccountSyncDialog,
  AddAccountCongrats,
  AddAccountDeviceActionDialog,
} from '../Dialogs';

export type AddAccountStatus = 'idle' | 'device' | 'sync' | 'done';

export interface AddAccountDialogContextInterface {
  tabs: ITabs;
  isDeviceRequired: boolean;
  currentTab: number;
  currentDialog: number;
  onNext: () => void;
  goTo: (tab: number, dialog?: number) => void;
  onPrevious: () => void;
  onClose: () => void;
  selectedCoin: ICoinInfo | undefined;
  selectedWallet: IWallet | undefined;
  selectedAccounts: IAccount[];
  newSelectedAccounts: IAccount[];
  setSelectedCoin: React.Dispatch<React.SetStateAction<ICoinInfo | undefined>>;
  setSelectedWallet: React.Dispatch<React.SetStateAction<IWallet | undefined>>;
  setSelectedAccounts: React.Dispatch<React.SetStateAction<IAccount[]>>;
  setNewSelectedAccounts: React.Dispatch<React.SetStateAction<IAccount[]>>;
  startAddAccounts: () => void;
  addSelectedAccounts: () => void;
  isStopped: boolean;
  onStop: () => void;
  onRetry: () => void;
  newAccounts: IAccount[];
  accounts: IAccount[];
  deviceEvents: Record<number, boolean | undefined>;
  addAccountStatus: AddAccountStatus;
  error: any | undefined;
  walletDropdownList: DropDownListItemProps[];
  handleWalletChange: () => void;
}

export const AddAccountDialogContext: Context<AddAccountDialogContextInterface> =
  createContext<AddAccountDialogContextInterface>(
    {} as AddAccountDialogContextInterface,
  );

export interface AddAccountDialogContextProviderProps {
  children: ReactNode;
}

export const AddAccountDialogProvider: FC<
  AddAccountDialogContextProviderProps
> = ({ children }) => {
  const lang = useAppSelector(selectLanguage);
  const dispatch = useAppDispatch();
  const { connection, connectDevice } = useDevice();

  const {
    selectedWallet,
    setSelectedWallet,
    handleWalletChange,
    walletDropdownList,
  } = useWalletDropdown();
  const [selectedCoin, setSelectedCoin] = useState<ICoinInfo | undefined>();
  const [selectedAccounts, setSelectedAccounts] = useState<IAccount[]>([]);
  const [newSelectedAccounts, setNewSelectedAccounts] = useState<IAccount[]>(
    [],
  );

  const [isStopped, setIsStopped] = useState(false);
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [newAccounts, setNewAccounts] = useState<IAccount[]>([]);
  const [deviceEvents, setDeviceEvents] = useState<
    Record<number, boolean | undefined>
  >({});

  const [addAccountStatus, setAddAccountStatus] =
    useState<AddAccountStatus>('idle');
  const [error, setError] = useState<any | undefined>();

  const addAccountSubscriptionRef = useRef<Subscription | undefined>();

  const deviceRequiredDialogsMap: Record<number, number[] | undefined> = {
    1: [0],
  };

  const tabs: ITabs = [
    {
      name: lang.strings.addAccount.aside.tabs.asset,
      dialogs: [<AddAccountSelectionDialog />],
    },
    {
      name: lang.strings.addAccount.aside.tabs.device,
      dialogs: [<AddAccountDeviceActionDialog />],
    },
    {
      name: lang.strings.addAccount.aside.tabs.confirmation,
      dialogs: [<AddAccountSyncDialog />],
    },
    {
      name: '',
      dialogs: [<AddAccountCongrats />],
      dontShowOnMilestone: true,
    },
  ];

  const {
    onNext,
    onPrevious,
    goTo,
    currentTab,
    currentDialog,
    isDeviceRequired,
  } = useTabsAndDialogs({
    deviceRequiredDialogsMap,
    tabs,
  });

  const resetAddAccountStates = () => {
    setAddAccountStatus('idle');
    setNewAccounts([]);
    setIsStopped(false);
    setAccounts([]);
    setNewSelectedAccounts([]);
    setSelectedAccounts([]);
    setDeviceEvents({});
    setError(undefined);
  };

  const cleanUpAddAccount = () => {
    if (addAccountSubscriptionRef.current) {
      addAccountSubscriptionRef.current.unsubscribe();
      addAccountSubscriptionRef.current = undefined;
    }
  };

  const onClose = () => {
    setAddAccountStatus('idle');
    cleanUpAddAccount();
    dispatch(closeDialog('addAccount'));
  };

  const onError = (e?: any) => {
    cleanUpAddAccount();
    setError(e);
  };

  const createAccountSetter =
    (account: ICreatedAccount) => (list: IAccount[]) =>
      [...list, { ...account, isNew: undefined }];

  const getAddAccountObserver = (
    onEnd: () => void,
  ): Observer<ICreateAccountEvent> => ({
    next: payload => {
      if (payload.device) {
        setDeviceEvents({ ...payload.device.events });
        if (payload.device.isDone) {
          setAddAccountStatus('sync');
        }
      }

      if (payload.account) {
        if (payload.account.isNew) {
          setNewAccounts(createAccountSetter(payload.account));
        } else {
          setAccounts(createAccountSetter(payload.account));
        }
      }
    },
    error: err => {
      onEnd();
      onError(err);
      setAddAccountStatus('idle');
    },
    complete: () => {
      onEnd();
      setAddAccountStatus('done');
      cleanUpAddAccount();
    },
  });

  const startAddAccounts = async () => {
    logger.info('Started add account');

    if (!connection || !selectedCoin || !selectedWallet) {
      return;
    }

    resetAddAccountStates();
    cleanUpAddAccount();
    const coinSupport = getCoinSupport(selectedCoin.family);

    setAddAccountStatus('device');

    const taskId = lodash.uniqueId('task-');

    await deviceLock.acquire(connection.device, taskId);

    const onEnd = () => {
      deviceLock.release(connection.device, taskId);
    };

    const deviceConnection = await connectDevice(connection.device);
    const subscription = coinSupport
      .createAccounts({
        walletId: selectedWallet.__id ?? '',
        connection: deviceConnection,
        db: getDB(),
        coinId: selectedCoin.id,
      })
      .subscribe(getAddAccountObserver(onEnd));

    addAccountSubscriptionRef.current = subscription;
  };

  const onStop = () => {
    setIsStopped(true);
    setAddAccountStatus('done');
    cleanUpAddAccount();
  };

  const onRetry = () => {
    resetAddAccountStates();
    goTo(1, 0);
  };

  const addSelectedAccounts = async () => {
    const allAccountsToAdd = [...selectedAccounts, ...newSelectedAccounts];
    if (allAccountsToAdd.length === 0) {
      return;
    }

    try {
      const db = getDB();
      const addedAccounts = await db.account.insert(allAccountsToAdd);
      dispatch(syncAccounts({ accounts: addedAccounts }));
      goTo(3, 0);
    } catch (e) {
      onError(e);
    }
  };

  useEffect(() => {
    if (!connection) {
      if (addAccountStatus === 'device') {
        setAddAccountStatus('idle');
        resetAddAccountStates();
        cleanUpAddAccount();
      }
    }
  }, [connection]);

  useEffect(
    () => () => {
      cleanUpAddAccount();
    },
    [],
  );

  const ctx = useMemo(
    () => ({
      isDeviceRequired,
      currentTab,
      currentDialog,
      tabs,
      onNext,
      goTo,
      onPrevious,
      onClose,
      selectedCoin,
      selectedWallet,
      selectedAccounts,
      setSelectedAccounts,
      setSelectedCoin,
      setSelectedWallet,
      startAddAccounts,
      addSelectedAccounts,
      newAccounts,
      setNewSelectedAccounts,
      newSelectedAccounts,
      isStopped,
      onStop,
      onRetry,
      accounts,
      deviceEvents,
      addAccountStatus,
      error,
      handleWalletChange,
      walletDropdownList,
    }),
    [
      isDeviceRequired,
      currentTab,
      currentDialog,
      tabs,
      onNext,
      goTo,
      onPrevious,
      onClose,
      selectedCoin,
      selectedWallet,
      selectedAccounts,
      setSelectedAccounts,
      setSelectedCoin,
      setSelectedWallet,
      startAddAccounts,
      addSelectedAccounts,
      newAccounts,
      setNewSelectedAccounts,
      newSelectedAccounts,
      isStopped,
      onStop,
      onRetry,
      accounts,
      deviceEvents,
      addAccountStatus,
      error,
      handleWalletChange,
      walletDropdownList,
    ],
  );

  return (
    <AddAccountDialogContext.Provider value={ctx}>
      {children}
    </AddAccountDialogContext.Provider>
  );
};

export function useAddAccountDialog(): AddAccountDialogContextInterface {
  return useContext(AddAccountDialogContext);
}
