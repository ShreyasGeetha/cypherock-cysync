import { Container, ConfettiBlast, SuccessDialog } from '@cypherock/cysync-ui';
import React, { useEffect } from 'react';

import { routes } from '~/constants';
import { useDevice } from '~/context';
import { useNavigateTo } from '~/hooks';
import { useAppSelector, selectLanguage } from '~/store';
import { keyValueStore } from '~/utils';

export const Congratulations: React.FC = () => {
  const lang = useAppSelector(selectLanguage);
  const navigateTo = useNavigateTo();
  const { disconnectDevice } = useDevice();

  const updateIsOnboardingCompleted = async () => {
    await keyValueStore.isOnboardingCompleted.set(true);
  };

  useEffect(() => {
    disconnectDevice();
    updateIsOnboardingCompleted();
    // delay chosen according to confetti blast animation
    navigateTo(routes.portfolio.path, 3800);
  }, []);

  return (
    <Container height="screen" $bgColor="sideBar" display="flex">
      <ConfettiBlast />
      <SuccessDialog
        title={lang.strings.onboarding.success.title}
        subtext={lang.strings.onboarding.success.subtext}
      />
    </Container>
  );
};
