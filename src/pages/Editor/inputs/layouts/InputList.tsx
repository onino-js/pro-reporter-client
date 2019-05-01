import * as React from "react";
import { Dropdown, Menu } from "antd";
import styled from "../../../../styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBox = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.secondary};
`;

interface IInputListProps {
  list: string[];
  setValue: (item: string) => void;
}

export const InputList = ({ list, setValue }: IInputListProps) => (
  <Dropdown
    overlay={
      <Menu>
        {list.map((item: string, index: number) => (
          <Menu.Item onClick={() => setValue(item)} key={"menu-item" + index}>
            {item}
          </Menu.Item>
        ))}
      </Menu>
    }
    trigger={["click", "hover"]}
    placement="bottomLeft"
  >
    <SearchBox>
      <FontAwesomeIcon icon="search" />
    </SearchBox>
  </Dropdown>
);
