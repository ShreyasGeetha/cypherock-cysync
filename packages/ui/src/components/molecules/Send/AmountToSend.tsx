import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import SvgDoubleArrow from '../../../assets/icons/generated/DoubleArrow';
import {
  Flex,
  Input,
  LangDisplay,
  Throbber,
  Toggle,
  Typography,
} from '../../atoms';
import { useToggle } from '../../hooks';

interface AmountToSendProps {
  text?: string;
  error?: string;
  toggle?: string;
  coin?: React.ReactNode | string;
  dollar?: string;
  placeholder?: string;
  isButtonEnabled?: (shouldActivate: boolean) => void;
}

const AmountToSendContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 8px;
`;

export const AmountToSend: React.FC<AmountToSendProps> = ({
  text = '',
  toggle = '',
  coin = '',
  dollar = '',
  error = '',
  placeholder = '',
  isButtonEnabled,
}) => {
  const [coinState, setCoinState] = useState<React.ReactNode | string>(coin);
  const [textColor, setTextColor] = useState('muted');
  const throbber: JSX.Element = <Throbber size={15} strokeWidth={2} />;

  const { isChecked: isCheckedMax, handleToggleChange: handleToggleMax } =
    useToggle();

  const [isInputChanged, setIsInputChanged] = useState(false);

  const handleInputValueChange = (val: string) => {
    if (val.trim() !== '') {
      setIsInputChanged(true);
      setTextColor('white');
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isInputChanged) {
      setCoinState(throbber);
      timeoutId = setTimeout(() => {
        setCoinState(coin);
        if (isButtonEnabled) {
          isButtonEnabled(true);
        }
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isInputChanged]);

  return (
    <AmountToSendContainer>
      <Flex justify="space-between" width="full">
        <Typography variant="span" width="100%" color="muted" $fontSize={13}>
          <LangDisplay text={text} />
        </Typography>
        <Flex align="center" direction="row" gap={8}>
          <Typography variant="span" width="100%" color="muted" $fontSize={13}>
            <LangDisplay text={toggle} />
          </Typography>
          <Toggle checked={isCheckedMax} onToggle={handleToggleMax} />
        </Flex>
      </Flex>
      <Flex justify="space-between" gap={8} align="center" width="full">
        <Input
          type="text"
          name="address"
          postfixIcon={typeof coinState === 'string' ? undefined : coinState}
          postfixText={typeof coinState === 'string' ? coinState : undefined}
          $textColor={textColor}
          placeholder={placeholder}
          onChange={handleInputValueChange}
        />
        <SvgDoubleArrow height={22} width={22} />
        <Input
          type="text"
          name="address"
          postfixText={dollar}
          $textColor={textColor}
          placeholder={placeholder}
        />
      </Flex>
      {!error && (
        <Typography
          variant="span"
          width="100%"
          color="error"
          $alignSelf="start"
          $fontSize={12}
        >
          <LangDisplay text={error} />
        </Typography>
      )}
    </AmountToSendContainer>
  );
};

AmountToSend.defaultProps = {
  text: '',
  error: '',
  toggle: '',
  coin: 'BTC',
  dollar: '$',
  isButtonEnabled: undefined,
  placeholder: '',
};
