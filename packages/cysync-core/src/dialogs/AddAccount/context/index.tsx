// The ReactNodes won't be rendered as list so key is not required
/* eslint-disable react/jsx-key */
import React, {
  Context,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import { AddAccountDialog, useAppSelector } from '../../..';
import { AddAccountSingleChainDialog } from '../Dialogs/AddAccountSingleChainDialog';
import { ConnectDevice } from '../Dialogs/ConnectDevice';
import { InitialiseAccountDialog } from '../Dialogs/InitialiseAccountDialog';
import { NoAccountDialog } from '../Dialogs/NoAccountDialog';
import { SelectCryptoDialog } from '../Dialogs/SelectCryptoDialog';
import { SyncAccountDialog } from '../Dialogs/SyncAccountDialog';
import { AddAccountCongrats } from '../Dialogs/AddAccountCongrats';

type ITabs = {
  name: string;
  dialogs: ReactNode[];
}[];

export interface AddAccountContextInterface {
  tabs: ITabs;
  currentTab: number;
  setCurrentTab: Dispatch<SetStateAction<number>>;
  currentDialog: number;
  setCurrentDialog: Dispatch<SetStateAction<number>>;
  onNext: () => void;
  onPrevious: () => void;
}

export const AddAccountContext: Context<AddAccountContextInterface> =
  createContext<AddAccountContextInterface>({} as AddAccountContextInterface);

export interface AddAccountContextProviderProps {
  children: ReactNode;
}

export const AddAccountProvider: FC<AddAccountContextProviderProps> = ({
  children,
}) => {
  const lang = useAppSelector(state => state.addAccount.strings);
  const milestone = lang.addAccount.aside.tabs;
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [currentDialog, setCurrentDialog] = useState<number>(0);

  const tabs: ITabs = [
    {
      name: milestone.asset,
      dialogs: [<SelectCryptoDialog />],
    },
    {
      name: milestone.device,
      dialogs: [
        <ConnectDevice />,
        <InitialiseAccountDialog />,
        <AddAccountDialog />,
        <AddAccountSingleChainDialog />,
        <NoAccountDialog />,
        <SyncAccountDialog />,
      ],
    },
    {
      name: milestone.confirmation,
      dialogs: [<AddAccountCongrats />],
    },
  ];

  const onNext = () => {
    if (currentDialog + 1 > tabs[currentTab].dialogs.length - 1) {
      setCurrentTab(prevProps => Math.min(tabs.length - 1, prevProps + 1));
      if (currentTab !== tabs.length - 1) {
        setCurrentDialog(0);
      }
    } else {
      setCurrentDialog(prevProps =>
        Math.min(tabs[currentTab].dialogs.length - 1, prevProps + 1),
      );
    }
  };

  const onPrevious = () => {
    if (currentDialog - 1 < 0) {
      if (currentTab === 0) {
        setCurrentDialog(0);
      } else {
        setCurrentDialog(tabs[currentTab - 1].dialogs.length - 1);
        setCurrentTab(prevProps => Math.max(0, prevProps - 1));
      }
    } else {
      setCurrentDialog(prevProps => Math.max(0, prevProps - 1));
    }
  };

  const ctx = useMemo(
    () => ({
      currentTab,
      setCurrentTab,
      currentDialog,
      setCurrentDialog,
      tabs,
      onNext,
      onPrevious,
    }),
    [
      currentTab,
      setCurrentTab,
      currentDialog,
      setCurrentDialog,
      tabs,
      onNext,
      onPrevious,
    ],
  );

  return (
    <AddAccountContext.Provider value={ctx}>
      {children}
    </AddAccountContext.Provider>
  );
};

export function useAddAccountGuide(): AddAccountContextInterface {
  return useContext(AddAccountContext);
}
