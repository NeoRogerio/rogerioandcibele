import React, { Component } from "react";
import styled from "styled-components";
import { __COLORS, __GRAY_SCALE } from "../Theme";
import { getAlphaColor } from "../../helpers/AlphaColor";
import { Package } from "../../components/ListaNozze";
import MyIcon, { IconTypes } from "../../views/Icon";
import MySlider from "./Slider";
import { getDomain } from "../../helpers/Domain";
import { HTTP_OPTIONS, PROTOCOL_METHOD } from "../../helpers/FetchOptions";
// @ts-ignore
import isEmail from "is-email";
import { connect } from "react-redux";
import { RootState } from "../../reducers/store";
import { Dispatch } from "redux";
import { fetchPackages } from "../../reducers/packages/actions";

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
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  min-height: 60px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: ${__COLORS.TERTRIARY};
  font-weight: 100;
  letter-spacing: -0.5px;
`;

const Paragraph = styled.p`
  font-size: 13px;
  color: ${getAlphaColor(0.8, __COLORS.TERTRIARY)};
`;

const Close = styled.div`
  margin-left: auto;
  margin-right: 12px;
  margin-top: 13px;
`;

const Body = styled.div`
  flex: 6;
  color: ${__COLORS.TERTRIARY};
  overflow: scroll;
`;

const Image = styled.img`
  width: 45px;
  height: 45px;
  margin-right: 10px;
  border-radius: 50%;
`;

const Footer = styled.div`
  flex: 1;
  display: flex;
  padding: 5px 0 25px 0;
  align-self: center;
`;

const Button = styled.div`
  padding: 15px 25px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 100;
  color: ${__COLORS.WHITE};
  background: ${__COLORS.TERTRIARY};
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
type State = {
  email: string;
  message: string;
  contribution: number;
  emailError: string | null;
};
class Modal extends Component<Props, State> {
  state = {
    email: "",
    emailError: null,
    message: "",
    contribution: 0
  };

  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {
    if (
      this.props.selectedPackage !== null &&
      this.props.selectedPackage !== prevProps.selectedPackage
    ) {
      this.setState({ contribution: this.props.selectedPackage.median });
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
    if (this.props.selectedPackage !== null && this.areFieldsValid()) {
      fetch(
        `${getDomain()}/api/packages/contributor?id=${
          this.props.selectedPackage._id
        }`,
        HTTP_OPTIONS(
          PROTOCOL_METHOD.POST,
          JSON.stringify({
            email: this.state.email,
            message: this.state.message,
            contribution: this.state.contribution
          })
        )
      )
        .then(r => r.json())
        .then(response => {
          if (response.success) {
            this.props.close();
            this.props.fetchPackages();
          } else {
            alert(String(response.error));
          }
        });
    }
  }

  render() {
    return (
      <Parent isOpen={this.props.isOpen}>
        <Container>
          {this.props.selectedPackage !== null ? (
            <>
              <Header>
                <Image src={this.props.selectedPackage.thumbnail} />
                <Title>
                  Regala <strong>{this.props.selectedPackage.title}</strong> a
                  Lucia e Davor!
                </Title>
                <Close>
                  <div
                    onClick={() => {
                      this.props.close();
                    }}
                  >
                    <MyIcon
                      name={IconTypes.CLOSE}
                      style={{ width: 18, height: 18 }}
                    />
                  </div>
                </Close>
              </Header>
              <Body>
                <Paragraph>
                  Come funziona? È davvero semplice: specificate il vostro
                  indirizzo email che vi servirà da conferma, indicate l'importo
                  che desiderate regalare a Davor e Lucia e se volete potete
                  anche aggiungere una messaggio per loro! Quando avete fatto,
                  cliccate il bottone "Contribuisci al regalo" :) Davor e Lucia
                  riceveranno una email con il vostro regalo e il vostro
                  messaggio! I vostri dati non verranno salvati da nessun mostro
                  marino informatico. Tutto è sicuro :)
                </Paragraph>
                <Row>
                  <Label>Email</Label>
                  <Input
                    emailError={this.state.emailError !== null}
                    placeholder="Inserisci il tuo indirizzo Email qui.."
                    type="email"
                    onChange={(e: any) => {
                      if (this.state.emailError) {
                        this.setState({ emailError: null });
                      }
                      this.setState({ email: e.target.value });
                    }}
                  />
                  {this.state.emailError && (
                    <Error>{this.state.emailError}</Error>
                  )}
                </Row>

                <Row>
                  <Label>Messaggio</Label>
                  <TextArea
                    placeholder="Inserisci il tuo messaggio qui.."
                    onChange={(e: any) => {
                      this.setState({ message: e.target.value });
                    }}
                  />
                </Row>
                <Row>
                  <Label>Importo da regalare</Label>
                  <div style={{ margin: "0 3px" }}>
                    <MySlider
                      initialValue={this.state.contribution}
                      setValue={(v: number) => {
                        this.setState({ contribution: v });
                      }}
                      min={0}
                      max={this.props.selectedPackage.rest}
                    />
                  </div>
                </Row>
              </Body>
              <Footer>
                <Button
                  onClick={() => {
                    this.sendContribution();
                  }}
                >
                  Regala a Lucia e Davor{" "}
                  <strong>{this.state.contribution}</strong> CHF
                </Button>
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