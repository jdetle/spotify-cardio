/* Progress bar, current play state, name of song, play, next, back */

import ProgressBar from "components/progress-bar";
import styled from "styled-components";

type BackButttonProps = {
  playPrev: () => void;
};
type NextButtonProps = {
  playNext: () => void;
};
type Back15ButtonProps = {
  disabled: boolean;
  back15: () => void;
};
type Forward15ButtonProps = {
  disabled: boolean;
  advance15: () => void;
};
type PlayPauseButtonProps = {
  isPlaying: boolean;
  pause: () => void;
  play: () => void;
};
type PlayDetailsProps = Partial<PlayerState>;

const StyledBackButton = styled.button`
  color: #b3b3b3;
  position: relative;
  width: 32px;
  min-width: 32px;
  height: 32px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  background: transparent;
  border: none;
`;

const StyledBack15Button = styled.button`
  color: #b3b3b3;
  position: relative;
  width: 32px;
  min-width: 32px;
  height: 32px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  background: transparent;
  border: none;
`;
const StyledPlayPauseButton = styled.button`
  -webkit-transition: none 33ms cubic-bezier(0.3, 0, 0.7, 1);
  transition: none 33ms cubic-bezier(0.3, 0, 0.7, 1);
  -webkit-transition-property: all;
  transition-property: all;
  color: #000;
  border: none;
  background-color: #fff;
  position: relative;
  width: 32px;
  min-width: 32px;
  height: 32px;
  border-radius: 32px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
`;

const StyledNextButton = styled.button`
  color: #b3b3b3;
  position: relative;
  width: 32px;
  min-width: 32px;
  height: 32px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  background: transparent;
  border: none;
`;

const StyledForward15Button = styled.button`
  color: #b3b3b3;
  position: relative;
  width: 32px;
  min-width: 32px;
  height: 32px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  background: transparent;
  border: none;
`;

const BackButton: React.FC<BackButttonProps> = ({}) => {
  return (
    <StyledBackButton>
      <svg role="img" height="16" width="16" viewBox="0 0 16 16">
        <path d="M13 2.5L5 7.119V3H3v10h2V8.881l8 4.619z" />
      </svg>
    </StyledBackButton>
  );
};

const Back15: React.FC<Back15ButtonProps> = ({}) => {
  return (
    <StyledBack15Button>
      <svg role="img" height="16" width="16" viewBox="0 0 16 16">
        <path
          d={`M10 4.001H6V2.5l-3.464 2L6 6.5V5h4c2.206 0 4 1.794 4 4s-1.794 4-4 4v1c2.75 0 5-2.25 5-5s-2.25-4.999-5-4.999zM2.393 8.739c-.083.126-.19.236-.32.332a1.642 1.642 0 01-.452.229 1.977 1.977 0 01-.56.092v.752h1.36V14h1.096V8.327h-.96c-.027.15-.081.287-.164.412zm5.74 2.036a1.762 1.762 0 00-.612-.368 2.295 2.295 0 00-.78-.128c-.191 0-.387.031-.584.092a1.188 1.188 0 00-.479.268l.327-1.352H8.38v-.96H5.252l-.688 2.872c.037.017.105.042.204.076l.308.108.309.107.212.076c.096-.112.223-.205.38-.28.157-.075.337-.112.54-.112.133 0 .264.021.392.063.128.043.24.105.336.188a.907.907 0 01.233.316c.059.128.088.275.088.44a.927.927 0 01-.628.916 1.19 1.19 0 01-.404.068c-.16 0-.306-.025-.435-.076a1.046 1.046 0 01-.34-.212.992.992 0 01-.229-.32 1.171 1.171 0 01-.1-.4l-1.04.248c.021.225.086.439.195.645.109.205.258.388.444.548.187.16.406.287.66.38.253.093.534.14.844.14.336 0 .636-.052.9-.156.264-.104.487-.246.672-.424.184-.179.325-.385.424-.62.099-.235.148-.485.148-.752 0-.298-.049-.565-.145-.8a1.686 1.686 0 00-.399-.591z`}
        />
      </svg>
    </StyledBack15Button>
  );
};

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({}) => {
  return (
    <StyledPlayPauseButton>
      <svg role="img" height="16" width="16" viewBox="0 0 16 16">
        <path d={`M4.018 14L14.41 8 4.018 2z`} />
      </svg>
    </StyledPlayPauseButton>
  );
};

const Forward15: React.FC<Forward15ButtonProps> = ({}) => {
  return (
    <StyledForward15Button>
      <svg role="img" height="16" width="16" viewBox="0 0 16 16">
        <path
          d={`M6 5h4v1.5l3.464-2L10 2.5V4H6C3.25 4 1 6.25 1 9s2.25 5 5 5v-1c-2.206 0-4-1.794-4-4s1.794-4 4-4zm1.935 3.739a1.306 1.306 0 01-.32.332c-.13.096-.281.172-.451.228a1.956 1.956 0 01-.562.092v.752h1.36v3.856h1.096V8.327h-.96c-.026.15-.08.287-.163.412zm6.139 2.628a1.664 1.664 0 00-.399-.592 1.747 1.747 0 00-.612-.368 2.295 2.295 0 00-.78-.128c-.191 0-.387.03-.584.092-.197.061-.357.15-.479.268l.327-1.352h2.376v-.96h-3.128l-.688 2.872c.037.016.106.041.204.076l.308.108.309.108.212.076c.096-.112.223-.206.38-.28.157-.075.337-.112.54-.112.133 0 .264.021.392.064a.97.97 0 01.336.188.907.907 0 01.233.316c.058.128.088.274.088.44a.941.941 0 01-.3.721.995.995 0 01-.328.196 1.19 1.19 0 01-.404.068c-.16 0-.306-.025-.436-.076a1.03 1.03 0 01-.569-.532 1.171 1.171 0 01-.1-.4l-1.04.248c.02.224.086.439.195.644.109.205.258.388.444.548.186.16.406.287.66.38.253.093.534.14.844.14.336 0 .636-.052.9-.156.264-.104.487-.245.672-.424.184-.179.325-.385.424-.62a1.91 1.91 0 00.148-.752c0-.3-.049-.566-.145-.801z`}
        />
      </svg>
    </StyledForward15Button>
  );
};

const NextButton: React.FC<NextButtonProps> = ({}) => {
  return (
    <StyledNextButton>
      <svg role="img" height="16" width="16" viewBox="0 0 16 16">
        <path d={`M11 3v4.119L3 2.5v11l8-4.619V13h2V3z`} />
      </svg>
    </StyledNextButton>
  );
};

const PlayerControlButtons = styled.div`
  margin-bottom: 12px;
  place-self: center;
  width: 100%;
  grid-template-columns: 2rem repeat(5, 1fr) 2rem;
  grid-template-rows: 1rem 1fr 1rem;
`;
export const PlayerControlContainer = styled.div`
  justify-content: center;
  place-self: center;
  width: 100%;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: 1fr;
  ${StyledBackButton} {
    grid-area: 2 / 2 / end2 / end2;
  }
  ${StyledBack15Button} {
    grid-area: 2 / 3 / end2 / end3;
  }
  ${StyledPlayPauseButton} {
    grid-area: 2 / 4 / end2 / end4;
  }
  ${StyledForward15Button} {
    grid-area: 2 / 5 / end2 / end5;
  }
  ${StyledNextButton} {
    grid-area: 2 / 6 / end2 / end6;
  }
`;
const PlaybackBar = styled.div`
  grid-template-columns: 3rem 1fr 3rem;
  align-self: center;
`;
const ProgressBarWrapper = styled.div`
  place-self: center;
  width: 100%;
`;
const ProgressTime = styled.div`
  font-size: 0.8rem;
  text-align: center;
  color: ${(p) => p.theme.colors.gray4};
`;

const PlayerControls: React.FC<PlayDetailsProps> = (props) => {
  const playing = props?.is_playing ?? false;
  return (
    <PlayerControlContainer>
      <PlayerControlButtons>
        <BackButton playPrev={() => {}} />
        <Back15 disabled={false} back15={() => {}} />
        <PlayPauseButton isPlaying={playing} play={() => {}} pause={() => {}} />
        <Forward15 disabled={false} advance15={() => {}} />
        <NextButton playNext={() => {}} />
      </PlayerControlButtons>
      <PlaybackBar>
        <ProgressTime>{`0:00`}</ProgressTime>
        <ProgressBarWrapper>
          <ProgressBar progress={0} setProgress={() => {}} />
        </ProgressBarWrapper>
        <ProgressTime>{`10:00`}</ProgressTime>
      </PlaybackBar>
    </PlayerControlContainer>
  );
};

export default PlayerControls;
