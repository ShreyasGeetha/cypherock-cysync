import { css } from 'styled-components';

import { generateCss } from './generateCss';

import { MediaQuery } from '../../types';
import { getHeightWidth } from '../../utils/getHeightWidth';

type HeightType = 'full' | 'screen' | 'inherit';
type IImageType = number | string | HeightType;

export interface HeightProps {
  height?: MediaQuery<IImageType>;
  $maxHeight?: MediaQuery<IImageType>;
}
export interface ImageHeightProps {
  height?: IImageType;
}

const heightMap: Record<HeightType, string> = {
  full: '100%',
  screen: '100vh',
  inherit: 'inherit',
};

const getHeight = (item: HeightType | number | string) =>
  getHeightWidth(item, heightMap);

export const height = css<HeightProps>`
  ${props => props.height && generateCss(['height'], getHeight, props.height)}
  ${props =>
    props.$maxHeight &&
    generateCss(['max-height'], getHeight, props.$maxHeight)}
`;
