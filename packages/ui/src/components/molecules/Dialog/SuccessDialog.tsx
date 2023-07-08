import React from 'react';

import {
  DialogBox,
  DialogBoxBody,
  DialogBoxFooter,
  DialogBoxHeader,
} from './DialogBox';

import { successIcon } from '../../../assets/images';
import { Typography, LangDisplay, Image, Container, Button } from '../../atoms';
import { AlertBox } from '../AlertBox';

export interface SuccessDialogProps {
  headerText?: string;
  title: string;
  subtext?: string;
  buttonText?: string;
  secButtonText?: string;
  alertText?: string;
  handleClick?: () => void;
  handleSecClick?: () => void;
}

export const SuccessDialog: React.FC<SuccessDialogProps> = ({
  headerText,
  title,
  subtext,
  buttonText,
  secButtonText,
  alertText,
  handleClick,
  handleSecClick,
}) => (
  <DialogBox width={500}>
    {headerText && (
      <DialogBoxHeader>
        <Typography variant="h6" $textAlign="center" color="muted">
          <LangDisplay text={headerText} />
        </Typography>
      </DialogBoxHeader>
    )}

    <DialogBoxBody>
      <Image src={successIcon} alt="Success Icon" />
      <Container display="flex" direction="column" gap={4}>
        <Typography variant="h4" $textAlign="center">
          <LangDisplay text={title} />
        </Typography>
        {subtext && (
          <Typography variant="h6" $textAlign="center" color="muted">
            <LangDisplay text={subtext} />
          </Typography>
        )}
        {alertText && <AlertBox mt="48" alert={alertText} variant="info" />}
      </Container>
    </DialogBoxBody>
    {buttonText && handleClick && (
      <DialogBoxFooter height={101}>
        {secButtonText && handleSecClick && (
          <Button variant="secondary" onClick={handleSecClick}>
            <LangDisplay text={secButtonText} />
          </Button>
        )}

        <Button onClick={handleClick} variant="primary">
          <LangDisplay text={buttonText} />
        </Button>
      </DialogBoxFooter>
    )}
  </DialogBox>
);

SuccessDialog.defaultProps = {
  subtext: undefined,
  buttonText: undefined,
  handleClick: undefined,
  alertText: undefined,
};
