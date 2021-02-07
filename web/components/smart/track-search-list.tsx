import styled from "styled-components";
import T from "./../typography";
import UL from "./../ul";
/*
export type TokenTypes = MergeExclusive<
  MergeExclusive<SpotifyErrorTokenType, SpotifyTokenType>,
  null
>;

export const AuthContext = React.createContext<{
  authState: string;
  setVerifier: (str: string) => void;
  setAuthState: (str: string) => void;
  verifier: string;
  token: TokenTypes;
  setToken: (token: TokenTypes) => void;
}>({
  authState: "",
  setVerifier: () => null,
  setAuthState: () => null,
  verifier: "",
  token: null,
  setToken: () => null,
});

const FIGMA_PALETTE = {
  gray1: "#191414",
  gray2: "#4F4f4F",
  gray3: "#828282",
  gray4: "#BDBDBD",
  gray5: "#E0E0E0",
  gray6: "#F2F2F2",
  red: "#EB5757",
  orange: "#F2994A",
  yellow: "#F2C94C",
  green1: "#1AB26B",
  green2: "#27AE60",
  green3: "#1ED760",
  blue1: "#2F80ED",
  blue2: "#2D9CDB",
  blue3: "#56CCF2",
  purple1: "#9B51E0",
  purple2: "#BB6BD9",
};
*/
const TrackSearchContainer = styled.div`
  height: 100%;
  max-height: 600px;
  border-radius: 0.3rem;
  /*
  background: linear-gradient(
    176deg,
    ${(props) => props.theme.colors.green1} 0%,
    ${(props) => props.theme.colors.purple2} 35%,
    ${(props) => props.theme.colors.blue3} 100%
  );
  */
  display: grid;
  grid-template-rows: 1rem 6rem 1fr 2rem;
  grid-template-columns: 1rem 1fr 1rem;
  grid-row-gap: 1rem;
  overflow-y: hidden;
  overflow-x: hidden;
  ul {
    grid-area: 3 / 2 / 3 / 2;
    margin: 0;
  }
  h6 {
    grid-area: 2 / 2/ 3/ 2;
    background-color: #FFF;
    font-weight: 100;
    font-size: 1.5rem;
    text-align: right;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
export const TrackSearchList: React.FC = ({ children }) => {
  return (
    <TrackSearchContainer>
      <T.h6>Results</T.h6>
      <UL>{children}</UL>
    </TrackSearchContainer>
  );
};

export default TrackSearchList;
