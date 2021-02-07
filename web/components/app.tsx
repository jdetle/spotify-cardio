import { normalize } from "polished";
import React from "react";
import styled, { createGlobalStyle } from "styled-components";

const StyledApp = styled.div`
  height: 100%;
  color: ${(props) => {
    return props.theme.colors.green1;
  }};
  background: ${(props) => props.theme.colors.gray1};

  overflow-x: hidden;
  overflow-y: hidden;
  video,
  img {
    display: block;
    max-width: 100%;
  }
  #index_title {
    color: ${(p) => p.theme.colors.green3};
    margin-bottom: 50px;
    letter-spacing: -0.1rem;
    font-size: 104px;
    font-weight: 900;
    text-align: center;
    z-index: 1;
    padding: 0;
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
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: spotify-circular,spotify-circular-cyrillic,spotify-circular-arabic,spotify-circular-hebrew,Helvetica Neue,helvetica,arial,Hiragino Kaku Gothic Pro,Meiryo,MS Gothic,sans-serif;
  overflow: hidden;
  margin: 0;
  height: 100%;
  background-color: #000;
  letter-spacing: -0.1em;
}
#__next {
  height: 100%;  
  background-color: #000;
  overflow: hidden;
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
