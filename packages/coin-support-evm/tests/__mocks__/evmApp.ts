import { EvmApp } from '@cypherock/sdk-app-evm';
import { jest } from '@jest/globals';

const DUMMY_ADDRESSES = [
  '0xF45b75b2b30f6d0ebC8dbdd57985433463260140',
  '0x85C7549E38C866458293167a4ec020CCF9a10b51',
  '0x2A30C64F04e27A0d9fc7dBd749fa5a2B8E1FC77A',
  '0x2B603D53B090d179A4e79353DB5E702a9dF03b63',
  '0xE9c72CA3C85F45FfA2cb5fE456640F78898B5f9d',
  '0x8B95390b65d71e4b290dBA99cCaf526B0d43F05E',
  '0x160FAB4633Cede0b7f882e9182871Ce2c8D1FF47',
  '0x7D2a6B9CD1B403C448f5326D7874b76A1D5fbEfB',
  '0x59Ff497af99949bE1785a50292FaB3A5CFd267c7',
  '0x4934326B7694d70Cd1c0798a8c5921b272600A2B',
  '0x217Bd4F49c65872a6Df911BF25fCFb5aF57b15E5',
  '0x4Ca78f6C88CF3Fe72Bd512e15570C84384BaCD0E',
  '0x6ed72577DfBF31d54204B32497725913457e7ee5',
  '0x8A67263398b883d052C833d9270AD1F21ad8Ad0D',
  '0xADcE069079F4001388fED2598b6e8351bc46F413',
  '0x91915269f38413c74922dD5A6eA8b7c111D80cb7',
  '0x5776a1c58877d0ABEa0061D2A25EAA937bfD9e35',
  '0x72593C017410307d56ab61444a484c5b3c5c1C4d',
  '0xBcAc900090094De40e787098D018944805612a59',
  '0x5B8F0CcfF66C4e79Afe0035C030db0d22aAD08bc',
  '0x1c60C713D83c0259F5f24E93fBA75fC614B43D70',
  '0x475987D96c47eDAAC9248C93905757Fc9DF20FF0',
  '0x04a8437dd92952593e40BbBF68678885F3C17cD2',
  '0xE2cE6CB882CbD4D4190c3c68F7428eB1A457854c',
  '0x8e069182b477A86Ec065520B8beE89e55B5B68Cc',
  '0xf31393c5263EaEc3903c0Ea03063Eaf3a1babD37',
  '0x5d09Ff86b9fD2CB8C1DC9F329177743C4Ec1FEde',
  '0x4932Effd9C4872e49E8CA1258338530DaB100c2c',
  '0x6fAC73A16c50dAbdd866DA3E25c4Eb81Dd0439f0',
  '0xbde2106f568c24bb69819b047278Ef18069bbFe6',
  '0xCC0D6290f1393D90ef2a81Fb4530cFC2E89DE98F',
  '0xDFC493083322334f99dDaD09666262131E155550',
  '0x3100d6A5B6207127F6C4E958d06f288a6C1a10A0',
  '0xBd36DdC18a97Dd17C5552dFaadc6f5A671B6f357',
  '0x7e2264362D108146E5754d65c0e18F8e756Dee0a',
  '0x849332e4250eFf876F925fe3Ce44161c37cbc30F',
  '0x92e55e5C0aA6E38678D12096ee5fAb0bcb58d1c1',
  '0x27987CEC5b2B5E262C69839dc09e8ECB50f45cCc',
  '0xB9139653fe3949ae7bB0dA60b687C4777e59Cc38',
  '0xDb6bB47657a95E293fd3147D28EFE580764A8634',
  '0x297f4C08DB905CC66bac963F479dABeA3fa8bB65',
  '0xFD02912d79d5AD6155ceF198E0435Eb65116DfbE',
  '0x409D50C3D70C97f0207b53c1b7753E3294153166',
  '0x9E45e0C9eB11040fD042991C592031211400DaCC',
  '0x59E158D9c2bc80280A052b671667d0106ba67A4f',
  '0x4fCc63cdf997EE2a21B5e1cf45f0288986a6432D',
  '0x17aB66E49E83E05802098D24023edb8215A09011',
  '0x771DB63501f5a565fbfB77DAA243eab6E1d910E1',
  '0xcCc91cB7F4E18908a00B27A1747091B50FC776Ca',
  '0xb3Fdc302493881cf01d66c8d023Bd47db0B275f7',
  '0xb7156e24d630Af3146050cc8ea47708DD8964eE5',
  '0x68d42801A5c892dcF5E238e8CDF9fc416cB6041F',
  '0xA2222c658B72cFaF2576f27028Dc10A388AB946A',
  '0xD071F673a6DB106a58E726Cf0192Fd7271112509',
  '0xABeDC654aAa6C38488a3618D6cE110479024D5B2',
  '0x48B919567b8b511bb9b4104F82109462428cf20B',
  '0xB39AABaB02f66184BE309B9d03A6b3982512f9f7',
  '0x7f1664Cf3C7A609f64bD41f49f9A2CF4cB5946FB',
  '0xFeEE49f8D5B4338EAd83cdA6cb463A134bEE640E',
  '0x61c7E16609Ca6B5D5847d71e5884877642BDAADb',
  '0xAd36488C9C036224DE08926ac69f9af8132bA4b2',
  '0x7A2e1eeB398dB0d385A039d104c5172c712d69F1',
  '0xD13027eE588dfddfcF74Aa250b17CED7C69Bc45d',
  '0xD23ff5BcE18D8C8F4f844EB1780cD029c5cE27C2',
  '0x6BbBb186fD3234Abf863a489C1628D04Df1A9FD3',
  '0x45d0674555a1EdEa5a582a66c869B375e727C261',
  '0x1C4Fb497fe3674A0ed9Ce59D723a5c89215A122F',
  '0xfD0251CCC114BE60D27E87F2c9Adc77F80eCDBBF',
];

export const getPublicKeys = jest
  .fn<EvmApp['getPublicKeys']>()
  .mockReturnValue(
    Promise.resolve({ addresses: DUMMY_ADDRESSES, publicKeys: [] }),
  );

export const getUserVerifiedPublicKey = jest
  .fn<EvmApp['getUserVerifiedPublicKey']>()
  .mockReturnValue(
    Promise.resolve({ address: DUMMY_ADDRESSES[0], publicKey: '' }),
  );

export const abort = jest
  .fn<EvmApp['abort']>()
  .mockReturnValue(Promise.resolve());

export const destroy = jest
  .fn<EvmApp['destroy']>()
  .mockReturnValue(Promise.resolve());

export const create = jest.fn(async () =>
  Promise.resolve({
    getUserVerifiedPublicKey,
    getPublicKeys,
    abort,
    destroy,
  }),
);

jest.mock('@cypherock/sdk-app-evm', () => {
  const originalModule: any = jest.requireActual('@cypherock/sdk-app-evm');

  return {
    __esModule: true,
    ...originalModule,
    EvmApp: {
      create,
    },
  };
});
