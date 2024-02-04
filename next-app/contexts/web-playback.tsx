import { AuthContext } from "pages/_app";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type PlayerContextType = {
  playerInstance: PlayerInstance | null;
  playerActive: boolean;
  setPlayerActive: Dispatch<SetStateAction<boolean>>;
};

export const PlayerContext = createContext<PlayerContextType>({
  playerInstance: null,
  playerActive: false,
  setPlayerActive: () => {},
});
const PlaybackEnabler: React.FC = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [playerInstance, setPlayerInstance] = useState<PlayerInstance | null>(
    null
  );
  const [playerActive, setPlayerActive] = useState<boolean>(false);

  useEffect(() => {
    if (playerInstance == null) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        // @ts-ignore
        const player = new (Spotify as Spotify).Player({
          name: "Spotify Cardio",
          getOAuthToken: async (cb) => {
            if (token == null) {
              const stringifiedToken = localStorage?.getItem("spotify-token");
              if (stringifiedToken && stringifiedToken != "null") {
                const token = JSON.parse(stringifiedToken);
                cb(token.access_token, token);
              }
            } else {
              cb(token.access_token, token);
            }
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
          if (playerActive == state.paused) {
            console.log(playerActive, state);
            setPlayerActive(true);
          }
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
        player
          .connect()
          .then((success, err) => {
            console.log("Connection success");
            if (player && success) {
              setPlayerInstance(player);
            } else {
              console.error(err);
            }
          })
          .catch(console.error);
      };
    }
  }, [playerInstance, token]);

  return (
    <PlayerContext.Provider
      value={{ playerInstance, playerActive, setPlayerActive }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlaybackEnabler;
