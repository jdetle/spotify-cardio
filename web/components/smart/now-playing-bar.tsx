import styled from "styled-components";

const ContentInfo = styled.div`
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  -webkit-transform: translateX(0);
  transform: translateX(0);
  -webkit-transition: -webkit-transform 0.25s cubic-bezier(0.3, 0, 0, 1);
  transition: -webkit-transform 0.25s cubic-bezier(0.3, 0, 0, 1);
  transition: transform 0.25s cubic-bezier(0.3, 0, 0, 1);
  transition: transform 0.25s cubic-bezier(0.3, 0, 0, 1),
    -webkit-transform 0.25s cubic-bezier(0.3, 0, 0, 1);
`;

const NowPlayingCoverArt = styled.div`
  box-shadow: 0 0 10px rgb(0 0 0 / 30%);
  margin: 0;
  display: block;
  border: 0;
  position: relative;
  z-index: 0;
  background-color: #282828;
`;

const CoverArtImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: 50%;
  background-color: #000;
  background-repeat: no-repeat;
  border-radius: 4px;
`;

export const NowPlaying = () => {
  return (
    <div>
      <ContentInfo>
        <NowPlayingCoverArt>
          <CoverArtImage></CoverArtImage>
        </NowPlayingCoverArt>
      </ContentInfo>
    </div>
  );
};

export default NowPlaying;
