import {
  LangDisplay,
  DialogBoxFooter,
  Button,
  DialogBoxBody,
  Typography,
  LeanBox,
  Container,
  Divider,
  MessageBox,
  ButtonAttributes,
  useTheme,
  RecipientAddress,
  EthereumIcon,
  GoldQuestionMark,
  InformationIcon,
  CustomDialogBox,
} from '@cypherock/cysync-ui';
import React, { useState } from 'react';

import { addKeyboardEvents, useRecipientAddress } from '~/hooks';
import { selectLanguage, useAppSelector } from '~/store';

import { useSendDialog } from '../../../context';
import { AmountToSend } from '../AmountToSend';
import { FeesDisplay } from '../FeesDisplay';
import { FeesSection } from '../FeesSection';
import { RecipientInput } from '../RecipientInput';

export const Buttons: ButtonAttributes[] = [
  { id: 1, label: 'Standard', type: 'slider' },
  { id: 2, label: 'Advanced', type: 'input' },
];

export const Captions = [
  { id: 1, name: 'Min' },
  { id: 2, name: 'Average' },
  { id: 3, name: 'Max' },
];

export const StandardEthereum: React.FC = () => {
  const [sliderValue, setSliderValue] = useState(20);
  const [type, setType] = useState<'slider' | 'input'>('slider');
  const [btnState, handleButtonState] = useState(false);

  const lang = useAppSelector(selectLanguage);
  const button = lang.strings.buttons;
  const eth = lang.strings.send.ethereum.info.dialogBox;
  const theme = useTheme();

  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');

  const handleRecipientAddressChange = (value: string) => {
    setRecipientAddress(value);
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
  };

  const handleButtonClick = (newType: 'slider' | 'input') => {
    setType(newType);
  };

  const handleSliderChange = (newValue: number) => {
    setSliderValue(newValue);
  };

  const { inputValue, isThrobberActive, handleInputValueChange } =
    useRecipientAddress(recipientAddress, handleRecipientAddressChange);

  const { onNext, onPrevious } = useSendDialog();

  const keyboardActions = {
    ArrowRight: () => {
      onNext();
    },
    ArrowLeft: () => {
      onPrevious();
    },
  };

  addKeyboardEvents(keyboardActions);

  return (
    <CustomDialogBox width={517}>
      <DialogBoxBody pt={4} pr={5} pb={4} pl={5}>
        <Container display="flex" direction="column" gap={16} width="full">
          <Container display="flex" direction="column" gap={4} width="full">
            <Typography variant="h5" $textAlign="center">
              <LangDisplay text={eth.text} />
            </Typography>
            <Typography variant="span" $textAlign="center" color="muted" mb={4}>
              <LangDisplay text={eth.subText} />
            </Typography>
          </Container>
          <LeanBox
            leftImage={
              <InformationIcon
                height={16}
                width={16}
                fill={theme.palette.background.muted}
              />
            }
            text={eth.InfoBox.text}
            altText={eth.InfoBox.altText}
            textVariant="span"
            fontSize={12}
            rightImage={<GoldQuestionMark height={14} width={14} />}
          />
          <Container display="flex" direction="column" gap={8} width="full">
            <RecipientAddress
              text={eth.recipient.text}
              placeholder={eth.recipient.placeholder}
              error={eth.recipient.error}
              value={inputValue}
              onChange={handleInputValueChange}
              isThrobberActive={isThrobberActive}
            />
            <AmountToSend
              text={eth.amount.text}
              coin={eth.amount.coin}
              toggle={eth.amount.toggle}
              dollar={eth.amount.dollar}
              error={eth.amount.error}
              isButtonEnabled={handleButtonState}
              placeholder={eth.amount.placeholder}
              value={amount}
              onChange={handleAmountChange}
            />
          </Container>
          <Divider variant="horizontal" />
          <FeesSection
            type={type}
            handleButtonClick={handleButtonClick}
            title={eth.fees.title}
            Buttons={Buttons}
          />
          <RecipientInput
            type={type}
            message={eth.message}
            inputValue={eth.fee}
            gasLimitValue={eth.gasLimit}
            inputPostfix={eth.inputPostfix}
            feesError={eth.fees.error}
            gas={eth.gas}
            limit={eth.limit}
            value={sliderValue}
            onChange={handleSliderChange}
            Captions={Captions}
            error={eth.fees.error}
            coin="ethereum"
          />

          <FeesDisplay
            fees={eth.fees}
            image={<EthereumIcon width={16} height={16} />}
          />
          <MessageBox type="warning" text={eth.warning} />
        </Container>
      </DialogBoxBody>
      <DialogBoxFooter height={101}>
        <Button variant="secondary">
          <LangDisplay text={button.back} />
        </Button>
        <Button variant="primary" disabled={!btnState}>
          <LangDisplay text={button.continue} />
        </Button>
      </DialogBoxFooter>
    </CustomDialogBox>
  );
};
