import styled from "styled-components";
import React, { useContext, useEffect, useState } from "react";

import { PlayerContext } from "contexts/web-playback";
import { /*pause, togglePlay, */ getPlayerState } from "./playback-api-calls";
import { AuthContext, SpotifyTokenType } from "pages/_app";
import _ from "lodash";
import ProgressBar from "components/progress-bar";

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  color: #b3b3b3;
  width: 32px;
  min-width: 32px;
  height: 32px;
  &:before {
    font-family: glue1-spoticon;
    font-style: normal;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: inherit;
    vertical-align: bottom;
    display: inline-block;
    text-decoration: inherit;
  }
`;

const VolumeIcon: React.FC = ({}) => {
  return (
    <IconButton className="spoticon-volume-off-16 control-button volume-bar__icon" />
  );
};

const VolumeSliderContainer = styled.div`
  display: grid;
  grid-template-columns: 2rem 1fr;
  grid-template-rows: 1fr;
  justify-content: start;
  align-items: center;
  height: 100%;
  width: 100%;
  align-content: center;
`;

const VolumeSlider: React.FC = ({}) => {
  const defaultVolume = 50;
  const [volume, setVolume] = useState<number>(defaultVolume);
  return (
    <VolumeSliderContainer>
      <VolumeIcon />
      <ProgressBar progress={volume} setProgress={setVolume} />
    </VolumeSliderContainer>
  );
};

const Footer = styled.footer`
  height: 100%;
  width: 100%;
  grid-area: 3 / 1 / 2 / 3;
  background: linear-gradient(
    -90deg,
    ${(props) => props.theme.colors.gray1} 0%,
    ${(props) => props.theme.colors.gray2} 100%
  );
`;
/*
const PlayDetailsContainer = styled.div`
  grid-area: 3/ 2 /4 / 3;
`;
*/
/*
const PlaybarBGContainer = styled.div`
  display: grid;
  grid-template-rows: 2rem 1fr 2rem;
  grid-template-columns: 4rem 1fr 1fr;
`;
*/

const PlaybarContainer = styled.div`
  display: grid;
  border-radius: 0.3rem;
  width: 100%;
  display: grid;
  padding-right: 1rem;
  grid-template-columns: 1rem 1fr 10rem 1rem;
  grid-template-rows: 1rem 1fr 3rem;
  ${VolumeSliderContainer} {
    grid-area: 1 / 3 / end3 / end3;
    width: 100%;
    height: 100%;
  }
`;

/*

type PlayDetailsProps = Pick<
  PlayerState,
  "duration" | "position" | "timestamp"
> & {
  name: string;
};
*/
/*
const PlayDetails: React.FC<PlayDetailsProps> = ({
  name,
  duration,
  position,
}) => {
  return (
    <PlayDetailsContainer>
      {name}
      {duration}
      {position}
    </PlayDetailsContainer>
  );
};
*/

const Playbar: React.FC = ({}) => {
  // const { setToken } = useContext(AuthContext);
  const [, setValue] = useState<string>("pause");
  const { playerInstance } = useContext(PlayerContext);
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const { token /*setToken*/ } = useContext(AuthContext);
  useEffect(() => {
    if (playerState?.is_playing) {
      setValue("play");
    }
  }, [playerState?.is_playing]);

  useEffect(() => {
    let isSubscribed = true;
    const timerID = setInterval(async () => {
      if (playerInstance && isSubscribed && token) {
        const playerState = await getPlayerState({
          playerInstance,
          token: token as SpotifyTokenType,
        });
        setPlayerState(playerState);
      }
    }, 2000);

    return () => {
      clearInterval(timerID);
    };
  }, [playerInstance, token]);
  return (
    <Footer>
      <PlaybarContainer>
        {/* <RadioGroup legend="Web Playback">
          <RadioButton
            disabled={playerState === null}
            isActive={playerState != null && value === "play"}
            onSelect={() => {
              if (playerInstance && playerState) {
                togglePlay({
                  playerInstance,
                  token: token as SpotifyTokenType,
                  setToken,
                }).then(() => {
                  setValue("play");
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
              if (playerInstance && token) {
                pause({
                  playerInstance,
                  token: token as SpotifyTokenType,
                }).then(() => setValue("paused"));
              }
            }}
          >
            <FaPause />
          </RadioButton>

          {playerState ? (
            <PlayDetails
              timestamp={playerState.timestamp}
              position={playerState.position}
              name={playerState?.track_window?.current_track.name ?? ""}
              duration={playerState.duration}
            ></PlayDetails>
          ) : (
            <></>
          )}
        </RadioGroup> */}
        <VolumeSlider />
      </PlaybarContainer>
    </Footer>
  );
};

export default Playbar;
