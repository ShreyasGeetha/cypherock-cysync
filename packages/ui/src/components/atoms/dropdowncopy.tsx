import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { useTheme } from 'styled-components';

import { Image } from './Image';
import { Input } from './Input';

import { searchIcon, triangleInverseIcon } from '../../assets';
import { DropDownListItem, DropDownListItemProps } from '../molecules';

interface DropdownProps {
  items: DropDownListItemProps[];
  searchText: string;
  placeholderText: string;
  selectedItem: string | undefined;
  onChange: (selectedItemId: string | undefined) => void;
  disabled?: boolean;
  shouldShowIcon?: boolean;
}

const List = styled.ul<{ disabled?: boolean }>`
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  list-style: none;
  border-radius: 8px;
  box-shadow: 4px 4px 32px 4px ${({ theme }) => theme.palette.shadow.dropdown};
  padding: 16px 0px 16px 0px;
  z-index: 10;
  background-color: ${({ theme }) => theme.palette.background.input};
  &:hover {
    cursor: ${props => (!props.disabled ? 'pointer' : 'default')};
  }
`;

const ListItem = styled.li`
  background-color: ${({ theme }) => theme.palette.border.list};
`;

const buttonAnimationData = {
  duration: '0.3s',
  curve: 'ease-out',
};

const Container = styled.div<{ $isOpen: boolean; disabled?: boolean }>`
  position: relative;
  width: 100%;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.border.separatorSecondary};

  ${({ disabled, theme }) =>
    !disabled &&
    `
      &:hover {  
        &::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 8px;
            border: 1px solid transparent;
            z-index: 10;
            background: ${theme.palette.golden};
            -webkit-mask: linear-gradient(#fff 0 0) padding-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
          }
      
          &:hover::before {
            background: ${theme.palette.golden} border-box;
            transition: all ${buttonAnimationData.duration};
            ${buttonAnimationData.curve};
          }
        cursor: pointer;
      }      
    `}

  input {
    padding-right: 30px;
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  }
`;

const IconContainer = styled.div`
  position: absolute;
  right: 24px;
  padding-bottom: 8px;
  top: 60%;
  transform: translateY(-50%);
`;

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  shouldShowIcon,
  searchText,
  placeholderText,
  selectedItem = undefined,
  onChange,
  disabled = false,
}) => {
  const [search, setSearch] = useState('');
  const [isOpen, setisOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCheckedChange = (id: string) => {
    onChange(id);
  };

  const filteredItems = useMemo(
    () =>
      items.filter(item =>
        item.text.toLowerCase().includes(search.toLowerCase()),
      ),
    [items, search],
  );

  const findSelectedItem = (
    menuItems: DropDownListItemProps[],
    selectedId: string | undefined,
  ): DropDownListItemProps | undefined => {
    for (const item of menuItems) {
      if (item.id === selectedId) {
        return item;
      }
      if (item.subMenu && item.subMenu.length > 0) {
        const foundItem = findSelectedItem(item.subMenu, selectedId);
        if (foundItem) {
          return foundItem;
        }
      }
    }
    return undefined;
  };

  const selectedDropdownItem = useMemo(
    () => findSelectedItem(items, selectedItem),
    [items, selectedItem],
  );

  const handleInputChange = (value: string) => {
    // console.log("value ", value, "disabled ", disabled)
    // if (!disabled) {
    setSearch(value);
    // }
  };

  const toggleDropdown = () => {
    if (!disabled) {
      setisOpen(!isOpen);
      setSearch('');
    }
  };

  const handleItemSelection = () => {
    toggleDropdown();
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setisOpen(false);
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <Container
      ref={containerRef}
      $isOpen={isOpen || isHovered}
      disabled={disabled}
      onClick={toggleDropdown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {selectedItem ? (
        <DropDownListItem
          $borderRadius={8}
          checked={!!selectedItem || false}
          onCheckedChange={() =>
            handleCheckedChange(selectedDropdownItem?.id ?? '')
          }
          id={selectedDropdownItem?.id}
          text={selectedDropdownItem?.text ?? ''}
          onClick={toggleDropdown}
          restrictedItem
          leftImageSrc={selectedDropdownItem?.leftImageSrc}
          rightText={selectedDropdownItem?.rightText}
          $hasRightText={!!selectedDropdownItem?.rightText}
          tag={selectedDropdownItem?.tag}
          shortForm={selectedDropdownItem?.shortForm}
          color="white"
        />
      ) : (
        <Input
          type="text"
          value={search}
          name="choose"
          onClick={toggleDropdown}
          onChange={handleInputChange}
          $bgColor={theme?.palette.background.separatorSecondary}
          placeholder={isOpen ? searchText : placeholderText}
          disabled={disabled}
        />
      )}
      <IconContainer>
        <Image
          src={isOpen ? searchIcon : triangleInverseIcon}
          alt={isOpen ? 'Search Icon' : 'Dropdown Icon'}
        />
      </IconContainer>

      {isOpen && (
        <List onMouseLeave={toggleDropdown} disabled={disabled}>
          {filteredItems.map(item => {
            const itemId = item.id ?? '';
            return (
              <ListItem key={itemId} onClick={() => handleItemSelection()}>
                <DropDownListItem
                  checked={selectedItem === item.id}
                  onCheckedChange={handleCheckedChange}
                  {...item}
                  selectedItem={selectedItem}
                  id={item.id}
                  leftImageSrc={shouldShowIcon ? item.leftImageSrc : ''}
                />
              </ListItem>
            );
          })}
        </List>
      )}
    </Container>
  );
};

Dropdown.defaultProps = {
  disabled: false,
  shouldShowIcon: false,
};
