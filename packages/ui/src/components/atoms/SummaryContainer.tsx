import React, { ReactNode } from 'react';
import { css, styled } from 'styled-components';

export const commonContainerStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Main = styled.div<{ top?: number }>`
  display: flex;
  justify-content: center;
  align-self: stretch;
  align-items: flex-start;
  margin: ${props => (props.top ? `${props.top}px 0` : '0')};
`;

export const LeftContainer = styled.div`
  ${commonContainerStyles};
`;

export const RightContainer = styled.div`
  margin-left: auto;
  ${commonContainerStyles};
`;

export const NestedContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
`;

export const ScrollContainer = styled.div`
  align-self: stretch;
  overflow-y: auto;
  max-height: 226px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.palette.border.popup};
  background: ${({ theme }) => theme.palette.background.container};
  padding-left: 16px;
  padding-right: 16px;
`;

interface SummaryContainerProps {
  margin?: number;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
}

export const SummaryContainer: React.FC<SummaryContainerProps> = ({
  margin,
  leftComponent,
  rightComponent,
}) => (
  <Main top={margin}>
    <LeftContainer>{leftComponent}</LeftContainer>
    <RightContainer>{rightComponent}</RightContainer>
  </Main>
);

SummaryContainer.defaultProps = {
  margin: undefined,
  leftComponent: undefined,
  rightComponent: undefined,
};
