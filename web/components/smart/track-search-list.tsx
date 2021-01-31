import styled from "styled-components";

const StyledUL = styled.ul<{}>`
  list-style-type: none;
  margin: 0rem 1rem 0rem 1rem;
  max-height: 550px;
  border-radius: 0.3rem;
  grid-area: 2 / 2 / 4 / 3;
  padding: 0.5rem;
  overflow: hidden;
  overflow-y: scroll;
  background-color: ${(p) => p.theme.colors.gray3};
`;

export const TrackSearchList: React.FC<{
  data: TracksSearchResponseType | null;
  error: Error | null;
  loading: boolean;
}> = ({ children }) => {
  return <StyledUL>{children}</StyledUL>;
};

export default TrackSearchList;
