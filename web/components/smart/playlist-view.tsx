import { PlaylistContext } from "contexts/playlist";
import { useContext } from "react";
import PlaylistItem from "./playlist-item";
import styled from "styled-components";
import UL from "./../ul";
import T from "./../typography";

const PlaylistContainer = styled.div`
  grid-area: 2 / 3/ 4 / 4;
  max-height: 600px;
  border-radius: 0.3rem;
  background: linear-gradient(
    176deg,
    ${(props) => props.theme.colors.green1} 0%,
    ${(props) => props.theme.colors.purple1} 35%,
    ${(props) => props.theme.colors.blue2} 100%
  );
  display: grid;
  grid-template-rows: 1rem 6rem 1fr 2rem;
  grid-template-columns: 1rem 1fr 1rem;
  grid-row-gap: 1rem;
  overflow-y: hidden;
  overflow-x: hidden;
  box-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.3);
  ul {
    grid-area: 3 / 2 / 3 / 2;
    margin: 0;
  }
  h3 {
    grid-area: 2 / 2/ 3/ 2;
    text-align: center;
    background: linear-gradient(
      126deg,
      ${(props) => props.theme.colors.green3} 10%,
      ${(props) => props.theme.colors.gray6} 33%,
      ${(props) => props.theme.colors.blue3} 73%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
export const Playlist: React.FC = ({}) => {
  const { playlist } = useContext(PlaylistContext);
  return (
    <PlaylistContainer>
      <T.h3>Playlist</T.h3>
      <UL>
        {playlist != null ? (
          playlist.map((track, index) => {
            return <PlaylistItem {...track} key={index} />;
          })
        ) : (
          <T.p>No playlist yet!</T.p>
        )}
      </UL>
    </PlaylistContainer>
  );
};

export default Playlist;
