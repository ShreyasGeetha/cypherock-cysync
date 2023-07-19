// import {
//   Button,
//   Container,
//   DialogBox,
//   DialogBoxBody,
//   DialogBoxFooter,
//   DialogBoxHeader,
//   Image,
//   InputLabel,
//   LangDisplay,
//   LeanBox,
//   LeanBoxContainer,
//   Typography,
//   arrowGoldenForward,
//   bitcoinIcon,
//   checkIcon,
//   confirmIcon,
//   disconnectedIcon,
//   informationIcon,
//   informationWhiteIcon,
//   verifyCoinIcon,
// } from '@cypherock/cysync-ui';
// import SnackBar from '@cypherock/cysync-ui/src/components/molecules/SnackBar';
// import { theme } from '@cypherock/cysync-ui/src/themes/theme.styled';
import React, { useEffect } from 'react';
// import { openAddAccountGuideDialog, openReceiveGuideDialog } from '~/actions';
import { SelectCryptoDialog } from '~/dialogs/AddAccountGuide/Dialogs';
import { ReceiveAddressNotVerified } from '~/dialogs/Receive/Dialogs/Receive';
// import { useAppDispatch } from '~/store';
// import { openAddAccountGuideDialog, openReceiveGuideDialog } from '~/actions';
// import {
//   AddAccountSingleChainDialog,
//   InitialiseAccountDialog,
// } from '~/dialogs/AddAccountGuide/Dialogs';
// import { useAddAccountGuide } from '~/dialogs/AddAccountGuide/context';
// import { ReceiveDevice } from '~/dialogs/Receive/Dialogs';
// import { ReceiveDeviceConfirmCancelled, ReceiveDeviceConfirmForToken, ReceiveDeviceConfirmTroubleShoot, ReceiveDeviceConnection, ReceiveVerifyAddress } from '~/dialogs/Receive/Dialogs/Device';

// import { selectLanguage, useAppDispatch, useAppSelector } from '~/store';

export const SyncAccount: React.FC = () => {
  // const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(openAddAccountGuideDialog());
  }, []);

  // const lang = useAppSelector(selectLanguage);

  // const connect =
  //   lang.strings.receive.deviceConfirmForToken.info.dialogBox;
  // const { onNext, onPrevious } = useAddAccountGuide();

  return (
    <div>
      <SelectCryptoDialog />
      <ReceiveAddressNotVerified />
      {/* <ReceiveDeviceConfirmTroubleShoot /> */}
      {/* <ReceiveDeviceConfirmForToken /> */}
      {/* <ReceiveDeviceConnection /> */}
      {/* <ReceiveDeviceConfirmCancelled /> */}
      {/* <SnackBar text="Having trouble connecting the device?" imageAlt='informationIcon' imageSrc={informationWhiteIcon} buttonName="fix it"/> */}
      {/* <InitialiseAccountDialog /> */}
      {/* <DialogBox width={600}>
      <DialogBoxHeader height={56} width={600}>
        <Typography variant="fineprint" width="100%" color="muted">
          <LangDisplay text={connect.title} />
        </Typography>
      </DialogBoxHeader>
      <DialogBoxBody pt={4} pr={5} pb={4} pl={5}>
        <Image src={confirmIcon} alt="Verify Coin" />
        <Container display="flex" direction="column" width="full">
          <Typography variant="h5" $textAlign="center">
            <LangDisplay text={connect.header} />
          </Typography>
          <Typography variant="span" $textAlign="center" $fontSize={14} $fontWeight="normal" color="muted">
            <LangDisplay text={connect.subheader} />
          </Typography>
        </Container>
        <LeanBoxContainer>
          {dataArray.map(data => (
            <LeanBox
              key={data.id}
              leftImageSrc={data.leftImageSrc}
              rightImageSrc={data.rightImageSrc}
              text={data.text}
              id={data.id}
              animate={data.animate}
            />
          ))}
        </LeanBoxContainer>
      </DialogBoxBody>      
      </DialogBox> */}
    </div>
  );
};
