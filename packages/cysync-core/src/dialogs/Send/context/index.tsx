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

import {
  SelectSend,
  DeniedOnDevice,
  LoadingDialog,
  StandardEthereum,
  StandardOptimism,
  SendConfirmToken,
  SummaryDialog,
  SummaryScrollDialog,
  BitcoinTransaction,
  ConnectDevice,
  SendProblem,
  SendDone,
  SummaryOptimism,
  OptimismVerify,
} from '../Dialogs';
import { selectLanguage, useAppSelector } from '~/store';

type ITabs = {
  name: string;
  dialogs: ReactNode[];
}[];

export interface SendDialogContextInterface {
  tabs: ITabs;
  currentTab: number;
  setCurrentTab: Dispatch<SetStateAction<number>>;
  currentDialog: number;
  setCurrentDialog: Dispatch<SetStateAction<number>>;
  onNext: (tab?: number, dialog?: number) => void;
  onPrevious: () => void;
}

export const SendDialogContext: Context<SendDialogContextInterface> =
  createContext<SendDialogContextInterface>({} as SendDialogContextInterface);

export interface SendDialogContextProviderProps {
  children: ReactNode;
}

export const SendDialogProvider: FC<SendDialogContextProviderProps> = ({
  children,
}) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [currentDialog, setCurrentDialog] = useState<number>(0);

  const lang = useAppSelector(selectLanguage);

  const tabs: ITabs = [
    {
      name: lang.strings.send.aside.tabs.source,
      dialogs: [<SelectSend />],
    },
    {
      name: lang.strings.send.aside.tabs.recipient,
      dialogs: [
        <DeniedOnDevice />,
        <BitcoinTransaction />,
        <StandardEthereum />,
        <StandardOptimism />,
      ],
    },
    {
      name: lang.strings.send.aside.tabs.summary,
      dialogs: [
        <SummaryDialog />,
        <SummaryScrollDialog />,
        <SummaryOptimism />,
      ],
    },
    {
      name: lang.strings.send.aside.tabs.x1vault,
      dialogs: [<SendConfirmToken />, <OptimismVerify />, <ConnectDevice />],
    },
    {
      name: lang.strings.send.aside.tabs.confirm,
      dialogs: [<LoadingDialog />, <SendProblem />, <SendDone />],
    },
  ];

  const onNext = (tab?: number, dialog?: number) => {
    if (typeof tab === 'number' && typeof dialog === 'number') {
      setCurrentTab(tab);
      setCurrentDialog(dialog);
    } else if (currentDialog + 1 > tabs[currentTab].dialogs.length - 1) {
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
    <SendDialogContext.Provider value={ctx}>
      {children}
    </SendDialogContext.Provider>
  );
};

export function useSendDialog(): SendDialogContextInterface {
  return useContext(SendDialogContext);
}
