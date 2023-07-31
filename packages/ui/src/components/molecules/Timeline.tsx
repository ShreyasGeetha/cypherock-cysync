import React from 'react';
import styled from 'styled-components';
import { goldenGradient } from '../utils';

interface TimelineItemData {
  id: number;
  active: boolean;
}

interface TimelineProps {
  items: TimelineItemData[];
  lineColor: string;
}

const TimelineContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 200px;
  margin: 16px;
`;

const TimelineCircle = styled.div<{ active: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: 50%;

  ${({ active }) =>
    active ? goldenGradient('background') : 'background-color: transparent;'}
  ${({ active, theme }) =>
    !active &&
    `
        border: 2px solid ${theme.palette.text.muted};
    `}                    
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  color: ${({ active, theme }) =>
    active ? theme.palette.background.black : theme.palette.background.muted};

  ${({ active, theme }) =>
    active &&
    `
    &::before {
        content: '';
        position: absolute;    
        width: 28px;
        height: 28px;
        border-radius: 50%;
        border: 2px solid transparent;
        background: ${theme.palette.golden} border-box;
        -webkit-mask: linear-gradient(#fff 0 0) padding-box,
            linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
    }
  `}
`;

const TimelineLine = styled.div<{
  color: string;
  leftOffset: number;
  width: number;
}>`
  height: 2px;
  background-color: ${({ theme, color }) => theme.palette.background[color]};
  left: ${({ leftOffset }) => leftOffset}px;
  width: ${({ width }) => width}%;
  position: absolute;
  top: 12px;
  z-index: -1;
`;

const TimelineItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Timeline: React.FC<TimelineProps> = ({ items, lineColor }) => {
  const leftOffset = 28;
  const width = 100 - leftOffset + (items[1].active ? 0 : 2);

  return (
    <TimelineContainer>
      {items.map(item => (
        <TimelineItem key={item.id}>
          <TimelineCircle active={item.active}>{item.id}</TimelineCircle>
        </TimelineItem>
      ))}
      <TimelineLine color={lineColor} leftOffset={leftOffset} width={width} />
    </TimelineContainer>
  );
};

export default Timeline;
