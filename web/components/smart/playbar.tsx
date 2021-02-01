import styled from "styled-components";
import { FaPlay, FaPause /* FaForward, FaBackward */ } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import RadioGroup, { StyledFieldSet } from "./../radio-group";
import RadioButton from "./../radio-button";
import { PlayerContext } from "contexts/web-playback";
import { play, pause, togglePlay, getPlayerState } from "./playback-api-calls";
import { AuthContext, SpotifyTokenType } from "pages/_app";
// import { AuthContext } from "pages/_app";

const PlaybarBGContainer = styled.div`
  grid-area: 4 / 1 / 5 / 5;
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

const PlayDetailsContainer = styled.div`
  grid-area: 3/ 2 /4 / 3;
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
    <PlaybarBGContainer>
      <PlaybarContainer>
        <RadioGroup legend="Web Playback">
          {/*
          <RadioButton
            disabled={playerState === null}
            isActive={playerState != null && value === "back"}
            onSelect={() => {
              setValue("back");
            }}
          >
            <FaBackward />
          </RadioButton>
          */}
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
          {/*
          <RadioButton
            disabled={playerState === null}
            isActive={playerState != null && value === "forward"}
            onSelect={() => {
              setValue("forward");
            }}
          >
            <FaForward />
          </RadioButton>
          */}
          {playerState ? (
            <PlayDetails
              timestamp={playerState.timestamp}
              position={playerState.position}
              name={playerState?.track_window?.current_track.name ?? "lol"}
              duration={playerState.duration}
            ></PlayDetails>
          ) : (
            <></>
          )}
        </RadioGroup>
      </PlaybarContainer>
    </PlaybarBGContainer>
  );
};

export default Playbar;
