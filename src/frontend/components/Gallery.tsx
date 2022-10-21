import React, { Component } from "react";
import styled from "styled-components";
// @ts-ignore
import AwesomeSlider from "react-awesome-slider";

import "react-awesome-slider/dist/styles.css";
import { __COLORS } from "../layout/Theme";
import { Parallax } from "react-scroll-parallax/cjs";
import { TrackingIn } from "../layout/UI/Animations/BounceIn";

const Content = styled.div<{ align: string }>`
  z-index: 100;
  text-align: ${props => props.align};
  margin: 0 10%;
  animation: ${TrackingIn} 1s cubic-bezier(0.215, 0.61, 0.355, 1) both;
  animation-delay: 0.3s;
`;

const Title = styled.h1`
  color: ${__COLORS.PRIMARY};
  font-size: calc(6rem + 2vmin);
  margin-top: -2rem;
  margin-bottom: 0;
  font-weight: bold;
  line-height: 1;
`;

const SubTitle = styled.h3`
  color: ${__COLORS.FOURTH};
  font-size: calc(2.5rem + 2vmin);
  margin-top: 0;
  font-weight: bold;
`;

type Props = {
  autoPlay: boolean;
};
type State = {
  selected: number;
  intervalId: any;
  interval: number;
  totalImages: number;
};

class Gallery extends Component<Props, State> {
  state = {
    selected: 0,
    intervalId: 0,
    interval: 3000,
    totalImages: 7
  };

  componentWillUnmount(): void {
    clearInterval(this.state.intervalId);
  }

  timer(): void {
    let selected = (this.state.selected + 1) % this.state.totalImages;
    this.setState({ selected });
  }

  startTimer(): void {
    clearInterval(this.state.intervalId);
    const intervalId = setInterval(this.timer.bind(this), this.state.interval);
    this.setState({ intervalId });
  }

  render() {
    return (
      <AwesomeSlider
        infinite={true}
        selected={this.state.selected}
        onFirstMount={() => {
          if (this.props.autoPlay) {
            this.startTimer();
          }
        }}
        onTransitionEnd={(ref: any) => {
          if (this.props.autoPlay) {
            let index = ref.currentIndex;
            this.setState({ selected: index });
          }
        }}
      >
        <div data-src="assets/images/rogeriocibele1.png">
          <Parallax className="section" y={[-20, 30]} tagOuter="div">
            <Content align={"right"}>
              <Title>Rogério e Cibele</Title>
              <SubTitle>9 de Dezembro de 2022</SubTitle>
            </Content>
          </Parallax>
        </div>

        <div data-src="assets/images/rogeriocibele2.png">
          <Parallax className="section" y={[-20, 30]} tagOuter="div">
            <Content align={"left"}>
              <Title>Rogério e Cibele</Title>
              <SubTitle>9 de Dezembro de 2022</SubTitle>
            </Content>
          </Parallax>
        </div>
        <div data-src="assets/images/rogeriocibele3.png">
          <Parallax className="section" y={[-20, 30]} tagOuter="div">
            <Content align={"center"}>
              <Title>Rogério e Cibele</Title>
              <SubTitle>9 de Dezembro de 2022</SubTitle>
            </Content>
          </Parallax>
        </div>
        <div data-src="assets/images/rogeriocibele4.png">
          <Parallax className="section" y={[-20, 30]} tagOuter="div">
            <Content align={"right"}>
              <Title>Rogério e Cibele</Title>
              <SubTitle>9 de Dezembro de 2022</SubTitle>
            </Content>
          </Parallax>
        </div>

        <div data-src="assets/images/rogeriocibele5.png">
          <Parallax className="section" y={[-20, 30]} tagOuter="div">
            <Content align={"right"}>
              <Title>Rogério e Cibele</Title>
              <SubTitle>9 de Dezembro de 2022</SubTitle>
            </Content>
          </Parallax>
        </div>
        <div data-src="assets/images/rogeriocibele6.png">
          <Parallax className="section" y={[-20, 30]} tagOuter="div">
            <Content align={"right"}>
              <Title>Rogério e Cibele</Title>
              <SubTitle>9 de Dezembro de 2022</SubTitle>
            </Content>
          </Parallax>
        </div>
        <div data-src="assets/images/rogeriocibele7.png">
          <Parallax className="section" y={[-20, 30]} tagOuter="div">
            <Content align={"right"}>
              <Title>Rogério e Cibele</Title>
              <SubTitle>9 de Dezembro de 2022</SubTitle>
            </Content>
          </Parallax>
        </div>
        <div data-src="assets/images/rogeriocibele8.png">
          <Parallax className="section" y={[-20, 30]} tagOuter="div">
            <Content align={"right"}>
              <Title>Rogério e Cibele</Title>
              <SubTitle>9 de Dezembro de 2022</SubTitle>
            </Content>
          </Parallax>
        </div>
      </AwesomeSlider>
    );
  }
}

export default Gallery;
