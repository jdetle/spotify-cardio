import styled from "styled-components";

const StyledLi = styled.li<{}>`
  background-color: ${(p) => p.theme.colors.gray6};
  margin: 0.4rem;
  height: 3rem;
  border-radius: 0.2rem;
`;

const TrackContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0.1rem 0.3rem 0.1rem 0.3rem;
`;

const TrackListItem = ({ name }: TrackType) => {
  return (
    <StyledLi>
      <TrackContainer>
        {name}
        <div></div>
      </TrackContainer>
    </StyledLi>
  );
};

export default TrackListItem;
