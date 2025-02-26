/* eslint-disable no-template-curly-in-string */
import {
  DeviceAppErrorType,
  DeviceBootloaderErrorType,
  DeviceCommunicationErrorType,
  DeviceCompatibilityErrorType,
  DeviceConnectionErrorType,
  CardAppErrorType,
} from '@cypherock/sdk-interfaces';

import { ServerErrorType } from '~/errors';
import { DeviceErrorCodes, IErrorMsg } from '~/types/deviceError';

const deviceErrors: Record<DeviceErrorCodes, IErrorMsg> = {
  // Connection Errors
  [DeviceConnectionErrorType.NOT_CONNECTED]: {
    heading: 'Connect the X1 Vault to your PC to proceed',
  },
  [DeviceConnectionErrorType.CONNECTION_CLOSED]: {
    heading: 'Connect the X1 Vault to your PC to proceed',
  },
  [DeviceConnectionErrorType.FAILED_TO_CONNECT]: {
    heading: 'Your X1 Vault is unable to connect',
    subtext: 'Try reconnecting the device',
  },

  // Communication Errors
  [DeviceCommunicationErrorType.IN_BOOTLOADER]: {
    heading: 'Your X1 Vault is misconfigured',
    subtext: 'Update your device to proceed',
  },
  [DeviceCommunicationErrorType.WRITE_REJECTED]: {
    heading: 'Your X1 Vault is facing some communication issues',
    subtext: 'Reconnect the device and try again',
  },
  [DeviceCommunicationErrorType.WRITE_ERROR]: {
    heading: 'Your X1 Vault is facing some communication issues',
    subtext: 'Reconnect the device and try again',
  },
  [DeviceCommunicationErrorType.WRITE_TIMEOUT]: {
    heading: 'Your X1 Vault is facing some communication issues',
    subtext: 'Reconnect the device and try again',
  },
  [DeviceCommunicationErrorType.READ_TIMEOUT]: {
    heading: 'Your X1 Vault is facing some communication issues',
    subtext: 'Reconnect the device and try again',
  },
  [DeviceCommunicationErrorType.UNKNOWN_COMMUNICATION_ERROR]: {
    heading: 'Your X1 Vault is facing some communication issues',
    subtext: 'Reconnect the device and try again',
  },

  // Compatibility Errors
  [DeviceCompatibilityErrorType.INVALID_SDK_OPERATION]: {
    heading: 'Your X1 Vault does not support this operation',
    subtext: 'Update the cySync app and the device to the latest version',
  },
  [DeviceCompatibilityErrorType.DEVICE_NOT_SUPPORTED]: {
    heading: 'Your X1 Vault is not compatible with the cySync app',
    subtext: 'Update the app and the device to the latest version',
  },

  // Bootloader Errors
  [DeviceBootloaderErrorType.NOT_IN_BOOTLOADER]: {
    heading: 'Operation failed on the X1 Vault',
    subtext: 'Reconnect the device and try again',
  },
  [DeviceBootloaderErrorType.FIRMWARE_SIZE_LIMIT_EXCEEDED]: {
    heading: 'Your X1 Vault does not support this firmware',
    subtext: 'Contact Cypherock support for assistance',
  },
  [DeviceBootloaderErrorType.WRONG_HARDWARE_VERSION]: {
    heading: 'Your X1 Vault does not support this firmware',
    subtext: 'Contact Cypherock support for assistance',
  },
  [DeviceBootloaderErrorType.WRONG_MAGIC_NUMBER]: {
    heading: 'Your X1 Vault does not support this firmware',
    subtext: 'Contact Cypherock support for assistance',
  },
  [DeviceBootloaderErrorType.SIGNATURE_NOT_VERIFIED]: {
    heading: "Your X1 Vault's firmware is not authentic",
    subtext:
      'It usually happens when you are trying to install a firmware not developed by Cypherock',
  },
  [DeviceBootloaderErrorType.LOWER_FIRMWARE_VERSION]: {
    heading: 'Your X1 Vault failed to update to a lower firmware version',
    subtext:
      'The device only supports updating the firmware to a higher version',
  },
  [DeviceBootloaderErrorType.FLASH_WRITE_ERROR]: {
    heading: 'X1 Vault update failed',
    subtext: 'Retry or click Help to find a solution',
  },
  [DeviceBootloaderErrorType.FLASH_CRC_MISMATCH]: {
    heading: 'Your X1 Vault does not support this firmware',
    subtext: 'Contact Cypherock support for assistance',
  },
  [DeviceBootloaderErrorType.FLASH_TIMEOUT_ERROR]: {
    heading: 'Your X1 Vault is facing some communication issues',
    subtext: 'Reconnect the device and try again',
  },
  [DeviceBootloaderErrorType.FLASH_NACK]: {
    heading: 'Something went wrong',
    subtext: 'Reconnect the device and try again',
  },
  [DeviceBootloaderErrorType.NOT_IN_RECEIVING_MODE]: {
    heading: 'Your X1 Vault is facing some communication issues',
    subtext: 'Reconnect the device and try again',
  },

  // App Errors
  [DeviceAppErrorType.UNKNOWN_ERROR]: {
    heading: 'Something went wrong',
    subtext: 'Reconnect the device and try again',
  },
  [DeviceAppErrorType.EXECUTING_OTHER_COMMAND]: {
    heading: 'Your X1 Vault is currently busy',
    subtext: 'Try again after sometime',
  },
  [DeviceAppErrorType.PROCESS_ABORTED]: {
    heading: 'Your X1 Vault aborted this operation',
    subtext: 'You can resume it from where you last left',
  },
  [DeviceAppErrorType.DEVICE_ABORT]: {
    heading: 'Your X1 Vault aborted this operation',
    subtext:
      'Reconnect the device try again and if the problem persists, contact Cypherock support for assistance',
  },
  [DeviceAppErrorType.INVALID_MSG_FROM_DEVICE]: {
    heading: 'our X1 Vault is facing some communication issues',
    subtext: 'Retry or click Help to find a solution',
  },
  [DeviceAppErrorType.INVALID_APP_ID_FROM_DEVICE]: {
    heading: 'Your X1 Vault is facing some communication issues',
    subtext: 'Retry or click Help to find a solution',
  },
  [DeviceAppErrorType.INVALID_MSG]: {
    heading: 'Your X1 Vault is facing some communication issues',
    subtext: 'Reconnect the device try again or click Help to find a solution',
  },
  [DeviceAppErrorType.UNKNOWN_APP]: {
    heading: 'The app does not exist on device',
  },
  [DeviceAppErrorType.APP_NOT_ACTIVE]: {
    heading: 'Your X1 Vault is currently busy',
    subtext: 'Try again after sometime',
  },
  [DeviceAppErrorType.DEVICE_SETUP_REQUIRED]: {
    heading: 'Your X1 Vault is currently not setup properly',
    subtext: 'Press continue to start the setup',
  },
  [DeviceAppErrorType.WALLET_NOT_FOUND]: {
    heading:
      'You have deleted the wallet ${walletName} from the X1 Vault. Do you want to delete it from the cySync app as well?',
  },
  [DeviceAppErrorType.WALLET_PARTIAL_STATE]: {
    heading:
      'Your wallet ${walletName} is currently misconfigured on your X1 Vault',
    subtext:
      'Go to wallet ${walletName} from the main menu on your device to resolve the issue',
  },
  [DeviceAppErrorType.NO_WALLET_EXISTS]: {
    heading: 'Your X1 Vault currently does not have any wallets',
    subtext:
      'If you have already created a wallet, retry after selecting it on the device',
  },
  [DeviceAppErrorType.CARD_OPERATION_FAILED]: {
    heading: 'Unknown X1 Card error',
    subtext: 'Retry or click Help to find a solution',
  },
  [DeviceAppErrorType.USER_REJECTION]: {
    heading: 'You canceled the operation on your X1 Vault',
    subtext:
      'Please make sure to authorize the operation on your device before attempting it again',
  },
  [DeviceAppErrorType.CORRUPT_DATA]: {
    heading: 'Your X1 Vault is facing some communication issues',
    subtext: 'Reconnect the device try again or click Help to find a solution',
  },
  [DeviceAppErrorType.DEVICE_AUTH_FAILED]: {
    heading:
      'Device seems to be Compromised. Contact Cypherock support immediately',
  },
  [DeviceAppErrorType.CARD_AUTH_FAILED]: {
    heading:
      'Card seems to be Compromised. Contact Cypherock support immediately',
  },

  // Card Errors
  [CardAppErrorType.UNKNOWN]: {
    heading: 'Unknown X1 Card error',
    subtext: 'Retry or click Help to find a solution',
  },
  [CardAppErrorType.NOT_PAIRED]: {
    heading: 'Your X1 Card is currently not paired with your X1 Vault',
    subtext:
      'Pair your card by going to settings from the main menu on your device before performing an operation',
  },
  [CardAppErrorType.SW_INCOMPATIBLE_APPLET]: {
    heading: 'Your X1 Card authentication failed',
    subtext:
      'Try a different card and if the problem persists, contact Cypherock support for assistance',
  },
  [CardAppErrorType.SW_NULL_POINTER_EXCEPTION]: {
    heading: 'Your X1 Card has malfunctioned',
    subtext: 'Retry or click Help to find a solution',
  },
  [CardAppErrorType.SW_TRANSACTION_EXCEPTION]: {
    heading: 'Your X1 Card is facing some communication issues',
    subtext: 'Retry or click Help to find a solution',
  },
  [CardAppErrorType.SW_FILE_INVALID]: {
    heading: 'You tapped an incorrect X1 Card',
    subtext: 'Make sure your card belongs to the same family',
  },
  [CardAppErrorType.SW_SECURITY_CONDITIONS_NOT_SATISFIED]: {
    heading: 'Your X1 Card is facing some communication issues',
    subtext: 'Retry or click Help to find a solution',
  },
  [CardAppErrorType.SW_CONDITIONS_NOT_SATISFIED]: {
    heading: 'You tapped an incorrect X1 Card',
    subtext: 'Please tap the cards in the correct sequence',
  },
  [CardAppErrorType.SW_WRONG_DATA]: {
    heading: 'Your X1 Card is facing some communication issues',
    subtext: 'Retry or click Help to find a solution',
  },
  [CardAppErrorType.SW_FILE_NOT_FOUND]: {
    heading: 'Your X1 Card is facing some communication issues',
    subtext: 'Retry or click Help to find a solution',
  },
  [CardAppErrorType.SW_RECORD_NOT_FOUND]: {
    heading: 'Your X1 Card is out of sync with your X1 Vault',
    subtext:
      'Resync your card by going to wallet ${walletName} from the main menu on your device before performing an operation',
  },
  [CardAppErrorType.SW_FILE_FULL]: {
    heading: "Your X1 Card's memory is full",
    subtext:
      'You can delete a wallet to add a new one or buy another Cypherock X1',
  },
  [CardAppErrorType.SW_CORRECT_LENGTH_00]: {
    heading: 'You entered an incorrect PIN',
    subtext: 'Enter the correct PIN before the card gets locked',
  },
  [CardAppErrorType.SW_INVALID_INS]: {
    heading: 'Your X1 Card is facing some communication issues',
    subtext: 'Retry or click Help to find a solution',
  },
  [CardAppErrorType.SW_NOT_PAIRED]: {
    heading: 'Your X1 Card needs to be paired with your X1 Vault',
    subtext:
      'You can start card pairing from settings in the device or you can use a different set of cards',
  },
  [CardAppErrorType.SW_CRYPTO_EXCEPTION]: {
    heading: 'Your X1 Card is facing some communication issues',
    subtext: 'Retry or click Help to find a solution',
  },
  [CardAppErrorType.POW_SW_WALLET_LOCKED]: {
    heading: 'The wallet ${walletName} is currently locked on your X1 Vault',
    subtext: 'Unlock the wallet first before trying again',
  },
  [CardAppErrorType.SW_INS_BLOCKED]: {
    heading: 'Your X1 Card has malfunctioned',
    subtext: 'Click Help to find a solution',
  },
  [CardAppErrorType.SW_OUT_OF_BOUNDARY]: {
    heading: 'Your X1 Card has malfunctioned',
    subtext: 'Retry or click Help to find a solution',
  },
  [CardAppErrorType.UNRECOGNIZED]: {
    heading: 'Unknown X1 Card error',
    subtext: 'Retry or click Help to find a solution',
  },
};

const databaseError = {
  heading: 'Your cySync app is facing some internal issue',
  subtext:
    'Try again and if the problem persists, contact Cypherock support for assistance',
};

const serverErrors: Record<ServerErrorType, IErrorMsg> = {
  [ServerErrorType.UNKNOWN_ERROR]: {
    heading: 'Your cySync app is facing some connectivity issue',
    subtext:
      'Reconnect the device and try again and if the problem persists, contact Cypherock support for assistance',
  },
  [ServerErrorType.CONNOT_CONNECT]: {
    heading: 'Please connect to the internet to continue',
  },
};

const en = {
  x1Card: 'X1 Card',
  help: 'Help',
  back: 'Back',
  buttons: {
    reverify: 'Reverify',
    continue: 'Continue',
    confirm: 'Confirm',
    skip: 'Skip',
    back: 'Back',
    retry: 'Retry',
    update: 'Update',
    cancel: 'Cancel',
    reset: 'Reset',
    done: 'Done',
    close: 'Close',
    report: 'Report',
    help: 'Help',
    stop: 'Stop',
    exit: 'Exit',
    resync: 'Resync',
  },
  lockscreen: {
    title: 'Your Gateway to Self-Sovereignty',
    passwordLabel: 'Enter Password to unlock cySync',
    forgotPassword: 'Forgot password?',
    incorrectPassword: 'Incorrect password',
    button: 'Unlock',
    forgotPasswordDialog: {
      title:
        'Resetting password will reset your cySync app do you want to proceed?',
      subtext:
        'This will erase all your data on your cySync app. Note this will not result in loss of assets',
    },
  },
  permissionSetup: {
    title:
      'Press run the following command on your terminal to allow the application to access usb port',
    subtext: 'Restart the application after running the script',
    checkbox: 'I have already run the command',
  },
  addAccount: {
    header: 'Add Coin/Account',
    select: {
      header: 'Select the Wallet & Coins you want to add',
      searchText: 'Search',
      walletPlaceholder: 'Choose a wallet',
      coinPlaceholder: 'Choose a coin',
    },
    deviceActions: {
      header: 'Follow instructions on the X1 Vault',
      subtext: 'Add a coin/account to wallet',
      walletName: '${walletName}',
      actions: {
        verifyCoin: 'Verify the coins on the device',
        enterPassphrase: 'Enter passphrase',
        enterPin: 'Enter the PIN and tap any card',
        tapCard: 'Tap any card',
        processing: 'Getting keys from device',
      },
    },
    sync: {
      syncingHeader: 'Syncing the account',
      header: 'Add new accounts',
      newAccount: 'New Accounts',
      advancedButton: 'Show all address types',
      accountsNotSynced: 'Account not yet synced (${count})',
      deselectAllButton: 'Deselect all',
      selectAllButton: 'Select all',
      accountsInPortfolio: 'Accounts already in portfolio (${count})',
      addAccountButton: 'Add Accounts',
      resyncButton: 'Resync',
    },
    congrats: {
      header: 'Add Coin/Account',
      subtext: 'Add other accounts or return to portfolio',
      title: 'Accounts added successfully',
      buttonAddMore: 'Add more',
    },
    aside: {
      tabs: {
        asset: 'Asset',
        device: 'X1 Vault',
        confirmation: 'Confirmation',
      },
    },
  },
  receive: {
    title: 'Receive',
    showAnywayButton: "Don't have your device?",
    source: {
      title: 'Receive',
      subtitle: 'Choose a wallet and account to credit',
      searchText: 'Search',
      walletPlaceholder: 'Choose a wallet',
      accountPlaceholder: 'Account to credit',
    },
    x1Vault: {
      title: 'Follow instructions on the X1 Vault',
      subtitle: 'Confirm the operation on your device to finalize',
      actions: {
        verifyCoin: 'Verify the asset and wallet name on the device',
        enterPassphrase: 'Enter passphrase',
        enterPin: 'Enter the PIN and tap any card',
        tapCard: 'Tap any card',
      },
    },
    receive: {
      title: {
        prefix: 'Address for ',
        suffix: 'in ${walletName}',
      },
      addressLabel: 'Address',
      actions: {
        verify:
          'Verify the address on X1 Vault exactly matches the address displayed above',
      },
      messageBox: {
        warning:
          'This Receive Address was NOT VERIFIED by the device. Use it at your own risk',
      },
    },
    congrats: {
      title: 'Address verified successfully',
    },
    finalButtons: {
      secondary: 'Verify Again',
      secondaryUnverified: 'Verify Address',
      primary: 'Done',
    },
    aside: {
      tabs: {
        source: 'Source',
        device: 'X1 Vault',
        receive: 'Receive',
      },
    },
  },
  send: {
    selectSend: {
      info: {
        dialogBox: {
          title: 'Source',
          subTitle: 'Choose a wallet and an account',
          constant: 'Cypherock Red',
          searchText: 'Search',
          placeholderText: 'Account to Debit',
          placeholderWalletText: 'Choose a wallet',
        },
      },
    },
    deviceConnection: {
      info: {
        dialogBox: {
          title: 'Send Crypto',
          header: 'Connect your X1 Vault to your PC to proceed',
        },
      },
    },
    deviceConfirmCancelled: {
      info: {
        dialogBox: {
          title: 'Receive Crypto',
          header: 'Request was cancelled from the X1 Vault',
          subheader: 'This is dialogue text or sub heading',
          buttonRetry: 'Retry',
          buttonReport: 'Report',
        },
      },
    },
    loading: {
      info: {
        dialogBox: {
          header: 'Send crypto',
          text: 'Broadcasting the transaction',
        },
      },
    },
    confirmToken: {
      info: {
        dialogBox: {
          header: 'Follow instructions on the X1 Vault',
          infoBox: {
            info: {
              send: 'Remember Tether is an Ethereum token therefore fee will be calculated in ETH ',
              optimism: {
                text: 'L1 Fee: 0.001 ETH',
                altText: 'L1 fee wont be verified from the device',
              },
            },
            warning:
              'Always verify the address displayed on your device exactly matches the address given by the recipient',
          },
        },
      },
    },
    confirmDevice: {
      info: {
        dialogBox: {
          header: 'Follow instructions on the X1 Vault',
          infoBox: {
            warning:
              'Always verify the address displayed on your device exactly matches the address given by the recipient',
          },
        },
      },
    },
    bitcoin: {
      info: {
        dialogBox: {
          transaction: {
            tabs: {
              tab1: 'Single Transaction',
              tab2: 'Batch Transaction',
            },
            dialogBox: {
              title: 'Recipient',
              text: 'Enter the amount and the address of the recipient to whom you want to send the funds',
            },
          },
          single: {
            title: 'Send Crypto',
            recipient: {
              text: 'Recipient Address',
              error: 'Error message for recipient address',
              placeholder: 'Enter Bitcoin address',
            },
            amount: {
              text: 'Amount to send',
              placeholder: '0',
              toggle: 'Send Max',
              coin: 'BTC',
              dollar: '$',
              error: 'Error message for amount',
            },

            fees: {
              title: 'Fees',
              error: 'Error message for fee',
              fee: '0.0002 BTC',
              usd: '$5.51',
              network: 'Network Fees',
            },
            message: ' sat per byte',
            fee: '9',
            inputPostfix: 'Sat per byte',
            warning: 'Transaction might cancel if fees is very low',
            toggleText: {
              replace: 'Allow the transaction to be replaced (Replace by fees)',
              unconfirmed:
                'Include coins from unconfirmed, replaceable transactions',
            },
            InfoBox: {
              text: 'Maximum spendable amount is',
              altText: '~0.8436 BTC',
            },
          },
          batch: {
            title: 'Send Crypto',
            button: 'Add another recipient',
            fees: {
              title: 'Fees',
              error: 'Error message for fee',
              btc: '0.0002 BTC',
              usd: '$5.51',
              network: 'Network Fees',
            },
            message: ' sat per byte',
            inputPostfix: 'Sat per byte',
            warning: 'Transaction might cancel if fees is very low',
            toggleText: {
              replace: 'Allow the transaction to be replaced (Replace by fees)',
              unconfirmed:
                'Include coins from unconfirmed, replaceable transactions',
            },
            InfoBox: {
              text: 'Maximum spendable amount is',
              altText: '~0.8436 BTC',
            },
          },
        },
      },
    },
    ethereum: {
      info: {
        dialogBox: {
          title: 'Send Crypto',
          text: 'Recipient',
          subText:
            'Enter the amount and the address of the recipient to whom you want to send the funds',
          recipient: {
            text: 'Recipient Address',
            error: 'Error message for recipient address',
            placeholder: 'Enter Ethereum address',
          },
          amount: {
            text: 'Amount to send',
            placeholder: '0',
            toggle: 'Send Max',
            coin: 'ETH',
            dollar: '$',
            error: 'Error message for amount',
          },
          fees: {
            title: 'Fees',
            error: 'Error message for fee',
            fee: '0.0002 ETH',
            usd: '$5.51',
            network: 'Network Fees',
          },
          gas: 'Gas Price',
          message: '53.2 GWEI',
          fee: '53.2',
          gasLimit: '',
          inputPostfix: 'GWEI',
          limit: 'Gas limit',
          warning: 'Transaction might cancel if fees is very low',
          InfoBox: {
            text: 'Maximum spendable amount is',
            altText: '~0.8436 BTC',
          },
        },
      },
    },
    optimism: {
      info: {
        dialogBox: {
          title: 'Send Crypto',
          text: 'Recipient',
          subText:
            'Enter the amount and the address of the recipient to whom you want to send the funds',
          recipient: {
            text: 'Recipient Address',
            error: 'Error message for recipient address',
            placeholder: 'Enter Optimism Ethereum address',
          },
          amount: {
            text: 'Amount to send',
            placeholder: '0',
            toggle: 'Send Max',
            coin: 'ETH',
            dollar: '$',
            error: 'Error message for amount',
          },
          fees: {
            l1: {
              text: 'Fees (L1)',
              fee: '32.1 GWEI',
              error: 'Error message for L1 fee',
            },
            l2: {
              text: 'Fees (L2)',
              error: 'Error message for L2 fee',
            },
            network: 'Network Fees (L1 + L2)',
            fee: '0.0002 ETH',
            usd: '$5.51',
          },
          gas: 'Gas Price',
          fee: '0.45',
          message: '53.2 GWEI',
          inputPostfix: 'GWEI',
          limit: 'Gas limit',

          warning: 'Transaction might cancel if fees is very low',
          InfoBox: {
            text: 'Maximum spendable amount is',
            altText: '~0.8436 BTC',
          },
        },
      },
    },

    transactionProblem: {
      info: {
        dialogBox: {
          title: 'There was some problem broadcasting the transaction',
        },
      },
    },
    summary: {
      info: {
        dialogBox: {
          title: 'Summary',
          from: 'From',
          fromDetails: [
            {
              id: 1,
              name: 'Cypherock Red',
              muted: true,
            },
            {
              id: 2,
              name: 'Ethereum 1',
              muted: false,
            },
          ],
          to: 'To',
          amount: 'Amount',
          toAddress: '0xA4028f8dC64D18F0a66668d97473C47444A561Ea',
          amountEth: '0.016686419917276198',
          amountUsd: '19.89',
          toDetails: [
            {
              id: 1,
              address: '0xA4028f8dC64D18F0a66668d97473C47444A561Ea',
              amountEth: '0.016686419917276198 ETH',
              amountUsd: '$19.89',
            },
          ],
          network: {
            text: 'Network Fee',
            eth: '0.00035448 ETH',
            usd: '$0.42',
          },
          debit: {
            text: 'Total to debit',
            eth: '0.017040899917276198 ETH',
            usd: '$20.31',
          },
        },
      },
      scroll: {
        dialogBox: {
          title: 'Summary',
          from: 'From',
          fromDetails: [
            {
              id: 1,
              name: 'Cypherock Red',
              muted: true,
            },
            {
              id: 2,
              name: 'Ethereum 1',
              muted: false,
            },
          ],
          to: 'To',
          amount: 'Amount',
          toDetails: [
            {
              id: 1,
              address: '0xA4028f8dC64D18F0a66668d97473C47564A561Ea',
              amountEth: '0.016686419917276198 ETH',
              amountUsd: '$19.89',
            },
            {
              id: 2,
              address: '0yA4025f8dC64D28F0a65668d92473D47444A561Ea',
              amountEth: '0.016686419917276198 ETH',
              amountUsd: '$22.89',
            },
          ],
          network: {
            text: 'Network Fee',
            eth: '0.00035448 ETH',
            usd: '$0.42',
          },
          debit: {
            text: 'Total to debit',
            eth: '0.017040899917276198 ETH',
            usd: '$20.31',
          },
        },
      },
      optimism: {
        dialogBox: {
          title: 'Summary',
          from: 'From',
          fromDetails: [
            {
              id: 1,
              name: 'Cypherock Red',
              muted: true,
            },
            {
              id: 2,
              name: 'Ethereum 1',
              muted: false,
            },
            {
              id: 3,
              name: 'Optimism',
              muted: false,
            },
          ],
          to: 'To',
          amount: 'Amount',
          toDetails: [
            {
              id: 1,
              address: '0xA4028f8dC64D18F0a66668d97473C47564A561Ea',
              amountEth: '0.016686419917276198 ETH',
              amountUsd: '$19.89',
            },
          ],
          network: {
            text: 'Network Fee (L1 + L2)',
            eth: '0.00035448 ETH',
            usd: '$0.42',
          },
          debit: {
            text: 'Total to debit',
            eth: '0.017040899917276198 ETH',
            usd: '$20.31',
          },
        },
      },
    },
    sendConfirm: {
      info: {
        dialogBox: {
          title: 'Send Crypto',
          copy: 'Copy',
          clipboard: '#2c70b9a11fcd.........6c31acda28',
          buttonCheck: 'Check transactions',
          text: 'Transaction Sent',
          leftText: 'Transaction Hash',
          InfoBox: {
            text: 'Your account balance will be updated when the blockchain confirms the transaction',
          },
        },
      },
    },
    aside: {
      tabs: {
        heading: 'Send',
        source: 'Source',
        recipient: 'Recipient',
        summary: 'Summary',
        x1vault: 'X1 Vault',
        confirm: 'Confirmation',
      },
    },
    closeDialog: {
      title: 'Are you sure you want to exit?',
      subtitle: 'You can always start this guide by clicking "Send Crypto" tab',
      buttons: {
        secondary: 'Cancel',
        primary: 'Exit',
      },
    },
  },

  onboarding: {
    info: {
      aside: {
        title: 'Welcome to cySync app',
        subTitle: 'Your Gateway to Self-Sovereignty',
      },
      dialogBox: {
        title: 'Ensure the following before you continue',
        listItems: [
          'You are present in a safe and secure environment',
          'You have atleast 10-15 minutes to setup your wallet',
          'You have an active internet connection',
          'The tamper-proof seal of the package is intact',
          'Cypherock will never ask you for your seed phrase nor will it ever ask you to sign a transaction',
          'Cypherock will only email you from cypherock.com. Do not trust any email from any other website domain',
        ],
      },
    },
    usage: {
      titleFirst: 'I am using Cypherock X1 for the first time',
      titleSecond: 'I have already used a Cypherock X1',
      subTitleFirst: 'Choose this if you have never used Cypherock X1 before',
      subTitleSecond:
        'Choose this if you want to migrate your wallets to a new Cypherock X1. This might be required in case you lost your X1 Vault and one or more of the X1 Cards',
    },
    terms: {
      title: 'Terms of Use',
      subtext:
        'Take some time to review our Terms of Service and Privacy Policy',
      bulletPoints: {
        terms: 'Terms of Service',
        privacyPolicy: 'Privacy Policy',
      },
      consent:
        ' I have read and agree with the Terms of Use and Privacy Policy',
    },
    setPassword: {
      heading: 'Set Password',
      title: 'Set your cySync password ',
      subtitle: 'We do not store your password on our servers',
      success: 'Your cySync password has been successfully set',
      newPasswordLabel: 'New Password',
      confirmPasswordLabel: 'Confirm Password',
      hint: 'Use 8 or more characters with a mix of letters, numbers & symbols',
    },
    emailAuth: {
      heading: 'Email Auth',
      title:
        'You are recommended to enter an email ID as a 2FA to get authenticity results ',
      subtitle: 'We do not store this email ID permanently on our servers ',
      success: 'Your cySync password has been successfully set',
      enterEmailLabel: 'Email',
      placeholder: 'Email',
    },
    deviceDetection: {
      heading: 'Device Connection',
      title: 'Connect your X1 Vault to your PC to proceed',
      subtext:
        'Use the USB cable provided in your product packaging to connect',
    },
    deviceAuth: {
      heading: 'Device Authentication',
      title:
        'Your X1 Vault will now be authenticated\nthrough Cypherock server to check its\nauthenticity ',
      subtext:
        'Do not disconnect your device while the operation is being done',
      success: {
        title: 'Your X1 Vault is successfully authenticated',
        subtext: 'Wait while we take you to the next screen',
      },
      error: 'X1 Vault authentication has failed',
    },
    joystickTraining: {
      heading: 'Joystick Instructions',
      subtext: 'X1 Vault provides 4 way joystick for screen navigation',
      upTitle: 'Toggle Up',
      rightTitle: 'Toggle Right',
      downTitle: 'Toggle Down',
      leftTitle: 'Toggle Left',
      centerTitle: 'Center click the joystick to proceed',
      centerSubtext: 'X1 Vault has a center button to perform click',
      footer: 'Follow the instructions on the device',
      success: 'Joystick instructions completed',
      error: 'Joystick instructions has failed',
    },
    cardTraining: {
      heading: 'Card Tapping Instructions',
      title: 'Tap any X1 Card below the X1 Vault to test card tapping',
      subtext:
        'Your cards communicate with the device through encrypted NFC. Make sure you keep it tapped until you hear a beep sound',
      error: 'Card Tapping has failed',
    },
    cardAuth: {
      heading: 'Card Authentication',
      title:
        'Tap X1 Cards one by one below the \nX1 Vault till you hear 3 beep sounds',
      subtext: 'Lift your card after 3 beep sounds',
    },
    walletActionsDialogBox: {
      title: `Let's add a wallet before we proceed. Make sure you have all the 4 X1 cards with you`,
      subTitle:
        'The following tutorials are just there to guide you on your X1 vault. You can create a wallet even without these tutorials independently on your Cypherock X1',
      createWallet: {
        title: 'Create a new wallet',
        list: [
          'If you have bought a brand new Cypherock X1 and want to setup a new wallet',
        ],
        button: 'Create',
      },
      importWallet: {
        title: 'Import your wallet from a seed phrase',
        list: [
          `You want to use Cypherock X1 as a backup of your other wallets `,
          `You want to transfer your assets from your other wallets into Cypherock X1 `,
          `You want to manage and track portfolio of your other wallets through Cypherock X1 `,
        ],
        button: 'Import',
      },
      transferWallet: {
        title: 'Transfer from old to new Cypherock X1',
        subTitle: `If you ever had a Cypherock X1 and want to migrate your wallets to a new Cypherock X1. This might be required in case your lost your X1 wallet and one or more of the X1 cards whatsoever, we don't judge`,
        button: 'Transfer',
      },
    },
    success: {
      title: 'Congratulations',
      subtext: 'Cypherock X1 is now ready to use',
    },
    appUpdate: {
      heading: 'App Update',
      dialogs: {
        checking: {
          heading: 'App Update',
          title: 'Please wait while we check for Cypherock CySync updates',
        },
        checkingFailed: {
          heading: 'App Update',
          title: 'An error occurred while checking for update',
          subtext:
            'Something went wrong, check your internet connection and try again',
        },
        confirmation: {
          heading: 'App Update',
          title:
            'A new update is available for your cySync app. Update the app to v${version} to continue',
          subtext:
            'Your X1 Vault seems to be incompatible with the current cySync app. Update your desktop app to v${version} to continue',
        },
        downloading: {
          heading: 'Updating...',
          subtext: 'Please wait while we update your cySync app',
          version: 'Version ${version}',
        },
        updateSuccessful: {
          heading: 'cySync app updated successfully',
          subtext:
            'Please wait while we restart the app to apply the latest update',
          bubbleText:
            'In case, the app does not restart itself, manually start it again',
        },
        updateFailed: {
          heading: 'cySync update to version ${version} failed',
          subtext:
            'Something went wrong, try updating again or contact support',
          buttons: {
            retry: 'Retry',
          },
        },
        updateFailedFallback: {
          heading: 'cySync app update to version ${version} failed',
          subtext: 'Download and reinstall the desktop app from the link below',
          alertText: 'Close this app before reinstalling the latest cySync app',
        },
      },
    },
    deviceUpdate: {
      heading: 'Device Update',
      dialogs: {
        checking: {
          title: 'Please wait while we check for X1 Vault updates',
        },
        confirmation: {
          heading: 'Device Update',
          title:
            'A new update is available for your X1 Vault. Update the device to v${version} to continue',
          subtext: 'Follow the instructions on the device',
        },
        loading: {
          text: 'Please wait while we check for X1 Vault updates',
        },
        updating: {
          heading: 'Updating...',
          subtext: 'Please wait while we update your X1 Vault',
        },
        updateSuccessful: {
          heading: 'X1 Vault updated successfully',
          subtext: 'Your device is now operating on the latest firmware',
        },
        updateFailed: {
          heading: 'Firmware update failed',
          subtext: 'Reconnect the device to proceed',
        },
      },
    },
  },
  appUpdateBar: {
    confirmation: 'Update to cySync version ${version} is available',
    downloading: 'Downloading cySync version ${version}',
    error: 'Error downloading cySync update',
    successful: 'cySync update version ${version} downloaded',
    buttons: {
      download: 'Download',
      tryAgain: 'Try Again',
      installUpdate: 'Install Update',
    },
  },
  topbar: {
    statusTexts: {
      connection: {
        connected: 'Connected',
        disconnected: 'Disconnected',
        error: 'Connection error!',
      },
      sync: {
        syncronized: 'Syncronized',
        syncronizing: 'Syncronizing...',
        error: 'Sync error!',
      },
    },
  },
  sidebar: {
    portfolio: 'Portfolio',
    wallets: 'Wallets',
    sendCrypto: 'Send Crypto',
    receiveCrypto: 'Receive Crypto',
    history: 'History',
    settings: 'Settings',
    help: 'Help',
  },
  walletSync: {
    deletedOne: {
      title:
        'Seems like you have deleted the wallet ${walletName} from the X1 Vault. Do you want to delete it on cySync as well?',
    },
    deletedMany: {
      title:
        'Seems like you have deleted wallets from the X1 Vault. Do you want to delete them from cySync as well?',
      subTitle: 'You can chose which ones to keep and which ones to delete',
    },
    freshOneCreated: {
      title:
        'Seems like you have deleted wallets from the X1 Vault while creating new ones by the same name. Do you want to delete the old wallets on cySync?',
      subTitle: 'You can chose which one to keep and which one to delete',
      checkboxText: "Don't show this again",
    },
    buttons: {
      keepIt: 'Keep it',
      keepAll: 'Keep All',
      delete: 'Delete',
    },
  },
  portfolio: {
    title: 'Portfolio',
  },
  wallet: {
    title: 'Wallet',
  },
  errors: {
    deviceErrors,
    databaseError,
    serverErrors,
    default: 'Some internal error occurred',
  },
  validation: {
    generic: {
      required: 'This field is required',
    },
    email: {
      invalid: 'This is not a valid email',
    },
    password: {
      mismatch: 'Passwords do not match',
      passwordFieldPrefix: 'Password ',
      confirmPasswordFieldPrefix: 'Confirm Password ',
      minLength: 'must be at least 8 characters',
      containNumber: 'must contain at least 1 number',
      containSymbol: 'must contain at least 1 symbol',
      required: 'is required',
      containUppercase: 'must contain at least 1 uppercase letter',
      containLowercase: 'must contain at least 1 lowercase letter',
    },
  },
  guidedFlows: {
    createWallet: {
      title: 'Create New Wallet',
      tabs: [
        {
          asideTitle: 'X1 Vault',
          pages: [
            {
              title:
                'From the Main Menu of your X1 Vault, click on "Create Wallet"',
            },
            {
              title: 'Click "Generate New Wallet" on your X1 Vault',
            },
            {
              title: 'Enter a wallet name on your X1 Vault',
              bulletList: [
                'Upto 15 characters allowed',
                'It can be alphanumeric',
              ],
              messageBoxList: [
                {
                  info: 'Make sure that the wallet name is unique to other wallet names on the device',
                },
                {
                  warning:
                    'Wallet name once set cannot be modified. Please set the name accordingly',
                },
              ],
            },
            {
              title: 'Confirm the wallet name on the X1 Vault',
            },
            {
              title: 'Do you want to setup a PIN for your wallet?',
              messageBoxList: [
                {
                  warning:
                    'The PIN once set cannot be changed. You will have to delete the wallet and create again in order to change the PIN',
                },
              ],
            },
            {
              title: 'Setup a PIN on the X1 Vault',
              bulletList: [
                'Use between 4 and 8 characters',
                'The PIN can be alphanumeric',
              ],
              messageBoxList: [
                {
                  // TODO: add functionality to 
                  warning:
                    'Make sure you make a backup of your PIN. If you lose it , you lose access to your funds ',
                },
              ],
              warning: 'Skip this step if you are not setting up a PIN',
            },
            {
              title: 'Confirm the entered PIN on the X1 Vault',
              messageBoxList: [
                {
                  warning:
                    "Remember your PIN, if you lose it, you lose access to your funds. Even Cypherock won't be able to help you recover your assets",
                },
                {
                  warning: 'Back it up in a safe place',
                },
              ],
              warning: 'Skip this step if you are not setting up a PIN',
            },
          ],
        },
        {
          asideTitle: 'Sync X1 Cards',
          pages: [
            {
              title: 'Tap X1 Cards one by one below the X1 Vault',
              subtitle: 'Do not lift until you hear a beep sound',
              messageBoxList: [
                {
                  info: 'Make sure your X1 Cards belong to the same family',
                },
                {
                  info: 'Make sure you tap the X1 Cards in the correct order',
                },
              ],
            },
          ],
        },
        {
          asideTitle: 'Confirmation',
          pages: [
            {
              title: 'Congratulations, your wallet is now successfully created',
            },
            {
              title:
                'The next time you need to make a transaction, you just need to fetch any one X1 Card along with the X1 Vault',
            },

            {
              // TODO: add functionality to 
              title:
                'In case you lose your X1 Vault, you can buy a new X1 Vault separately and use it with your old X1 Cards ',
            },
            {
              title: 'Important Note',
              messageBoxList: [
                {
                  // TODO: add functionality to 
                  warning:
                    'In case you need to add another wallet, you will need to fetch all of the 4 cards together. In case you want to import your other wallets into Cypherock X1, now is the best time to avoid the future hassle ',
                },
              ],
            },
            {
              // TODO: add functionality to 
              title:
                'As a next step, keep your X1 Cards safely inside the card sleeves  and distribute them into different places. Some examples of the places could be: ',
              bulletList: [
                'Homes of your family members or your friends',
                'Secret hideout',
                'Bank locker',
              ],
            },
          ],
        },
      ],
    },
    importWallet: {
      title: 'Import Wallet',
      tabs: [
        {
          asideTitle: 'X1 Vault',
          pages: [
            {
              title:
                'From the Main Menu of your X1 Vault, click on "Create Wallet"',
            },
            {
              title: 'Click "Restore from Seed Phrase" on your X1 Vault',
            },
            {
              title: 'Enter a wallet name on your X1 Vault',
              bulletList: [
                'Upto 15 characters allowed',
                'It can be alphanumeric',
              ],
              messageBoxList: [
                {
                  info: 'Make sure that the wallet name is unique to other wallet names on the device',
                },
                {
                  warning:
                    'Wallet name once set cannot be modified. Please set the name accordingly',
                },
              ],
            },
            {
              title: 'Confirm the wallet name on the X1 Vault',
            },
            {
              title: 'Do you want to setup a PIN for your wallet?',
              messageBoxList: [
                {
                  warning:
                    'The PIN once set cannot be changed. You will have to delete the wallet and create again in order to change the PIN',
                },
              ],
            },
            {
              title: 'Setup a PIN on the X1 Vault',
              bulletList: [
                'Use between 4 and 8 characters',
                'The PIN can be alphanumeric',
              ],
              messageBoxList: [
                {
                  // TODO: add functionality to 
                  warning:
                    'Make sure you make a backup of your PIN. If you lose it , you lose access to your funds ',
                },
              ],
              warning: 'Skip this step if you are not setting up a PIN',
            },
            {
              title: 'Confirm the entered PIN on the X1 Vault',
              messageBoxList: [
                {
                  warning:
                    "Remember your PIN, if you lose it, you lose access to your funds. Even Cypherock won't be able to help you recover your assets",
                },
                {
                  warning: 'Back it up in a safe place',
                },
              ],
              warning: 'Skip this step if you are not setting up a PIN',
            },
          ],
        },
        {
          asideTitle: 'Sync X1 Cards',
          pages: [
            {
              title:
                'Count the number of words of the seed phrase which you are importing and select it on the X1 Vault',
            },
            {
              title: 'Enter the seed phrase on the X1 Vault',
              messageBoxList: [
                {
                  warning:
                    'Make sure you do not make spelling mistakes while entering the words on the device. Words like "west" & "nest" are often confusing while reading and needs to be entered correctly',
                },
              ],
            },
            {
              title: 'Verify the seed phrase that you entered on the X1 Vault',
              subtitle:
                'Match each and every to successfully import the correct wallet',
            },
            {
              title: 'Tap X1 Cards one by one below the X1 Vault',
              subtitle: 'Do not lift until you hear a beep sound',
              messageBoxList: [
                {
                  info: 'Make sure your X1 Cards belong to the same family',
                },
                {
                  info: 'Make sure you tap the X1 Cards in the correct order',
                },
              ],
            },
          ],
        },
        {
          asideTitle: 'Confirmation',
          pages: [
            {
              title: 'Congratulations, your wallet is now successfully created',
            },
            {
              title:
                'The next time you need to make a transaction, you just need to fetch any one X1 Card along with the X1 Vault',
            },

            {
              // TODO: add functionality to 
              title:
                'In case you lose your X1 Vault, you can buy a new X1 Vault separately and use it with your old X1 Cards ',
            },
            {
              title: 'Important Note',
              messageBoxList: [
                {
                  // TODO: add functionality to 
                  warning:
                    'In case you need to add another wallet, you will need to fetch all of the 4 cards together. In case you want to import your other wallets into Cypherock X1, now is the best time to avoid the future hassle ',
                },
              ],
            },
            {
              // TODO: add functionality to 
              title:
                'As a next step, keep your X1 Cards safely inside the card sleeves  and distribute them into different places. Some examples of the places could be: ',
              bulletList: [
                'Homes of your family members or your friends',
                'Secret hideout',
                'Bank locker',
              ],
            },
          ],
        },
      ],
    },
    finalMessage: {
      title:
        'To add coins and tokens in wallet, you have to add an account first. Make sure you have the X1 Vault and an X1 Card handy with you',
      buttons: {
        secondary: 'Skip',
        primary: 'Add Account',
      },
    },
    walletNotCreatedDialog: {
      title: "Seems like you haven't created a wallet yet",
      subtitle: 'To add an account you have to first create a wallet',
      buttons: {
        secondary: 'I will do it later',
        primary: 'Create Wallet',
      },
    },
    closeDialog: {
      title: 'Are you sure you want to exit?',
      subtitle:
        'You can always start this guide by clicking "Add Wallet" under the Wallets tab',
      buttons: {
        secondary: 'Cancel',
        primary: 'Exit',
      },
    },
  },
  dialogs: {
    close: {
      title: 'Are you sure you want to exit?',
    },
  },
};

export type LanguageStrings = typeof en;

export default en;
