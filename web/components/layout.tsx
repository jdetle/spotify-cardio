import styled from "styled-components";
import StyledFooter from "./footer";
import StyledHeader from "./header";
import Head from "next/head";
import { AuthContext } from "pages/_app";
import { useContext } from "react";

export const SearchContainer = styled.section`
  width: 100%;
  padding: 0.5rem;
  background: linear-gradient(
    0deg,
    ${(p) => p.theme.colors.gray1} 0%,
    ${(p) => p.theme.colors.gray2} 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: 1 / 1 / 1 / 1;
  label {
    font-weight: 500;
    margin: 0px 10px 0px 10px;
  }
  input {
    letter-spacing: -0.1em;
    height: 5rem;
    border-radius: 0.25rem;
    font-size: 3rem;
    font-weight: 800;
    color: ${(p) => p.theme.colors.green1};
    border: none;
    margin: 0px 10px 0px 10px;
  }
`;
export const DataContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-row-gap: 1rem;
`;
export const SearchResultsContainer = styled.div`
  grid-area: 1 / 1 / 1 / 2;
`;
export const PlaylistContainer = styled.div`
  grid-area: 1 / 2 / 2 / 2;
`;
const AuthLayout = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-rows: 1fr 90px;
  grid-template-columns: 235px 1fr;

  header {
    grid-area: 1 / 1 / 2 / 2;
  }
  nav {
    background-color: #000;
    grid-area: 1 / 1 / 2 / 2;
    font-size: 2rem;
    font-weight: 500;
    width: 100%;
    @media (max-width: 420px) {
      font-size: 1rem;
    }
  }
  main {
    grid-area: 1 / 2 / 2 / 2;
    display: grid;
    grid-template-rows: 1fr 3fr;
    background-color: ${(p) => p.theme.colors.gray1};
    height: 100%;
    width: 100%;

    ${SearchContainer} {
      height: 100%;
      width: 100%;
      grid-area: 1 / 1 / 2 / 1;
    }
    ${DataContainer} {
      height: 100%;
      width: 100%;
      grid-area: 2 / 1 / 3 / 1;
    }
  }

  footer {
    height: 100%;
    width: 100%;
    grid-area: 2 / 1 / 3 / 3;
    display: grid;
    background: linear-gradient(
      20deg,
      ${(props) => props.theme.colors.gray1} 0%,
      ${(props) => props.theme.colors.gray2} 100%
    );
  }
`;

const UnAuthLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr 50px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  height: 100%;
  width: 100%;

  header {
    grid-area: 1 / 1 / 2 / 1;
  }
  nav {
    margin-left: 1rem;
    grid-area: 1/ 1 / 1 / 2;
    font-size: 2rem;
    font-weight: 500;
    width: 100%;
    @media (max-width: 420px) {
      font-size: 1rem;
    }
  }
  section {
    grid-area: 2 / 1 / 3 / 2;
  }

  footer {
    grid-area: 3 / 1 / 4 / 2;
  }
`;

const LayoutWithChildren = ({ children, title = "spotify cardio" }) => {
  const { token } = useContext(AuthContext);

  return token == null || Boolean(token && token?.error) ? (
    <UnAuthLayout>
      <Head>
        <title>{title}</title>
      </Head>
      <StyledHeader
        aria-label="Header containing links to Home"
        tabIndex={0}
      ></StyledHeader>
      <main>{children}</main>
      <StyledFooter role="contentinfo">
        {`All rights reserved: John Detlefs ${new Date().getFullYear()}`}
      </StyledFooter>
    </UnAuthLayout>
  ) : (
    <AuthLayout>{children}</AuthLayout>
  );
};
export default LayoutWithChildren;
