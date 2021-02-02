import { PlaylistContext } from "contexts/playlist";
import { useContext } from "react";
import PlaylistItem from "./playlist-item";
import styled from "styled-components";
import UL from "./../ul";
import T from "./../typography";

const PlaylistContainer = styled.div`
  grid-area: 1 / 2 / 3 / 3;
  /*
  background: linear-gradient(
    176deg,
    ${(props) => props.theme.colors.green1} 0%,
    ${(props) => props.theme.colors.purple1} 35%,
    ${(props) => props.theme.colors.blue2} 100%
  );
  */
  display: grid;
  grid-template-rows: 1rem 6rem 1fr 2rem;
  grid-template-columns: 1rem 1fr 1rem;
  grid-row-gap: 1rem;
  overflow-y: hidden;
  overflow-x: hidden;
  ul {
    grid-area: 3 / 2 / 3 / 2;
    margin: 0;
  }
  h6 {
    font-weight: 100;
    font-size: 1.5rem;
    text-align: right;
    grid-area: 2 / 2/ 3/ 2;
    background-color: #FFF;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
export const Playlist: React.FC = ({}) => {
  const { playlist } = useContext(PlaylistContext);
  return (
    <PlaylistContainer>
      <T.h6>Playlist</T.h6>
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
