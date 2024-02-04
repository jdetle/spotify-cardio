import styled, { css } from "styled-components";

export default styled.input<{}>`
  ${(props) =>
    props.type === "search" &&
    css`
      height: 3rem;
      width: 30rem;
      font-size: 24;
      font-weight: 500;
      color: props.theme.colors.green3;
      border: 0.2rem solid props.theme.colors.green3;
    `}
`;
