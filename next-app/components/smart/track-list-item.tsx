import { useContext } from "react";
import { FaPlus, FaPlay } from "react-icons/fa";

import { PlaylistContext } from "contexts/playlist";
import {
  TrackActionsContainer,
  TrackContainer,
  TrackDetailsContainer,
  AddSongButton,
} from "../track";
import StyledLI from "../li";
import { PlayerContext } from "contexts/web-playback";
import { play } from "./playback-api-calls";
import { AuthContext, SpotifyTokenType } from "pages/_app";

const TrackListItem: React.FC<TrackType> = (props) => {
  const { token } = useContext(AuthContext);
  const { addTrack } = useContext(PlaylistContext);
  const { playerInstance } = useContext(PlayerContext);

  return (
    <StyledLI>
      <TrackContainer>
        <TrackDetailsContainer>{props.name}</TrackDetailsContainer>
        <TrackActionsContainer>
          {addTrack && (
            <AddSongButton
              onClick={() => {
                addTrack(props);
              }}
            >
              <FaPlus></FaPlus>
            </AddSongButton>
          )}
          {playerInstance && (
            <AddSongButton
              onClick={() => {
                play({
                  spotify_uri: props.uri,
                  playerInstance,
                  token: token as SpotifyTokenType,
                });
              }}
            >
              <FaPlay></FaPlay>
            </AddSongButton>
          )}
        </TrackActionsContainer>
      </TrackContainer>
    </StyledLI>
  );
};

export default TrackListItem;
