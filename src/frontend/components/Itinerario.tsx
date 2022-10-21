import React from "react";
import styled from "styled-components";
import { __COLORS, __GRAY_SCALE } from "../layout/Theme";
import { getAlphaColor } from "../helpers/AlphaColor";
import MyImage, { AssetType } from "../views/Figure";
import MyIcon, { IconTypes } from "../views/Icon";
import { EXTRA_SMALL_DEVICES } from "../layout/Mobile";

export type Itinerary = {
  startTime: string;
  description: string;
  picture: string;
  address: string;
};

let data: Itinerary[] = [
  {
    startTime: "17:00",
    description: "Cerimônia",
    picture: "emporio.png",
    address:
      "https://www.google.com.br/maps/place/Emp%C3%B3rio+Da+Mata+Castanhal/@-1.3087489,-47.931913,16.25z/data=!4m5!3m4!1s0x92a5a9e15abf5845:0x4c8cb3be5163278f!8m2!3d-1.3061715!4d-47.9312585"
  },
  {
    startTime: "19:00",
    description: "Recepção",
    picture: "emporio.png",
    address:
      "https://www.google.com.br/maps/place/Emp%C3%B3rio+Da+Mata+Castanhal/@-1.3087489,-47.931913,16.25z/data=!4m5!3m4!1s0x92a5a9e15abf5845:0x4c8cb3be5163278f!8m2!3d-1.3061715!4d-47.9312585"
  },
];
const Container = styled.div`
  border-radius: 6px;
`;

const Row = styled.div`
  display: flex;
  height: 90px;
  color: ${__COLORS.TERTRIARY};
`;

const HourContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  ${EXTRA_SMALL_DEVICES`
    flex: 2;
  `};
`;
const Hour = styled.span`
  font-size: 20px;
  font-weight: 100;
`;

const TextContainer = styled.div`
  display: flex;
  flex: 5;
  padding-left: 40px;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.span`
  font-weight: bold;
`;

const Directions = styled.div`
  display: flex;
  align-items: center;
  margin-top: 4px;
`;

const Border = styled.div`
  position: relative;
  background: ${getAlphaColor(0.2, __COLORS.TERTRIARY)};
  width: 2px;
  height: 100%;
`;
const SmallBall = styled.div<{ first: boolean }>`
  position: absolute;
  background: rgb(212, 220, 226);
  width: 8px;
  height: 8px;
  top: ${props => (props.first ? 0 : "inherit")};
  left: -3.3px;
  bottom: 0;
  border-radius: 50%;
`;

const Image = styled(MyImage)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  margin-top: -20px;
  left: -19px;
`;

const Get = styled.a`
  color: ${__GRAY_SCALE._700};
  font-size: 14px;
  text-decoration: none;
  font-style: italic;
`;
type Props = {
  itinerary: Itinerary;
  index: number;
};

const Item = ({ itinerary, index }: Props) => {
  return (
    <Row>
      <HourContainer>
        <Hour>{itinerary.startTime}</Hour>
      </HourContainer>
      <Border>
        {(index === 0 || index === data.length - 1) && (
          <SmallBall first={index === 0} />
        )}
        <Image source={itinerary.picture} assetType={AssetType.IMAGE} />
      </Border>
      <TextContainer>
        <Title>{itinerary.description}</Title>
        {itinerary.address && (
          <Directions>
            <MyIcon
              name={IconTypes.ARROW}
              color={__GRAY_SCALE._500}
              style={{ width: 30, height: 20 }}
            />
            <Get href={itinerary.address} target="_blank">
              Veja o endereço exato
            </Get>
          </Directions>
        )}
      </TextContainer>
    </Row>
  );
};

export const Itinerario = () => {
  return (
    <Container>
      {data.map((i: Itinerary, index) => {
        return <Item itinerary={i} key={index} index={index} />;
      })}
    </Container>
  );
};
