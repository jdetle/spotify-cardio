import styled from "styled-components";

export default styled.li<{}>`
  background-color: ${(p) => p.theme.colors.gray2};
  margin: 0.2rem;
  height: 3rem;
`;
