import { AuthContext } from "pages/_app";
import { createContext, useContext, useEffect, useState } from "react";
type PlayerState = {
  bitrate: number;
  context: { uri: string | null; metadata: unknown };
  disallows: { resuming: boolean; skipping_prev: boolean };
  duration: number;
  paused: boolean;
  position: number;
  repeat_mode: number;
  restrictions: {
    disallow_resuming_reasons: Array<unknown>;
    disallow_skipping_prev_reasons: Array<unknown>;
  };
  shuffle: boolean;
  timestamp: number;
  track_window: {
    current_track: TrackType;
    next_tracks: Array<unknown>;
    previous_tracks: Array<unknown>;
  };
};
type PlayerContextType = {
  player: PlayerInstance | null;
  playerState: PlayerState | null;
};

export const PlayerContext = createContext<PlayerContextType>({
  player: null,
  playerState: null,
});
const PlaybackEnabler: React.FC = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const [playerInstance, setPlayer] = useState<PlayerInstance | null>(null);
  useEffect(() => {
    if (token) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        // @ts-ignore
        const player = new (Spotify as Spotify).Player({
          name: "Spotify Cardio",
          getOAuthToken: (cb) => {
            cb(token.access_token, token);
          },
        });

        // Error handling
        player.addListener("initialization_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("authentication_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("account_error", ({ message }) => {
          console.error(message);
        });
        player.addListener("playback_error", ({ message }) => {
          console.error(message);
        });

        // Playback status updates
        player.addListener("player_state_changed", (state) => {
          setPlayerState(state as PlayerState);
          console.log(state);
        });

        // Ready
        player.addListener("ready", ({ device_id }) => {
          console.log("Ready with Device ID", device_id);
        });

        // Not Ready
        player.addListener("not_ready", ({ device_id }) => {
          console.log("Device ID has gone offline", device_id);
        });

        // Connect to the player!
        player.connect();
        setPlayer(player);
      };
    }
  }, [token]);

  return (
    <PlayerContext.Provider value={{ player: playerInstance, playerState }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlaybackEnabler;
