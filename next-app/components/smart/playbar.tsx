import styled from "styled-components";
import React from "react";

import _ from "lodash";
import { darken } from "polished";
import PlayerControls, { PlayerControlContainer } from "./player-controls";
import VolumeSlider from "./volume";
import NowPlayingBar from "./now-playing-bar";

const Footer = styled.footer`
  height: 100%;
  width: 100%;
  grid-area: 3 / 1 / 2 / 3;
  background: linear-gradient(
    -90deg,
    ${(props) => props.theme.colors.gray1} 0%,
    ${(props) => darken(0.15, props.theme.colors.gray2)} 100%
  );
`;

const ExtraActions = styled.div`
  grid-template-columns: 1fr 1fr;
`;
const PlaybarContainer = styled.div`
  display: grid;
  border-radius: 0.3rem;
  width: 100%;
  display: grid;
  padding: 0rem 1rem 0rem 1rem;
  grid-template-columns: 1rem 1fr 1fr 0.8fr 1rem;
  grid-template-rows: 1rem 1fr 3rem;
  ${ExtraActions} {
    grid-area: 1 / 4 / end3 / end4;
    width: 100%;
    height: 100%;
  }
  ${PlayerControlContainer} {
    grid-area: 1 / 3 / 2 / 4;
    justify-content: center;
    place-content: cetner;
    width: 100%;
    height: 100%;
  }
`;

const Playbar: React.FC = ({}) => {
  return (
    <Footer>
      <PlaybarContainer>
        <NowPlayingBar />
        <PlayerControls />
        <ExtraActions>
          <VolumeSlider />
        </ExtraActions>
      </PlaybarContainer>
    </Footer>
  );
};

export default Playbar;
