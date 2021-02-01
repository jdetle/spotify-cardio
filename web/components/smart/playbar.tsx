import styled from "styled-components";
import { FaPlay, FaPause /* FaForward, FaBackward */ } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import RadioGroup, { StyledFieldSet } from "./../radio-group";
import RadioButton from "./../radio-button";
import { PlayerContext } from "contexts/web-playback";
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
  const { playerState, player } = useContext(PlayerContext);
  useEffect(() => {
    if (playerState?.paused == false) {
      setValue("play");
    }
  }, [playerState?.paused]);

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
              if (player && playerState) {
                setValue("play");
                player.togglePlay();
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
                player.pause().then(() => setValue("pause"));
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
              name={playerState?.track_window.current_track.name}
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
