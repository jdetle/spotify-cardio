import {
  SliderInput,
  SliderTrack,
  SliderRange,
  SliderHandle,
} from "@reach/slider";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import styled, { css } from "styled-components";
import { useTimeoutFn } from "react-use";

const StyledSliderHandle = styled(SliderHandle)<{ active: boolean }>`
  position: absolute;
  top: -100%;
  cursor: pointer;
  background-color: #fff;
  border: 0;
  padding: 0;
  border-radius: 60%;
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

/*
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
*/
export const StyledSliderTrack = styled(SliderTrack)<{ active: boolean }>`
  box-sizing: border-box;
  display: flex;
  border-radius: var(--progress-bar-radius);
  background-color: ${(p) => p.theme.colors.gray3};
  width: 100%;
  height: var(--progress-bar-height);
`;
export const StyledSliderRange = styled(SliderRange)`
  background-color: var(--fg-color);
  border-radius: var(--progress-bar-radius);
  height: var(--progress-bar-height);
  width: 100%;
  ${(p) =>
    p.active &&
    css`
      background-color: ${(p) => p.theme.colors.green1};
    `}
  &:hover,
  &:active,
  &:focus {
    background-color: ${(p) => p.theme.colors.green1};
  }
`;

const StyledSliderInput = styled(SliderInput)<{ active: boolean }>`
  height: 100%;
  width: 100%;
  display: grid;
  align-items: center;
  --bg-color: #535353;
  --fg-color: #b3b3b3;
  --progress-bar-height: 4px;
  --progress-bar-radius: calc(var(--progress-bar-height) / 2);
`;

type ProgressBarProps = {
  progress: number;
  setProgress: Dispatch<SetStateAction<number>>;
};
export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  setProgress,
}) => {
  const ms = 5000;
  const [active, setActive] = useState<boolean>(false);
  const [timerQueue, setTimerQueue] = useState<Array<NodeJS.Timeout>>([]);

  const setActiveClearTimeouts = () => {
    setActive(true);
    for (let timer of timerQueue) {
      clearTimeout(timer);
    }
    setTimerQueue([]);
  };

  const setInactiveWithTimeouts = () => {
    const timerId = setTimeout(() => setActive(false), ms);
    setTimerQueue((tq) => tq.concat(timerId));
  };

  return (
    <StyledSliderInput
      onBlur={() => {
        setInactiveWithTimeouts();
      }}
      onPointerDown={() => {
        setActiveClearTimeouts();
      }}
      onPointerUp={() => {
        setInactiveWithTimeouts();
      }}
      onMouseDown={() => {
        setActiveClearTimeouts();
      }}
      onMouseMove={() => {
        setActiveClearTimeouts();
      }}
      onMouseUp={() => {
        setInactiveWithTimeouts();
      }}
      onTouchStart={() => {
        setActiveClearTimeouts();
      }}
      onTouchMove={() => {
        setActiveClearTimeouts();
      }}
      onTouchEnd={() => {
        setInactiveWithTimeouts();
      }}
      onChange={(newProgress) => setProgress(newProgress)}
      value={progress}
      min={0}
      max={100}
      step={1}
    >
      <StyledSliderTrack>
        <StyledSliderRange active={active} />
        <StyledSliderHandle active={active} />
      </StyledSliderTrack>
    </StyledSliderInput>
  );
};

export default ProgressBar;
