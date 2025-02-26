import {
  DialogBox,
  DialogBoxBody,
  WalletDialogMainContainer,
  MilestoneAside,
  CloseButton,
  BlurOverlay,
  DialogBoxBackgroundBar,
} from '@cypherock/cysync-ui';
import React, { FC } from 'react';

import { ErrorHandlerDialog, WithConnectedDevice } from '~/components';
import { selectLanguage, useAppSelector } from '~/store';

import { ReceiveDialogProvider, useReceiveDialog } from './context';
import { CloseConfirmation } from './Dialogs/Components';

const DeviceConnectionWrapper: React.FC<{
  isDeviceRequired: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}> = ({ isDeviceRequired, label, onClick, children }) => {
  if (isDeviceRequired)
    return (
      <WithConnectedDevice buttonLabel={label} buttonOnClick={onClick}>
        {children}
      </WithConnectedDevice>
    );
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export const Receive: FC = () => {
  const {
    tabs,
    currentTab,
    currentDialog,
    onClose,
    isDeviceRequired,
    error,
    onRetry,
    onSkip,
    isStartedWithoutDevice,
  } = useReceiveDialog();
  const lang = useAppSelector(selectLanguage);
  const [showOnClose, setShowOnClose] = React.useState(false);

  return (
    <BlurOverlay>
      <DialogBox direction="row" gap={0} width="full">
        {showOnClose && <CloseConfirmation setShowOnClose={setShowOnClose} />}
        <>
          <MilestoneAside
            milestones={tabs
              .filter(t => !t.dontShowOnMilestone)
              .map(t => t.name)}
            activeTab={currentTab}
            heading={lang.strings.receive.title}
          />
          <WalletDialogMainContainer>
            <DialogBoxBody
              p="20"
              grow={2}
              align="center"
              gap={110}
              direction="column"
              height="full"
            >
              <DeviceConnectionWrapper
                isDeviceRequired={!isStartedWithoutDevice && isDeviceRequired}
                label={lang.strings.receive.showAnywayButton}
                onClick={onSkip}
              >
                <ErrorHandlerDialog
                  error={error}
                  onClose={onClose}
                  onRetry={onRetry}
                >
                  {tabs[currentTab]?.dialogs[currentDialog]}
                </ErrorHandlerDialog>
              </DeviceConnectionWrapper>
            </DialogBoxBody>
            <DialogBoxBackgroundBar
              rightComponent={
                <CloseButton onClick={() => setShowOnClose(true)} />
              }
              position="top"
              useLightPadding
            />
          </WalletDialogMainContainer>
        </>
      </DialogBox>
    </BlurOverlay>
  );
};

export const ReceiveDialog: FC = () => (
  <ReceiveDialogProvider>
    <Receive />
  </ReceiveDialogProvider>
);
