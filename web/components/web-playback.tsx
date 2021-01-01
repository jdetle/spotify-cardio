import { AuthContext } from "pages/_app";
import { createContext, useContext, useEffect, useState } from "react";

type PlayerContextType = {
  player: PlayerInstance | null;
};

export const PlayerContext = createContext<PlayerContextType>({ player: null });
const PlaybackEnabler: React.FC = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [playerInstance, setPlayer] = useState<PlayerInstance | null>(null);
  useEffect(() => {
    console.log("token in player", token);
    if (token) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        // @ts-ignore
        const player = new (Spotify as Spotify).Player({
          name: "Spotify Cardio",
          getOAuthToken: (cb) => {
            console.log("player calling for oauth token");
            cb(token?.access_token);
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
    <PlayerContext.Provider value={{ player: playerInstance }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlaybackEnabler;
