import { normalize } from "polished";
import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const StyledApp = styled.div`
  height: 100%;
  color: ${(props) => {
    return props.theme.green1;
  }};
  background: ${(props) => props.theme.gray6};
  background: linear-gradient(
    176deg,
    rgba(215, 215, 215, 1) 0%,
    rgba(232, 232, 235, 1) 35%,
    rgba(210, 213, 210, 1) 100%
  );
  overflow-x: hidden;
  video,
  img {
    display: block;
    max-width: 100%;
  }
  #index_title {
    font-size: 14rem;
    font-weight: 900;
    text-align: center;
    z-index: 1;
    padding: 0;
    overflow: hidden;
    @media (max-width: 420px) {
      font-size: 7rem;
      margin-top: 4rem;
      :hover,
      :active,
      :focus {
        font-size: 7rem;
      }
    }
  }
`;

const GlobalStyles = createGlobalStyle`
${normalize()};
*{
box-sizing: border-box;
}
html, body{
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  overflow: hidden;
  margin: 0;
  height: 100%;
}
#__next {
  height: 100%
}`;

const App = (props) => {
  return (
    <>
      <GlobalStyles />
      <StyledApp {...props}>{props.children}</StyledApp>
    </>
  );
};

export { App, StyledApp };
