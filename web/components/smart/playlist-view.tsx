import { PlaylistContext } from "contexts/playlist";
import { useContext } from "react";
import PlaylistItem from "./playlist-item";
import styled from "styled-components";

const StyledUL = styled.ul<{}>`
  list-style-type: none;
  border-radius: 0.3rem;
  max-height: 550px;
  grid-area: 2 / 3 / 4 / 4;
  margin: 0rem 1rem 0rem 1rem;
  padding: 0.5rem;
  overflow: hidden;
  overflow-y: scroll;
  background-color: ${(p) => p.theme.colors.gray3};
`;

export const Playlist: React.FC = ({}) => {
  const { playlist } = useContext(PlaylistContext);
  if (playlist) {
    return (
      <StyledUL>
        {playlist?.map((track, index) => {
          return <PlaylistItem {...track} key={index} />;
        })}
      </StyledUL>
    );
  }
  return <StyledUL></StyledUL>;
};

export default Playlist;
