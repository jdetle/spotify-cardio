import styled from "styled-components";

const StyledLI = styled.li<{}>`
  background-color: ${(p) => p.theme.colors.gray6};
  margin: 0.4rem;
  height: 4rem;
  border-radius: 0.2rem;
`;

export default StyledLI;
