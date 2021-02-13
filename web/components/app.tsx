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
html, body {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: spotify-circular,spotify-circular-cyrillic,spotify-circular-arabic,spotify-circular-hebrew,Helvetica Neue,helvetica,arial,Hiragino Kaku Gothic Pro,Meiryo,MS Gothic,sans-serif;
  overflow: hidden;
  height: 100%;
  background-color: #000;
}
body *,
body ::before,
body ::after {
  letter-spacing: -0.1em;
  display: grid;
  box-sizing: border-box;
  margin: 0;
  position: relative;
  overflow-wrap: break-word;
  min-width: 0;
}

img {
  max-width: 100%;
  display: block;
}

input,
button,
textarea,
select {
  font: inherit;
}

ul[role="list"],
ol[role="list"] {
  list-style: none;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

#__NEXT_DATA__ {
  display: none;
}
#__next {
  height: 100%;  
  background-color: #000;
  overflow: hidden;
}




`;

const App = (props) => {
  return (
    <>
      <GlobalStyles />
      <StyledApp {...props}>{props.children}</StyledApp>
    </>
  );
};

export { App, StyledApp };
