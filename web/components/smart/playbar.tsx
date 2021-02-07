import styled from "styled-components";
import { FaPlay, FaPause /* FaForward, FaBackward */ } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import RadioButton from "./../radio-button";
import { PlayerContext } from "contexts/web-playback";
import { pause, togglePlay, getPlayerState } from "./playback-api-calls";
import { AuthContext, SpotifyTokenType } from "pages/_app";
// import { AuthContext } from "pages/_app";

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

const SliderContainer = styled.div``;
const VolumeSlider: React.FC = ({}) => {
  return (
    <SliderContainer>
      <VolumeIcon />
    </SliderContainer>
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

const PlayDetailsContainer = styled.div`
  grid-area: 3/ 2 /4 / 3;
`;
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
  grid-template-columns: 1rem 1fr 10rem 1rem;
  grid-template-rows: 1rem 1fr 3rem;
  ${SliderContainer} {
    grid-area: 2 / 3 / 2 / 3;
    border-radius: 1rem;
  }
`;

type PlayDetailsProps = Pick<
  PlayerState,
  "duration" | "position" | "timestamp"
> & {
  name: string;
};
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

const Playbar: React.FC = ({}) => {
  // const { setToken } = useContext(AuthContext);
  const [value, setValue] = useState<string>("pause");
  const { playerInstance } = useContext(PlayerContext);
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const { token, setToken } = useContext(AuthContext);
  useEffect(() => {
    if (playerState?.is_playing) {
      setValue("play");
    }
  }, [playerState?.is_playing]);

  useEffect(() => {
    let isSubscribed = true;
    console.log(isSubscribed);
    const timerID = setInterval(async () => {
      if (playerInstance && isSubscribed && token) {
        const playerState = await getPlayerState({
          playerInstance,
          token: token as SpotifyTokenType,
        });
        console.log(playerState);
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
