import styled from "styled-components";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { PlayerContext } from "contexts/web-playback";
import { /*pause, togglePlay, */ getPlayerState } from "./playback-api-calls";
import { AuthContext, SpotifyTokenType } from "pages/_app";
import _ from "lodash";
import ProgressBar from "components/progress-bar";
import { darken } from "polished";
import PlayerControls, { PlayerControlContainer } from "./player-controls";

const IconButton = styled.button`
  background-color: transparent;
  border: none;
  color: #b3b3b3;
  width: 32px;
  min-width: 32px;
  height: 32px;
  text-align: center;
  place-self: center;
  align-items: center;

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

const VolumeIcon: React.FC<{
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
}> = ({ volume, setVolume }) => {
  if (volume === 0) {
    return (
      <IconButton
        onClick={() => {
          setVolume(50);
        }}
        className="volume-bar__icon-button control-button"
      >
        <svg style={{ fill: "currentcolor" }} height={16} width={16}>
          <path
            d={`M0 5v6h2.804L8 14V2L2.804 5H0zm7-1.268v8.536L3.072 10H1V6h2.072L7 3.732zm8.623 2.121l-.707-.707-2.147 2.147-2.146-2.147-.707.707L12.062 8l-2.146 2.146.707.707 2.146-2.147 2.147 2.147.707-.707L13.477 8l2.146-2.147z`}
          />
        </svg>
      </IconButton>
    );
  } else if (volume < 60) {
    return (
      <IconButton
        onClick={() => {
          setVolume(0);
        }}
        className="volume-bar__icon-button control-button"
      >
        <svg style={{ fill: "currentcolor" }} height={16} width={16}>
          <path
            d={`M0 11.032v-6h2.802l5.198-3v12l-5.198-3H0zm7 1.27v-8.54l-3.929 2.27H1v4h2.071L7 12.302zm4.464-2.314q.401-.925.401-1.956 0-1.032-.4-1.957-.402-.924-1.124-1.623L11 3.69q.873.834 1.369 1.957.496 1.123.496 2.385 0 1.262-.496 2.385-.496 1.123-1.369 1.956l-.659-.762q.722-.698 1.123-1.623z`}
          />
        </svg>
      </IconButton>
    );
  } else {
    return (
      <IconButton
        onClick={() => {
          setVolume(0);
        }}
        className="volume-bar__icon-button control-button"
      >
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
  grid-template-columns: 0.5rem 1fr 1rem 1fr;
  grid-column-gap: 0.5rem;
  grid-template-rows: 1fr;
  grid-area: 1 / 1 / 2 / end2;
  justify-content: start;
  align-items: center;
  height: 100%;
  width: 100%;
  align-content: center;
`;

const VolumeIconWrapper = styled.div`
  grid-area: 1 / 2 / 1 / end2;
`;
const ProgressBarWrapper = styled.div`
  grid-area: 1 / 4 / 1 / end4;
`;

const VolumeSlider: React.FC = ({}) => {
  const defaultVolume = 50;
  const [volume, setVolume] = useState<number>(defaultVolume);
  return (
    <VolumeSliderContainer>
      <VolumeIconWrapper>
        <VolumeIcon setVolume={setVolume} volume={volume} />
      </VolumeIconWrapper>
      <ProgressBarWrapper>
        <ProgressBar progress={volume} setProgress={setVolume} />
      </ProgressBarWrapper>
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
    ${(props) => darken(0.15, props.theme.colors.gray2)} 100%
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
        <PlayerControls {...playerState} />
        <ExtraActions>
          <VolumeSlider />
        </ExtraActions>
      </PlaybarContainer>
    </Footer>
  );
};

export default Playbar;
