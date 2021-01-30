import styled from "styled-components";

const StyledLi = styled.li<{}>`
  background-color: ${(p) => p.theme.colors.gray6};
  margin: 0.2rem;
  height: 3rem;
`;

const PlaylistItem = ({ name }: TrackType & { index: number }) => {
  return (
    <StyledLi>
      <div>
        {name}
        <div></div>
      </div>
    </StyledLi>
  );
};

export default PlaylistItem;
