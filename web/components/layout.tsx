import styled from "styled-components";
import StyledFooter from "./footer";
import StyledHeader from "./header";
import T from "./typography";
import Head from "next/head";
import Link from "next/link";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr 50px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  height: 100%;
  width: 100%;

  .div2 {
  }
  .div3 {
  }
  header {
    grid-area: 1 / 1 / 2 / 2;
  }
  nav {
    margin-left: 1rem;
    grid-area: 2 / 1 / 3 / 2;
    font-size: 2rem;
    font-weight: 500;
    width: 100%;
    @media (max-width: 420px) {
      font-size: 1rem;
    }
  }
  main {
    grid-area: 2 / 1 / 3 / 2;
  }

  footer {
    grid-area: 3 / 1 / 4 / 2;
  }
`;

const LayoutWithChildren = ({ children, title = "spotify cardio" }) => {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
      </Head>
      <StyledHeader aria-label="Header containing links to Home" tabIndex={0}>
        <nav role="navigation">
          <Link href="/">
            <T.a aria-label={"Link to the home page"} tabIndex={0}>
              Home
            </T.a>
          </Link>
        </nav>
      </StyledHeader>
      <main>{children}</main>
      <StyledFooter role="contentinfo">
        {`All rights reserved: John Detlefs ${new Date().getFullYear()}`}
      </StyledFooter>
    </Layout>
  );
};
export default LayoutWithChildren;
