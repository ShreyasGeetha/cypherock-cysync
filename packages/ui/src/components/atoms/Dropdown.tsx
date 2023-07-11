import React, { useState } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative; /* Add this line */
  display: flex;
  height: 44px;
  padding: 12px 24px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  font-family: 'Poppins', sans-serif;
`;

const HorizontalBox = styled.div`
  display: flex;
  padding: 8px 16px;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid #3c3937;
  background: var(--input-background, #27221d);
  width: 422px;
  height: 42px;
`;

const StretchedTypography = styled.div`
  flex: 1;
`;

const LeanBoxDropdownItem = styled(HorizontalBox)`
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

const DropdownButton = styled.button`
  border-radius: var(--br-5xs);
  background-color: var(--color-gray-400);
  color: white;
  border: 1px solid var(--cypherock-cysync-separator);
  box-sizing: border-box;
  width: 250px;
  height: 44px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  padding: var(--padding-xs) var(--padding-5xl);
  align-items: center;
  justify-content: space-between;
  font-family: 'Poppins', sans-serif;
`;
const DropdownArrow = styled.span`
  margin-left: 5px;
`;
const DropdownContent = styled.div<{ isOpen: boolean }>`
  display: ${(props: { isOpen: boolean }) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 250px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  top: 100%; /* Update the top position */
  left: 14; /* Add this line */
`;

interface DropdownProps {
  options: string[];
}
export const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <DropdownContainer>
      <DropdownButton onClick={handleDropdownClick}>
        {selectedOption || 'Cypherock Red'}
        <DropdownArrow>{isOpen ? '▲' : '▼'}</DropdownArrow>
      </DropdownButton>
      <DropdownContent isOpen={isOpen}>
        {options.map(option => (
          <LeanBoxDropdownItem
            key={option}
            onClick={() => handleOptionClick(option)}
          >
            <StretchedTypography>{option}</StretchedTypography>
          </LeanBoxDropdownItem>
        ))}
      </DropdownContent>
    </DropdownContainer>
  );
};
