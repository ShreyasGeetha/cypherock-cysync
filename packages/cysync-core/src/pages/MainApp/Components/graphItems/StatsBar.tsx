
    import {
  LangDisplay,
  Typography,
  Flex,
  WalletGray,
  TriangleInverseIcon,
} from '@cypherock/cysync-ui';
import { goldenGradient } from '@cypherock/cysync-ui/src/components/utils';
import React from 'react'
import { styled } from 'styled-components';

import { Graphdata } from '../GraphData';

  export interface StatsBarProps {
    setTimeValueFn:   (time: keyof typeof Graphdata | undefined) => void;
  }

  const FilterDataContainer = styled.div`
  display: flex;
  padding: var(--32-px, 32px) 40px var(--16-px, 16px) 40px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;  
  border-bottom: 1px solid ${({theme}) => theme.palette.border.popup};
  `;

const ButtonContainer = styled.div<{ selected?: boolean }>`
  display: flex;
  width: auto;
  padding: 4px 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1.5px solid ${({theme}) => theme.palette.border.separator};
  cursor: pointer;
  position: relative;

  ${({ selected, theme }) => selected && `
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 4px;
      border: 1.5px solid transparent;
      background: ${theme.palette.golden} border-box;
      -webkit-mask: linear-gradient(#fff 0 0) padding-box,
        linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
    ${goldenGradient('color')}
  `}
`;

const GraphDropdown = styled.div`
  display: flex;
  width: 200px;
  height: 44px;
  padding: 12px 24px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${({theme}) => theme.palette.border.separator};
  background: ${({theme}) => theme.palette.background.separatorSecondary};
`;

const GraphControl = styled(Flex)`
  flex-direction: column;
  @media ${({theme}) => theme.screens.lg} {
    flex-direction: row;
  }
  @media ${({theme}) => theme.screens.md} {
    align-items: flex-end;
  }
`;

type ButtonName = '1D' | '1W' | '1M' | '1Y' | 'ALL';
const buttons: ButtonName[] = ['1D', '1W', '1M', '1Y', 'ALL'];

export const StatsBar:React.FC<StatsBarProps> = ({ setTimeValueFn  }) => {
  const [selectedButton, setSelectedButton] = React.useState<ButtonName | null>(null); // Add this line

  const handleSelector = (value: ButtonName) => {
    setSelectedButton(value);
    setTimeValueFn(value as keyof typeof Graphdata);
  }

  return (
    <FilterDataContainer>
      <Flex direction='column' gap={8}>
        <Typography $fontSize={32} $fontWeight='semibold'>
          <LangDisplay text="$12.74" />
        </Typography>
        <Typography $fontSize={16} $fontWeight='medium' color='muted' $letterSpacing={0.05}>
          <LangDisplay text="Total Balance" />
        </Typography>
      </Flex>

      <GraphControl gap={24} align='center'>
        <Flex gap={8} align='center'>
          {
            buttons.map((buttonName, index) => (
              <ButtonContainer 
                key={`button-${index+1}`} 
                onClick={()=>handleSelector(`${buttonName}`)}
                selected={buttonName === selectedButton} 
              >
                <Typography $fontSize={16} $fontWeight='medium'>
                  <LangDisplay text={buttonName} />
                </Typography>                
              </ButtonContainer>
            ))
          }
        </Flex>
        <GraphDropdown>
          <Flex gap={16} align='center'>
            <WalletGray />
            <Typography color='muted'>
              <LangDisplay text='All Wallets'/>
            </Typography>
          </Flex>
          <TriangleInverseIcon />
        </GraphDropdown>

      </GraphControl>
    </FilterDataContainer>
  )
}
