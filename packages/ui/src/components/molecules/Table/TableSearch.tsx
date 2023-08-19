import React, { FC } from 'react';
import styled, { css } from 'styled-components';

import { CrossMark, SearchIcon } from '../../../assets';
import { Input, Typography } from '../../atoms';
import { goldenGradient } from '../../utils';

export interface TableSearchProps {
  onSearch?: (value: string) => void;
  $borderGold?: boolean;
  onPostfixIconClick?: () => void;
}

interface TableStructureProps {
  $totalHeight: number;
}

export const TableStructure = styled.div<TableStructureProps>`
  position: relative;
  transition: max-height 0.3s ease-out;
  box-shadow: ${({ theme }) => theme.palette.shadow.popup};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  border-bottom-left-radius: 24px;
  background: ${({ theme }) => theme.palette.primary.primary};
  @media ${({ theme }) => theme.screens.lg} {
    margin-top: 20px;
    margin-left: 20px;
    overflow-y: scroll;
  }
  margin-left: 0px 20px;
  z-index: 10;
`;

export const MainAppBodyWrapper = styled.div`
  position: relative;
`;

export const WalletStructure = styled.div`
  @media ${({ theme }) => theme.screens.lg} {
    max-height: 900px;
    padding-right: 8px;
    margin-right: 8px;
  }
  @media ${({ theme }) => theme.screens.xl} {
    max-height: 1100px;
    padding-right: 8px;
    margin-right: 8px;
  }
  border-bottom-right-radius: 24px;
  background: ${({ theme }) => theme.palette.content.content};
`;
export const MainAppBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 16px;
  position: absolute;
  overflow: auto;
`;

const TableTitleSearch = styled.div<TableSearchProps>`
  width: auto;
  display: flex;
  align-items: center;
  padding: 16px 40px;
  @media ${({ theme }) => theme.screens.md} {
    padding: 16px 24px;
  }
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  overflow: hidden;
  gap: 48px;
  background: ${({ theme }) => theme.palette.background.primary};
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.table.title};
`;

const SearchWrapper = styled.div<TableSearchProps>`
  width: 100%;
  border-radius: 8px;
  ${({ $borderGold }) =>
    $borderGold &&
    css`
      border: 1px solid transparent;
      ${goldenGradient('background')};
    `};
`;

const OverflowTypography = styled(Typography)`
  overflow: visible;
`;

export const TableSearch: FC<TableSearchProps> = ({
  onSearch,
  $borderGold = false,
  onPostfixIconClick,
}) => (
  <TableTitleSearch>
    <OverflowTypography $fontSize={20} $fontWeight="medium" color="muted">
      Accounts
    </OverflowTypography>
    <SearchWrapper $borderGold={$borderGold}>
      <Input
        leftImage={<SearchIcon stroke={$borderGold ? undefined : 'white'} />}
        placeholder="Search"
        type="text"
        name="search"
        $customImageSpacing
        onChange={value => onSearch?.(value)}
        postfixIcon={$borderGold ? <CrossMark /> : undefined}
        onPostfixIconClick={onPostfixIconClick}
      />
    </SearchWrapper>
  </TableTitleSearch>
);

TableSearch.defaultProps = {
  onSearch: undefined,
  $borderGold: false,
  onPostfixIconClick: undefined,
};
