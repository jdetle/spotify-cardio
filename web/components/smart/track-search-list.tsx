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
  grid-area: 2 / 2 / 4 / 3;
  max-height: 600px;
  border-radius: 0.3rem;
  background: linear-gradient(
    176deg,
    ${(props) => props.theme.colors.green1} 0%,
    ${(props) => props.theme.colors.purple2} 35%,
    ${(props) => props.theme.colors.blue3} 100%
  );
  display: grid;
  grid-template-rows: 1rem 6rem 1fr 2rem;
  grid-template-columns: 1rem 1fr 1rem;
  grid-row-gap: 1rem;
  overflow-y: hidden;
  overflow-x: hidden;
  box-shadow: 0.2rem 0.2rem 0.2rem rgba(0, 0, 0, 0.3);
  ul {
    grid-area: 3 / 2 / 3 / 2;
    margin: 0;
  }
  h3 {
    grid-area: 2 / 2/ 3/ 2;
    text-align: center;
    background: linear-gradient(
      126deg,
      ${(props) => props.theme.colors.blue3} 10%,
      ${(props) => props.theme.colors.gray6} 33%,
      ${(props) => props.theme.colors.blue3} 73%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
export const TrackSearchList: React.FC<{
  data: TracksSearchResponseType | null;
  error: Error | null;
  loading: boolean;
}> = ({ children }) => {
  return (
    <TrackSearchContainer>
      <T.h3>Results</T.h3>
      <UL>{children}</UL>
    </TrackSearchContainer>
  );
};

export default TrackSearchList;
