import styled from "styled-components";
import { FaPlay, FaPause, FaForward, FaBackward } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import RadioGroup, { StyledFieldSet } from "./../radio-group";
import RadioButton from "./../radio-button";
import { PlayerContext } from "contexts/web-playback";
import { play, pause } from "./playback-api-calls";
import { AuthContext } from "pages/_app";

const PlaybarBGContainer = styled.div`
  grid-area: 4 / 1 / 5 / 5;
  background-color: ${(p) => p.theme.colors.gray6};
  background: linear-gradient(
    180deg,
    ${(props) => props.theme.colors.gray4} 0%,
    ${(props) => props.theme.colors.gray6} 100%
  );
  display: grid;
  grid-template-rows: 2rem 1fr 2rem;
  grid-template-columns: 4rem 1fr 1fr;
`;

const PlaybarContainer = styled.div`
  grid-area: 2 / 2 /3 / 3;
  border-radius: 0.3rem;
  width: 100%;
  display: grid;
  grid-template-columns: 1rem 1fr 1rem;
  grid-template-rows: 1rem 1fr 1rem;
  ${StyledFieldSet} {
    grid-area: 2 / 2 / 3 / 3;
    border-radius: 1rem;
  }
`;

const PlayDetails = styled.div`
  grid-area: 3/ 2 /4 / 3;
`;

const Playbar: React.FC = ({}) => {
  const { setToken } = useContext(AuthContext);
  const [value, setValue] = useState<string>("pause");
  const { playerState, player } = useContext(PlayerContext);
  useEffect(() => {
    if (playerState?.paused == false) {
      setValue("play");
    }
  }, [playerState?.paused]);

  return (
    <PlaybarBGContainer>
      <PlaybarContainer>
        <RadioGroup legend="Playback">
          <RadioButton
            disabled={playerState === null}
            isActive={playerState != null && value === "back"}
            onSelect={() => {
              setValue("back");
            }}
          >
            <FaBackward />
          </RadioButton>
          <RadioButton
            disabled={playerState === null}
            isActive={playerState != null && value === "play"}
            onSelect={() => {
              if (player && playerState) {
                setValue("play");
                play({
                  spotify_uri: playerState.track_window.current_track.uri,
                  setToken,
                  playerInstance: player,
                });
              }
            }}
          >
            <FaPlay />
          </RadioButton>
          <RadioButton
            disabled={playerState === null}
            isActive={playerState != null && value === "pause"}
            onSelect={() => {
              if (player) {
                pause({ playerInstance: player, setToken });
                setValue("pause");
              }
            }}
          >
            <FaPause />
          </RadioButton>
          <RadioButton
            disabled={playerState === null}
            isActive={playerState != null && value === "forward"}
            onSelect={() => {
              setValue("forward");
            }}
          >
            <FaForward />
          </RadioButton>
        </RadioGroup>
      </PlaybarContainer>
      <PlayDetails>
        {playerState?.position}
        {playerState?.track_window.current_track.name}
        {playerState?.timestamp}
        {playerState?.duration}
      </PlayDetails>
    </PlaybarBGContainer>
  );
};

export default Playbar;
