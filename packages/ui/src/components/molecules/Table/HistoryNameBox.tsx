import React, { FC } from 'react';
import styled from 'styled-components';
import { Container, Divider, Typography, TypographyColor } from '../../atoms';
import { iconBoxStyles } from './TableIconNameBox';
import { SvgProps } from '../../../assets';
import { BgColorProps, bgColor } from '../../utils';

interface HistoryNameBoxProps {
  icon: React.FC<SvgProps>;
  fill: string;
  iconVariant: 'grey' | 'success';
  title: string;
  textColor?: TypographyColor;
  subtitle: string;
  date?: string;
  size?: 'small' | 'big';
}

const HistoryNameBoxStyle = styled.div<HistoryNameBoxProps>`
  ${iconBoxStyles}
`;

interface MiniContainerProps extends BgColorProps {
  iconVariant?: string;
  onClick?: () => void;
}

export const MiniContainer = styled.div<MiniContainerProps>`
  display: flex;
  width: 40px;
  height: 40px;
  padding: var(--0-px, 0px);
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  background: ${({ iconVariant, theme }) =>
    iconVariant === 'success'
      ? `rgba(81, 198, 26, 0.20)`
      : theme.palette.background.calendar};
  ${({ onClick }) =>
    onClick &&
    `
      &:hover {
        cursor: pointer;
      }
    `}
  ${bgColor}
`;

export const HistoryNameBox: FC<HistoryNameBoxProps> = ({ ...props }) => {
  const IconComponent = props.icon;

  return (
    <HistoryNameBoxStyle {...props}>
      <MiniContainer $bgColor="separator">
        <IconComponent fill={props.fill} />
      </MiniContainer>

      <Container direction="column" gap={0} align="flex-start">
        <Typography
          variant="p"
          $fontWeight="semibold"
          color={props.textColor ?? undefined}
        >
          {props.title}
        </Typography>
        <Container gap={8} display="flex" direction="row">
          <Typography variant="p" color="muted">
            {props.subtitle}
          </Typography>

          {props.date && (
            <>
              <Divider variant="vertical" />
              <Typography variant="p">{props.date}</Typography>
            </>
          )}
        </Container>
      </Container>
    </HistoryNameBoxStyle>
  );
};

HistoryNameBox.defaultProps = {
  size: 'big',
  date: undefined,
  textColor: undefined,
};
