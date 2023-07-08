/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  SyncStatusType,
  ConnectionStatusType,
  Topbar,
  Container,
  ConfettiBlast,
  SuccessDialog,
} from '@cypherock/cysync-ui';
import React, { FC, useState } from 'react';
import { selectLanguage, useAppSelector } from '~/store';
import { DeviceNotConnectedDialogBox } from '../OnBoarding';

export const Portfolio: FC = () => {
  const lang = useAppSelector(selectLanguage);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLock, setIsLock] = useState<boolean>(true);
  const [haveNotifications, setHaveNotifications] = useState<boolean>(false);
  const [syncState, setSyncState] = useState<SyncStatusType>('syncronized');
  const [connectionState, setConnectionState] =
    useState<ConnectionStatusType>('connected');
  return (
    <>
      <Topbar
        title={lang.strings.portfolio.title}
        statusTexts={lang.strings.topbar.statusTexts}
        isVisible={isVisible}
        isLock={isLock}
        haveNotifications={haveNotifications}
        syncStatus={syncState}
        connectionStatus={connectionState}
      />

      <Container height="screen" $bgColor="sideBar" display="flex">
        {/* <ConfettiBlast />
        <SuccessDialog
          title={'Account added successfully'}
          subtext={'Add other accounts or return to portfolio'}
          headerText={'Add coin/account'}
          buttonText={'Done'}
          handleClick={() => console.log('hello')}
          secButtonText={'Add more'}
          handleSecClick={() => console.log('test')}
        /> */}

        <DeviceNotConnectedDialogBox
          headerText={'Add coin/Account'}
          title={lang.strings.onboarding.deviceDetection.title}
        
        />
      </Container>
    </>
  );
};
