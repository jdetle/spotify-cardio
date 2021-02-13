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

const VolumeIcon: React.FC<{ volume: number }> = ({ volume }) => {
  if (volume === 0) {
    return (
      <IconButton className="spoticon-volume-off-16 control-button volume-bar__icon" />
    );
  } else if (volume < 60) {
    return (
      <IconButton className="volume-bar__icon-button control-button">
        <svg style={{ fill: "currentcolor" }} height={16} width={16}>
          <path
            d={`M0 11.032v-6h2.802l5.198-3v12l-5.198-3H0zm7 1.27v-8.54l-3.929 2.27H1v4h2.071L7 12.302zm4.464-2.314q.401-.925.401-1.956 0-1.032-.4-1.957-.402-.924-1.124-1.623L11 3.69q.873.834 1.369 1.957.496 1.123.496 2.385 0 1.262-.496 2.385-.496 1.123-1.369 1.956l-.659-.762q.722-.698 1.123-1.623z`}
          />
        </svg>
      </IconButton>
    );
  } else {
    return (
      <IconButton className="volume-bar__icon-button control-button">
        <svg style={{ fill: "currentcolor" }} height={16} width={16}>
          <path
            d={`M12.945 1.379l-.652.763c1.577 1.462 2.57 3.544 2.57 5.858s-.994 4.396-2.57 5.858l.651.763a8.966 8.966 0 00.001-13.242zm-2.272 2.66l-.651.763a4.484 4.484 0 01-.001 6.397l.651.763c1.04-1 1.691-2.404 1.691-3.961s-.65-2.962-1.69-3.962zM0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732z`}
          />
        </svg>
      </IconButton>
    );
  }
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
      <VolumeIcon volume={volume} />
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
