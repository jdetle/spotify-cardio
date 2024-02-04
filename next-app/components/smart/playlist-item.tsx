import { useContext } from "react";
import { FaPlus } from "react-icons/fa";

import {
  TrackActionsContainer,
  TrackContainer,
  TrackDetailsContainer,
  AddSongButton,
} from "../track";
import StyledLI from "../li";
import { PlaylistContext } from "contexts/playlist";

const PlaylistItem: React.FC<TrackType> = (props) => {
  const { addTrack } = useContext(PlaylistContext);
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
        </TrackActionsContainer>
      </TrackContainer>
    </StyledLI>
  );
};

export default PlaylistItem;
