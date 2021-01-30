import styled from "styled-components";

const PlaybarContainer = styled.div`
  grid-area: 4 / 2 / 5 / 4;
  border-radius: 0.3rem;
  background-color: ${(p) => p.theme.colors.gray6};
`;
const Playbar: React.FC = ({}) => {
  return <PlaybarContainer />;
};

export default Playbar;
