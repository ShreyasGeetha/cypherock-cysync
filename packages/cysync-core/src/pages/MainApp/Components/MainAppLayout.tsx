import { Flex } from '@cypherock/cysync-ui';
import React, { FC, ReactNode } from 'react';

import { AppUpdateBar, Topbar } from '~/components';

import { SideBar } from './SideBar';

interface MainAppLayoutProps {
  title: string;
  children?: ReactNode;
}

export const MainAppLayout: FC<MainAppLayoutProps> = ({ title, children }) => (
  <Flex width="full" height="full" $bgColor="contentGradient">
    <SideBar />
    <Flex width="full" direction="column">
      <Flex direction="column" gap={16}>
        <AppUpdateBar />
        <Topbar title={title} />
      </Flex>
      <Flex direction="column" gap={16} p="20">
        {children}
      </Flex>
    </Flex>
  </Flex>
);

MainAppLayout.defaultProps = {
  children: undefined,
};
