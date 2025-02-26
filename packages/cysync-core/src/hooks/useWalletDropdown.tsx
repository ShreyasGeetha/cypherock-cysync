import {
  DropDownListItemProps,
  WalletIcon,
  useTheme,
} from '@cypherock/cysync-ui';
import { IWallet } from '@cypherock/db-interfaces';
import React, { useMemo, useState } from 'react';

import { selectWallets, useAppSelector } from '..';

export const useWalletDropdown = () => {
  const [selectedWallet, setSelectedWallet] = useState<IWallet | undefined>();
  const { wallets } = useAppSelector(selectWallets);
  const theme = useTheme();

  const handleWalletChange = (id?: string) => {
    if (!id) setSelectedWallet(undefined);
    setSelectedWallet(wallets.find(w => w.__id === id));
  };

  const walletDropdownList: DropDownListItemProps[] = useMemo(
    () =>
      wallets.map(w => ({
        id: w.__id,
        text: w.name,
        checkType: 'radio',
        leftImage: (
          <WalletIcon fill={theme.palette.text.white} width={20} height={20} />
        ),
      })),
    [wallets],
  );

  return {
    selectedWallet,
    setSelectedWallet,
    handleWalletChange,
    walletDropdownList,
  };
};
