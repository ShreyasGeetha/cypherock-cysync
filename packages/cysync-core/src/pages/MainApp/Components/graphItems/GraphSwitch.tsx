import styled from 'styled-components';
import { ImageProps } from '@cypherock/cysync-ui';
import React, { useEffect, useState ,useRef } from 'react';

interface graphImageProps extends ImageProps {
    src: string;
    alt: string;
    onClick : any;
  }
  
  const StyledImage = styled.img<graphImageProps>`
    display: flex;
    width: 32px;
    padding: 5px;
    height: 32px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    border: 1.5px solid #45413E;
    background: #39322C;
    box-shadow: 4px 4px 32px 4px #0F0D0B;
  `;
  
  const Image2: React.FC<graphImageProps> = ({ onClick , src, alt ,...props }) => <StyledImage {...props} onClick={onClick} src={src} alt={alt} />;
  
  export default Image2;