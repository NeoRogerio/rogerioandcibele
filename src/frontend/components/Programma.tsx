import React from "react";
import styled from "styled-components";
import { __COLORS, __GRAY_SCALE } from "../layout/Theme";
import Map from "./Map";
import { EXTRA_SMALL_DEVICES } from "../layout/Mobile";
import MyImage, { AssetType } from "../views/Figure";
import { Itinerario } from "./Itinerario";
import { CibeleRogerioMessage } from "../views/LuciaDavorMessage";
import { CalendarBlank, CheckSquare } from "phosphor-react";
// @ts-ignore
const Parent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  margin-bottom: 8em;
  ${EXTRA_SMALL_DEVICES`
    flex-direction: column;
  `};
`;

const TimeLineContainer = styled.div`
  flex: 1;

  margin-right: 20px;
`;

const MapContainer = styled.div`
  flex: 1;
`;

const SubTitle = styled.h3`
  color: ${__COLORS.SECONDARY};
  font-weight: 100;
  font-size: calc(0.4rem + 2vmin);
`;

const Destination = styled.div`
  justify-self: center;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  align-items: center;
`;

const Title = styled.h3`
  font-weight: bold;
  color: ${__COLORS.TERTRIARY};
  margin-bottom: 0;
`;

const Ul = styled.ul`
  margin-top: 5px;
  padding-left: 30px;
`;

const Li = styled.li`
  ${EXTRA_SMALL_DEVICES`
        list-style-type: none; 
        margin-top: 15px;
    `};
`;

const Button = styled.div`
display: flex;
  padding: 11px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 100;
  color: ${__COLORS.WHITE};
  background: ${__COLORS.TERTRIARY};
  align-items: center;
  gap: 0.5rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 35px 0;
  align-items: center;
`;

const Link = styled.a``;

type Props = {};

export const Programma = () => {
  return (
    <Parent>
      <CibeleRogerioMessage>
        <Destination>
          <ButtonContainer>
            <Button
              onClick={()=> window.open("https://forms.gle/KGtTtrTxcBhN124M8", "_blank")}
            >
              <CheckSquare />
              <b>
                Confirme sua presença!
              </b>
            </Button>
          </ButtonContainer>
          <ButtonContainer>
            <Button
              onClick={()=> window.open("https://forms.gle/KGtTtrTxcBhN124M8", "_blank")}
            >
              <CalendarBlank />
              <b>
                Salve na sua agenda!
              </b>
            </Button>
          </ButtonContainer>
        </Destination>
      </CibeleRogerioMessage>
      <Container>
        <TimeLineContainer>
          <SubTitle>Intinerário</SubTitle>
          <Itinerario />
        </TimeLineContainer>
        <MapContainer>
          <SubTitle>Onde?</SubTitle>
          <Map />
        </MapContainer>
      </Container>
    </Parent>
  );
};
