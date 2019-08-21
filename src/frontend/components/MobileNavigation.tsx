import React from "react";
import styled from "styled-components";
import { __COLORS } from "../layout/Theme";
import MyIcon, { IconTypes } from "../views/Icon";
// @ts-ignore
import Scrollchor from "react-scrollchor";
const Parent = styled.div<{ isOpen: boolean }>`
  position: fixed;
  width: 100%;
  height: 100vh;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? "visible" : "hidden")};
  transform: ${props =>
    props.isOpen ? "rotate3d(1,1,1)" : "rotate3d(1,10,1,90deg)"};

  transition: 0.5s ease-in-out all;
  z-index: 10000;
  background: ${__COLORS.SECONDARY};
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

const CloseContainer = styled.div`
  align-self: flex-end;
  margin: 30px 35px 0 0;
`;

const Navs = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const Nav = styled.h2`
  color: ${__COLORS.WHITE};
  padding: 40px 0 10px 0;
  text-align: center;
`;

type Props = {
  isMobileNavigation: boolean;
  showMobileNavigation: () => void;
};

const MobileNavigation = ({
  isMobileNavigation,
  showMobileNavigation
}: Props) => {
  return (
    <Parent isOpen={isMobileNavigation}>
      <Container>
        <CloseContainer
          onClick={() => {
            showMobileNavigation();
          }}
        >
          <MyIcon
            name={IconTypes.CLOSE}
            color={__COLORS.WHITE}
            style={{ width: 35, cursor: "pointer" }}
          />
        </CloseContainer>
        <Navs>
          <Scrollchor
            to={`#programma}`}
            style={{ color: "inherit", textDecoration: "none" }}
          >
            da finire
          </Scrollchor>
        </Navs>
      </Container>
    </Parent>
  );
};
export default MobileNavigation;