import { getParsedAmount } from '@cypherock/coin-support-utils';
import {
  loaderGrayIcon,
  LangDisplay,
  FlexGapContainer,
  DialogBox,
  LeanBoxContainer,
  LeanBox,
  Typography,
  Image,
  InputLabel,
  DialogBoxFooter,
  Button,
  settingsIcon,
  Flex,
  Toggle,
  QuestionMarkButton,
  ScrollableContainer,
} from '@cypherock/cysync-ui';
import { IAccount } from '@cypherock/db-interfaces';
import { createSelector } from '@reduxjs/toolkit';
import lodash from 'lodash';
import React, { FC, useMemo, useState } from 'react';

import { CoinIcon } from '~/components';
import { selectAccounts, selectLanguage, useAppSelector } from '~/store';

import { useAddAccountDialog } from '../context';

const selectAccountsAndLang = createSelector(
  [selectLanguage, selectAccounts],
  (a, b) => ({ lang: a, ...b }),
);

const createCheckboxChangeHandler =
  (
    accountsList: IAccount[],
    selectedAccountsList: IAccount[],
    setSelectedAccountsList: React.Dispatch<React.SetStateAction<IAccount[]>>,
  ) =>
  (id: string) => {
    const selectedItem = accountsList.find(a => a.derivationPath === id);
    if (!selectedItem) return;

    const isAlreadySelected =
      selectedAccountsList.findIndex(
        a => a.derivationPath === selectedItem.derivationPath,
      ) !== -1;

    if (isAlreadySelected) {
      setSelectedAccountsList(prevItems =>
        prevItems.filter(item => item.derivationPath !== id),
      );
    } else {
      setSelectedAccountsList(prevItems => [...prevItems, selectedItem]);
    }
  };

const createAccountDisplayList = (params: {
  accountsList: IAccount[];
  selectedAccountsList?: IAccount[];
  checkboxHandler?: (id: string) => void;
}) => {
  const { accountsList, selectedAccountsList, checkboxHandler } = params;

  if (!checkboxHandler) {
    return accountsList.map(a => {
      const { amount, unit } = getParsedAmount({
        coinId: a.assetId,
        unitAbbr: a.unit,
        amount: a.balance,
      });

      return {
        text: a.name,
        id: a.__id,
        tag: lodash.upperCase(a.derivationScheme),
        rightText: `${amount} ${unit.abbr}`,
        leftImage: <CoinIcon assetId={a.assetId} />,
      };
    });
  }

  return accountsList.map(a => ({
    text: a.name,
    id: a.derivationPath,
    tag: lodash.upperCase(a.derivationScheme),
    leftImage: <CoinIcon assetId={a.assetId} />,
    $isChecked: !!selectedAccountsList?.find(
      b => a.derivationPath === b.derivationPath,
    ),
    onCheckChanged: checkboxHandler
      ? () => checkboxHandler(a.derivationPath)
      : undefined,
  }));
};

export const AddAccountSyncDialog: FC = () => {
  const { lang, accounts: existingAccounts } = useAppSelector(
    selectAccountsAndLang,
  );
  const strings = lang.strings.addAccount.sync;

  const {
    onRetry,
    isStopped,
    onStop,
    selectedCoin,
    selectedWallet,
    accounts,
    newAccounts,
    setNewSelectedAccounts,
    newSelectedAccounts,
    addAccountStatus,
    addSelectedAccounts,
    selectedAccounts,
    setSelectedAccounts,
    onClose,
  } = useAddAccountDialog();

  const [isAdvanceChecked, setIsAdvanceChecked] = useState(false);

  const isAllSelected = selectedAccounts.length === accounts.length;

  const handleNewCheckBoxChange = createCheckboxChangeHandler(
    newAccounts,
    newSelectedAccounts,
    setNewSelectedAccounts,
  );

  const handleCheckBoxChange = createCheckboxChangeHandler(
    accounts,
    selectedAccounts,
    setSelectedAccounts,
  );

  const handleAdvanceChange = (checked: boolean) => {
    setIsAdvanceChecked(checked);
  };

  const handleSelectToggle = () => {
    if (isAllSelected) {
      setSelectedAccounts([]);
    } else {
      setSelectedAccounts([...accounts]);
    }
  };

  const newAccountsList = useMemo(
    () =>
      createAccountDisplayList({
        accountsList: newAccounts,
        selectedAccountsList: newSelectedAccounts,
        checkboxHandler: handleNewCheckBoxChange,
      }),
    [newAccounts, newSelectedAccounts, handleNewCheckBoxChange],
  );

  const accountNotSyncedList = useMemo(
    () =>
      createAccountDisplayList({
        accountsList: accounts,
        selectedAccountsList: selectedAccounts,
        checkboxHandler: handleCheckBoxChange,
      }),
    [accounts, selectedAccounts, handleCheckBoxChange],
  );

  const accountsInPortfolioList = useMemo(
    () =>
      createAccountDisplayList({
        accountsList: existingAccounts.filter(
          a =>
            a.walletId === selectedWallet?.__id &&
            a.assetId === selectedCoin?.id,
        ),
      }),
    [existingAccounts],
  );

  const isSyncing = addAccountStatus !== 'done';

  const getActionButtons = () => {
    if (isSyncing) {
      return (
        <Button variant="secondary" onClick={onStop}>
          <LangDisplay text={lang.strings.buttons.stop} />
        </Button>
      );
    }

    return (
      <>
        {isStopped && (
          <Button variant="secondary" onClick={onRetry}>
            <LangDisplay text={strings.resyncButton} />
          </Button>
        )}
        {accounts.length > 0 || newAccounts.length > 0 ? (
          <Button
            variant="primary"
            onClick={addSelectedAccounts}
            disabled={
              selectedAccounts.length <= 0 && newSelectedAccounts.length <= 0
            }
          >
            <LangDisplay text={strings.addAccountButton} />
          </Button>
        ) : (
          <Button variant="primary" onClick={onClose}>
            <LangDisplay text={lang.strings.buttons.close} />
          </Button>
        )}
      </>
    );
  };

  return (
    <DialogBox width={500}>
      <Flex direction="column" justify="center" align="center" width="full">
        <FlexGapContainer pt={4} mb={5}>
          {isSyncing ? (
            <>
              <Image
                src={loaderGrayIcon}
                alt="Loader"
                animate="spin"
                $animDuration={3}
              />
              <Typography variant="h5" $textAlign="center">
                <LangDisplay text={strings.syncingHeader} />
              </Typography>
            </>
          ) : (
            <>
              <Image src={settingsIcon} alt="Loader" />
              <Typography variant="h5" $textAlign="center">
                <LangDisplay text={strings.header} />
              </Typography>
            </>
          )}
        </FlexGapContainer>

        <ScrollableContainer $maxHeight="45vh">
          {newAccountsList.length > 0 && (
            <Flex py={4} pt={0} px={5} gap={1} direction="column">
              <InputLabel
                mt={4}
                mr={1}
                mb={1}
                display="inline-block"
                $fontSize={14}
                $fontWeight="normal"
              >
                <LangDisplay text={strings.newAccount} />
              </InputLabel>
              <LeanBoxContainer>
                {(isAdvanceChecked
                  ? newAccountsList
                  : [newAccountsList[0]]
                ).map(data => (
                  <LeanBox
                    key={data.id}
                    {...data}
                    checkType="checkbox"
                    color="white"
                    disabled={isSyncing}
                  />
                ))}
              </LeanBoxContainer>
              {!isSyncing && newAccountsList.length > 1 && (
                <Flex direction="row" pr={1} align="center">
                  <InputLabel
                    $fontSize={13}
                    $fontWeight="normal"
                    $textAlign="right"
                  >
                    <LangDisplay text={strings.advancedButton} />(
                    <QuestionMarkButton />)
                  </InputLabel>
                  <Toggle
                    checked={isAdvanceChecked}
                    onToggle={handleAdvanceChange}
                  />
                </Flex>
              )}
            </Flex>
          )}

          {accountNotSyncedList.length > 0 && (
            <Flex
              pt={2}
              pb={4}
              px={5}
              $bgColor="lightBlack"
              gap={1}
              direction="column"
            >
              <Flex justify="space-between" align="center" px={1}>
                <div>
                  <InputLabel $fontSize={14} $fontWeight="normal" px={0} mb={1}>
                    <LangDisplay
                      text={strings.accountsNotSynced}
                      variables={{ count: accountNotSyncedList.length }}
                    />
                  </InputLabel>
                </div>
                {!isSyncing && (
                  <div>
                    <Button
                      px={0}
                      mb={0}
                      variant="none"
                      onClick={handleSelectToggle}
                    >
                      <Typography color="gold" $fontSize={14}>
                        <LangDisplay
                          text={
                            isAllSelected
                              ? strings.deselectAllButton
                              : strings.selectAllButton
                          }
                          variables={{ count: selectedAccounts.length }}
                        />
                      </Typography>
                    </Button>
                  </div>
                )}
              </Flex>
              <LeanBoxContainer>
                {accountNotSyncedList.map(data => (
                  <LeanBox
                    key={data.id}
                    {...data}
                    checkType="checkbox"
                    color="white"
                    disabled={isSyncing}
                  />
                ))}
              </LeanBoxContainer>
            </Flex>
          )}

          {accountsInPortfolioList.length > 0 && (
            <Flex pt={2} pb={4} gap={1} px={5} direction="column">
              <InputLabel
                pl={1}
                mr={1}
                mb={1}
                display="inline-block"
                $fontSize={14}
                $fontWeight="normal"
              >
                <LangDisplay
                  text={strings.accountsInPortfolio}
                  variables={{ count: accountsInPortfolioList.length }}
                />
              </InputLabel>
              <LeanBoxContainer>
                {accountsInPortfolioList.map(data => (
                  <LeanBox key={data.id} {...data} color="white" />
                ))}
              </LeanBoxContainer>
            </Flex>
          )}
        </ScrollableContainer>
      </Flex>

      <DialogBoxFooter>{getActionButtons()}</DialogBoxFooter>
    </DialogBox>
  );
};
