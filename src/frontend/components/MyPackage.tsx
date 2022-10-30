import React from "react";
import styled from "styled-components";
import { Contributor, Package } from "./ListaNozze";
import { EXTRA_SMALL_DEVICES } from "../layout/Mobile";
import { __COLORS, __COLORS_ARRAY, __GRAY_SCALE } from "../layout/Theme";
import MyIcon, { IconTypes } from "../views/Icon";
import ProgressBar from "../views/ProgressBar";

const Card = styled.div<{ soldout: boolean }>`
  &:hover {
    transform: scale(1.01);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2),
      0 10px 10px -5px rgba(0, 0, 0, 0.08);
  }
  width: 100%;
  pointer-events: ${props => (props.soldout ? "none" : "inherit")};
  transition: 0.3s ease-in-out all;
  display: flex;
  flex-direction: column;
  min-height: 500px;
  min-width: 250px;
  position: relative;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
`;

const Button = styled.div`
  padding: 11px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 100;
  color: ${__COLORS.WHITE};
  background: ${__COLORS.TERTRIARY};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 35px 0;
  align-items: center;
`;

const Image = styled.img`
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const InnerCard = styled.div<{ soldout: boolean }>`
  width: 80%;
  background: #fff;
  padding: ${props => (props.soldout ? 0 : 12)}px;
  align-self: center;
  margin-top: -10%;
  border-radius: 5px;
  box-shadow: 0 10px 15px -5px rgba(0, 0, 0, 0.1),
    0 5px 5px -5px rgba(0, 0, 0, 0.01);
  text-align: center;
  position: relative;
`;

const OuterCard = styled.div<{ soldout: boolean }>`
  opacity: ${props => (props.soldout ? 0.4 : 1)};
  align-self: center;
  width: 85%;
  margin-top: 20px;
`;

const Title = styled.h2<{ soldout: boolean }>`
  font-size: ${props => (props.soldout ? 16 : 22)}px;
  color: ${__COLORS.TERTRIARY};
  letter-spacing: -0.5px;
  font-weight: bold;
  margin-top: -15px;
  margin-bottom: 8px;
`;

const Label = styled.label`
  color: ${__GRAY_SCALE._600};
  font-size: 15px;
  margin-bottom: auto;
`;

const LabelContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Labels = styled.div`
  display: flex;
`;

const Value = styled.h4`
  font-size: 17px;
  color: ${__COLORS.TERTRIARY};
  margin-top: 5px;
`;

const Soldout = styled.div`
  color: ${__COLORS.WHITE};
  border-radius: 2px;
  background: ${__COLORS.SUCCESS};
  font-size: 16px;
  padding: 18px 12px;
  margin-bottom: 25px;
`;

const Relative = styled.div`
  position: relative;
`;

type Props = {
  myPackage: Package;
  onClick: (p: Package) => void;
};

export const MyPackage = ({ myPackage, onClick }: Props) => {
  return (
    <Card soldout={myPackage.soldout}>
      {console.info(myPackage)}
      <Relative>
        <Image
          src={"assets/images/" + myPackage.thumbnail}
          style={{
            width: "100%",
            height: 235,
            opacity: myPackage.soldout ? 0.4 : 1
          }}
        />
      </Relative>
      <InnerCard soldout={myPackage.soldout}>
        {myPackage.soldout ? (
          <Soldout>Este presente já foi escolhido!</Soldout>
        ) : (
          <MyIcon
            name={IconTypes.GIFT}
            style={{ width: 75, height: 75, marginTop: -8 }}
            color={__COLORS.TERTRIARY}
          />
        )}
        <Title soldout={myPackage.soldout}>{myPackage.title}</Title>
      </InnerCard>
      <OuterCard soldout={myPackage.soldout}>
        <Labels>
          <LabelContainer>
            <Label>Preço</Label>
            <Value>R$ {myPackage.totalPrice}</Value>
          </LabelContainer>
        </Labels>
        <ProgressBar
          soldout={myPackage.soldout}
          paid={0}
          total={myPackage.totalPrice}
          progress={(0 / myPackage.totalPrice) * 100}
        />
        <ButtonContainer>
          <Button
            onClick={() => {
              onClick(myPackage);
            }}
          >
            Presentear!
          </Button>
        </ButtonContainer>
      </OuterCard>
    </Card>
  );
};
