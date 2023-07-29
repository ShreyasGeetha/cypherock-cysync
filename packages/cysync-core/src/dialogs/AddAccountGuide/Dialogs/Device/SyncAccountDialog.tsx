import {
  loaderGrayIcon,
  DialogBox,
  DialogBoxBody,
  LeanBoxContainer,
  LeanBox,
  Typography,
  Image,
  InputLabel,
  DialogBoxFooter,
  Button,
  LangDisplay,
  etheriumBlueIcon,
  FlexGapContainer,
  Container,
} from '@cypherock/cysync-ui';
import React from 'react';

import { addKeyboardEvents } from '~/hooks';
import { selectLanguage, useAppSelector } from '~/store';

import { useAddAccountDialog } from '../../context';

const dataArray = [
  {
    id: '21',
    leftImageSrc: etheriumBlueIcon,
    rightText: '2.35 ETH',
    text: 'Ethereum 1',
  },
  {
    id: '22',
    leftImageSrc: etheriumBlueIcon,
    rightText: '0.77 ETH',
    text: 'Ethereum 2',
  },
  {
    id: '23',
    leftImageSrc: etheriumBlueIcon,
    rightText: '0.08 ETH',
    text: 'Ethereum 3',
  },
];

export const SyncAccountDialog: React.FC = () => {
  const lang = useAppSelector(selectLanguage);

  const sync = lang.strings.addAccount.addAccount.syncAccount.info.dialogBox;
  const { buttons } = lang.strings;
  const { goTo, onNext, onPrevious } = useAddAccountDialog();

  const keyboardActions = {
    ArrowRight: () => {
      goTo(1, 4);
    },
    ArrowLeft: () => {
      onPrevious();
    },
  };

  addKeyboardEvents(keyboardActions);

  const handleNextWithTimeout = () => {
    onNext();
  };

  return (
    <DialogBox width={500}>
      <FlexGapContainer pt={4} pr={5} pl={5}>
        <Image src={loaderGrayIcon} alt="Loader" animate="spin" />
        <Typography variant="h5" $textAlign="center">
          <LangDisplay text={sync.header} />
        </Typography>
      </FlexGapContainer>
      <DialogBoxBody pt={4} pr={5} pb={4} pl={5}>
        <Container display="flex" direction="column" gap={5} width="full">
          <InputLabel>
            {sync.subheader} ({dataArray.length})
          </InputLabel>
          <LeanBoxContainer>
            {dataArray.map(data => (
              <LeanBox
                key={data.id}
                leftImageSrc={data.leftImageSrc}
                rightText={data.rightText}
                text={data.text}
                color="heading"
                textVariant="fineprint"
                rightTextVariant="fineprint"
                rightTextColor="muted"
              />
            ))}
          </LeanBoxContainer>
        </Container>
      </DialogBoxBody>
      <DialogBoxFooter>
        <Button variant="secondary" onClick={handleNextWithTimeout}>
          <LangDisplay text={buttons.stop} />
        </Button>
      </DialogBoxFooter>
    </DialogBox>
  );
};
