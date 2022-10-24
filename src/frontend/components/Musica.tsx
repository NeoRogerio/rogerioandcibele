import React from "react";
import styled from "styled-components";
import { CibeleRogerioMessage } from "../views/LuciaDavorMessage";
import MyImage, { AssetType } from "../views/Figure";

const Container = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;
const SpotifyButton = styled.div`
  color: #1db954;
  background: #000;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 18px 30px;
  text-align: center;
  border-radius: 8px;
  font-family: "Montserrat", sans-serif;
`;

const Logo = styled(MyImage)`
  height: 35px;
  width: auto;
  margin-bottom: 15px;
`;
const Link = styled.a`
  text-decoration: none;
`;

const Span = styled.span`
font-size: 14px;
`;

export const Musica = () => {
  return (
    <Container>
      <CibeleRogerioMessage>
      Criamos uma Playlist no Spotify para você ouvir músicas e gêneros durante a recepção proposta por você também! Clique no botão abaixo e adicione todas as músicas que deseja à nossa Playlist (você precisa ter uma conta no Spotify).
      </CibeleRogerioMessage>
      <ButtonContainer>
        <Link
          href="https://open.spotify.com/user/lucia.pelloni/playlist/0NuE8Uy6RBoTAQDlabL0bH"
          target="_blank"
        >
          <SpotifyButton>
            <Logo source={"spotify.png"} assetType={AssetType.LOGO} />
            <Span>Add Song to "Los Bajic wedding's songs"</Span>
          </SpotifyButton>
        </Link>
      </ButtonContainer>
    </Container>
  );
};
