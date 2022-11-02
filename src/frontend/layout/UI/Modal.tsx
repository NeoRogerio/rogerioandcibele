import React, { Component } from "react";
import styled from "styled-components";
import { __COLORS, __GRAY_SCALE } from "../Theme";
import { getAlphaColor } from "../../helpers/AlphaColor";
import { Package } from "../../components/ListaNozze";
import MyIcon, { IconTypes } from "../../views/Icon";
import MySlider from "./Slider";
import { getDomain } from "../../helpers/Domain";
import { HTTP_OPTIONS, PROTOCOL_METHOD } from "../../helpers/FetchOptions";
import animationData from "../../layout/UI/Animations/gift.json";
import buttonLoading from "../../layout/UI/Animations/buttonLoading.json";
// @ts-ignore
import isEmail from "is-email";
import { connect } from "react-redux";
import { RootState } from "../../reducers/store";
import { Dispatch } from "redux";
import { fetchPackages } from "../../reducers/packages/actions";
import LottieManager from "../../components/LottieManager";
import { EXTRA_SMALL_DEVICES } from "../Mobile";
import MediaQuery from "react-responsive";
import { DESKTOP_WIDTH } from "../Layout";
import { CreditCard } from "phosphor-react";

const Parent = styled.div<{ isOpen: boolean }>`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? "visible" : "hidden")};
  transition: 0.4s ease-in-out all;
  background: ${getAlphaColor(0.25, __COLORS.TERTRIARY)};
`;
const Container = styled.div`
  min-height: 400px;
  max-height: 80%;
  min-width: 600px;
  border-radius: 8px;
  background: ${__COLORS.WHITE};
  color: ${__COLORS.TERTRIARY};
  padding: 30px 45px;
  display: flex;
  flex-direction: column;
  z-index: 600;
  max-width: 50%;
  ${EXTRA_SMALL_DEVICES`
    min-height: 100%;
    padding: 5px 20px 5px 20px;
    max-width: 100%;
    min-width: 100%;
  `};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  ${EXTRA_SMALL_DEVICES`
       flex-direction: column;
   `};
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${__COLORS.TERTRIARY};
  font-weight: 100;
  letter-spacing: -0.5px;
  margin: 0 20px 0 9px;
  ${EXTRA_SMALL_DEVICES`
    padding: 10px;
       text-align: center;
           background: white;
    z-index: 10000;
       margin: 0 0 -15px 0;
   `};
`;

const CloseIconContainer = styled.div`
  ${EXTRA_SMALL_DEVICES`
      background: white;
      padding: 15px;
      border-radius: 50%;
   `};
`;

const Paragraph = styled.p`
  font-size: 14px;
  color: ${getAlphaColor(0.8, __COLORS.TERTRIARY)};
  text-align: justify;
  ${EXTRA_SMALL_DEVICES`
      margin-bottom: 20px;
   `};
`;

const Close = styled.div`
  margin-left: auto;
  margin-right: 12px;
  margin-top: 4px;
  ${EXTRA_SMALL_DEVICES`
        position: absolute;
        right: 5%;
        top: 4%;
    `};
`;

const Body = styled.div`
  flex: 6;
  color: ${__COLORS.TERTRIARY};
  overflow: scroll;
  ${EXTRA_SMALL_DEVICES`
           padding: 10px 20px 10px 20px;
  `};
`;

const Image = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 10px;
  border-radius: 50%;
  ${EXTRA_SMALL_DEVICES`
        margin-right: 0;
        width: 100%;
        height: 100%;
        max-height: 120px;
        border-radius: 0;
        margin-bottom: 15px;
    `};
`;

const Footer = styled.div`
  flex: 1;
  display: flex;
  padding: 5px 0 25px 0;
  align-self: center;
  ${EXTRA_SMALL_DEVICES`
      padding: 5px 0 20px 0;
  `};
`;

const Button = styled.div`
  padding: 15px 25px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 100;
  color: ${__COLORS.WHITE};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${__COLORS.TERTRIARY};
`;

const ContinueShoppingButton = styled(Button)`
  font-weight: 900;
  text-align: center;
  color: ${__COLORS.TERTRIARY};
  background: ${__COLORS.PRIMARY};
  font-size: 18px;
  justify-content: center;
`;

type Props = {
  isOpen: boolean;
  close: () => void;
  selectedPackage: Package | null;
  fetchPackages: () => any;
};

const Row = styled.div`
  display: flex;
  margin: 10px 0;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 13px;
  margin-left: 5px;
`;

const Input = styled.input<{ emailError: boolean }>`
  &::placeholder {
    color: ${__GRAY_SCALE._500};
    font-weight: 100;
  }
  font-size: 14px;
  font-family: inherit;
  outline: none;
  color: ${props => (props.emailError ? __COLORS.ERROR : __COLORS.TERTRIARY)};
  padding: 10px;
  border-radius: 10px;
  border: ${props =>
    props.emailError
      ? `1px solid ${__COLORS.ERROR}`
      : `1px solid ${__GRAY_SCALE._300}`};
  margin: 6px 0;
`;

const TextArea = styled.textarea`
  &::placeholder {
    color: ${__GRAY_SCALE._500};
    font-weight: 100;
  }
  font-size: 14px;
  font-family: inherit;
  outline: none;
  color: ${__COLORS.TERTRIARY};
  padding: 10px;
  border-radius: 10px;
  border: 1px solid ${__GRAY_SCALE._300};
  margin: 6px 0;
`;

const Error = styled.span`
  font-weight: bold;
  font-size: 12px;
  color: ${__COLORS.ERROR};
  margin-bottom: 10px;
`;

const Lottie = styled.div``;

const ThanksContainer = styled.div`
  max-width: 500px;
  ${EXTRA_SMALL_DEVICES`
        padding: 5px 20px 5px 20px;
  `};
`;

const SubTitle = styled.h3`
  margin-top: 0px;
  color: ${__COLORS.TERTRIARY};
  text-align: justify;
  font-size: 16px;
  font-style: italic;
  ${EXTRA_SMALL_DEVICES`
  font-size: 14px;
    `};
`;

const SliderContainer = styled.div`
  margin: 0 3px;
`;

const CaroTitle = styled(Title)`
  margin: 0 20px 0 0;
  ${EXTRA_SMALL_DEVICES`
    margin: 0
    font-size: 16px;
   `};
`;

const MyLottieManager = styled(LottieManager)`
  margin: 0px -20px 0 0;
`;

type State = {
  email: string;
  message: string;
  contribution: number;
  emailError: string | null;
  isContributionCompleted: boolean;
  loading: boolean;
};
class Modal extends Component<Props, State> {
  state = {
    email: "",
    emailError: null,
    message: "",
    contribution: 0,
    isContributionCompleted: true,
    loading: false
  };

  resetModal() {
    this.setState({
      email: "",
      message: "",
      isContributionCompleted: false,
      emailError: null
    });
  }

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {
    if (
      this.props.selectedPackage !== null &&
      this.props.selectedPackage !== prevProps.selectedPackage
    ) {
      this.resetModal();
      this.setState({ contribution: 0 });
    }
  }

  areFieldsValid() {
    if (!isEmail(this.state.email)) {
      this.setState({
        emailError:
          "Mi pare che l'indirizzo email che hai inserito non sia valido. È vero o lucas è cretino? "
      });
      return false;
    }
    return true;
  }

  sendContribution() {
    // TODO: validation!!
    if (this.props.selectedPackage !== null) {
      this.setState({ isContributionCompleted: true });
    }
  }

  render() {
    return (
      <Parent isOpen={this.props.isOpen}>
        <Container>
          {this.props.selectedPackage !== null ? (
            <>
              <Header>
                <Image src={"assets/images/" + this.props.selectedPackage.thumbnail} />
                <Title>
                  {this.state.isContributionCompleted
                    ? "Obrigado pelo "
                    : "Nos presenteie com "}
                  <strong>{this.props.selectedPackage.title}</strong>
                </Title>
                <Close>
                  <CloseIconContainer
                    onClick={() => {
                      this.props.close();
                    }}
                  >
                    <MyIcon
                      name={IconTypes.CLOSE}
                      style={{ width: 18, height: 18 }}
                    />
                  </CloseIconContainer>
                </Close>
              </Header>
              <Body>
                {this.state.isContributionCompleted ? (
                  <Lottie>
                    <MediaQuery minWidth={DESKTOP_WIDTH}>
                      {matches => {
                        if (matches) {
                          return (
                            <LottieManager
                              animationData={animationData}
                              height={330}
                              width={330}
                              loop={false}
                              onComplete={() => {
                                console.log("completed!");
                              }}
                            />
                          );
                        } else {
                          return (
                            <LottieManager
                              animationData={animationData}
                              height={150}
                              width={150}
                              loop={false}
                              onComplete={() => {
                                console.log("completed!");
                              }}
                            />
                          );
                        }
                      }}
                    </MediaQuery>
                  </Lottie>
                ) : (
                  <>
                    <Paragraph>
                      Como funciona? Use o QR Code abaixo para fazer o pagamento via Pix. Ou se preferir pagar com cartão, clique no botão abaixo do QR Code.
                    </Paragraph>
                    <Row>
                      <img
                        src={`assets/images/qrCode/${this.props.selectedPackage._id}.png`}
                        style={{
                          width: 235,
                          height: 235,
                          alignSelf: 'center'
                        }}
                        alt={this.props.selectedPackage.title}
                      />
                    </Row>

                    <Row>
                    <Label>Pix Copia e Cola</Label>
                    <TextArea
                        value={this.props.selectedPackage.pixCopiaCola}
                        contentEditable={false}
                      />
                    </Row>
                    <Row>
                      <Button
                        onClick={()=> window.open(this.props.selectedPackage ? this.props.selectedPackage.cartaoCredito : "", "_blank")}
                      >
                        <CreditCard />
                        <b>
                          Pague com Cartão
                        </b>
                      </Button>
                    </ Row>
                    <Row>
                      <Label>Mensagem</Label>
                      <TextArea
                        value={this.state.message}
                        placeholder="Deixe sua mensagem aqui.."
                        onChange={(e: any) => {
                          this.setState({ message: e.target.value });
                        }}
                      />
                    </Row>
                  </>
                )}
              </Body>
              <Footer>
                {this.state.isContributionCompleted ? (
                  <ThanksContainer>
                    <CaroTitle>
                      Caro <strong>{this.state.email},</strong>
                    </CaroTitle>
                    <SubTitle>
                      Nós agradecemos imensamente a sua contribuição! Se Possível nos comunique 
                      sua escolha do presente para que possamos confirmar o recebimento.
                    </SubTitle>
                    <ContinueShoppingButton
                      onClick={() => {
                        this.props.close();
                      }}
                    >
                      Muito Obrigado :)
                    </ContinueShoppingButton>
                  </ThanksContainer>
                ) : (
                  <Button
                    onClick={() => {
                      this.sendContribution();
                    }}
                  >
                    Presentear Cibele e Rogério{" "}
                    {this.state.loading && (
                      <MyLottieManager
                        animationData={buttonLoading}
                        height={15}
                        loop={true}
                        width={40}
                        onComplete={() => {}}
                      />
                    )}
                  </Button>
                )}
              </Footer>
            </>
          ) : null}
        </Container>
      </Parent>
    );
  }
}

export default connect(
  (state: RootState) => ({}),
  (dispatch: Dispatch) => {
    return {
      fetchPackages: () => {
        dispatch(fetchPackages());
      }
    };
  }
)(Modal);
