import styled, { css } from "styled-components";
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

const Slider = styled.button<{ active: boolean }>`
  position: absolute;
  top: -100%;
  right: var(--progress-bar-transform);
  background-color: #fff;
  border: 0;
  padding: 0;
  border-radius: 60%;
  margin-left: -12px;
  width: 12px;
  height: 12px;
  z-index: 100;
  -webkit-box-shadow: 0 2px 4px 0 rgb(0 0 0 / 50%);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 50%);
  opacity: 0;
  ${(p) =>
    p.active &&
    css`
      width: 12px;
      height: 12px;
      opacity: 1;
    `}
  &:active,
  &:hover {
    width: 12px;
    height: 12px;
    opacity: 1;
  }
  &:after {
    margin: -2px;
  }
`;

const StyledProgressBar = styled.div<{ active: boolean; transform: number }>`
  height: 100%;
  width: 100%;
  display: grid;
  align-items: center;
  --bg-color: #535353;
  --fg-color: #b3b3b3;
  --progress-bar-height: 4px;
  --progress-bar-radius: calc(var(--progress-bar-height) / 2);
  --progress-bar-transform: 0;
  --progress-bar-transform: ${(p) => `${p.transform}%`};
  --progress-bar-transform-neg: ${(p) => `${-1 * p.transform}%`};
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  position: relative;
  border-radius: var(--progress-bar-radius);
  height: var(--progress-bar-height);
`;

const ProgressBarFGWrapper = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  align-content: center;
  border-radius: var(--progress-bar-radius);
  height: var(--progress-bar-height);
  width: 100%;
`;
const ProgressBarFG = styled.div<{ active: boolean }>`
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
  transform: translateX(var(--progress-bar-transform-neg));
  background-color: var(--fg-color);
  border-radius: var(--progress-bar-radius);
  height: var(--progress-bar-height);
  width: 100%;
  ${(p) =>
    p.active &&
    css`
      background-color: ${(p) => p.theme.colors.green1};
    `}
  &:active,
  &:focus {
    background-color: ${(p) => p.theme.colors.green1};
  }
`;
const ProgressBarBG = styled.div`
  box-sizing: border-box;
  display: flex;
  border-radius: var(--progress-bar-radius);
  background-color: ${(p) => p.theme.colors.gray3};
  width: 100%;
  height: var(--progress-bar-height);
`;
const ProgressBar: React.FC<{
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
}> = ({ setProgress, progress }) => {
  const handleProgressClick = (e: unknown) => {
    // @ts-ignore
    const pageX = e.pageX;
    // @ts-ignore
    const bcr = e.currentTarget.getBoundingClientRect();
    // left is zero
    const zeroed = pageX - bcr.x;
    const prog = (zeroed / bcr.width) * 100;
    console.log(pageX, zeroed, prog, bcr, moving);
    // const newPos = Math.min(Math.max(0, progress + delta), 100);
    setProgress(prog);
  };
  const [active, setActive] = useState<boolean>(false);
  const [moving, setMoving] = useState<boolean>(false);
  return (
    <ProgressBarWrapper
      onBlur={(e) => {
        setMoving(false);
        setActive(false);
      }}
      onFocus={(e) => {
        setMoving(false);
        setActive(false);
      }}
      onMouseUp={() => {
        setMoving(false);
      }}
      onMouseDown={() => {
        setMoving(true);
      }}
      onMouseOver={(e) => {
        setActive(true);
      }}
    >
      <StyledProgressBar
        // @ts-ignore
        active={active}
        onClick={handleProgressClick}
        onMouseMove={(e) => {
          if (moving) {
            handleProgressClick(e);
          }
        }}
        transform={100 - progress}
      >
        <ProgressBarBG>
          <ProgressBarFGWrapper
            onMouseMove={(e) => {
              if (moving) {
                handleProgressClick(e);
              }
            }}
            //onMouseMove={(e) => e.stopPropagation()}
          >
            <ProgressBarFG
              // onMouseMove={(e) => e.stopPropagation()}
              active={active}
            />
          </ProgressBarFGWrapper>
          <Slider onMouseMove={(e) => e.stopPropagation()} active={active} />
        </ProgressBarBG>
      </StyledProgressBar>
    </ProgressBarWrapper>
  );
};
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
