import styled from "styled-components";

export default styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  font-weight: 600;
  color: ${(p) => p.theme.colors.blue3};
  padding-bottom: 1rem;
  @media (max-width: 420px) {
    display: none;
  }
`;
