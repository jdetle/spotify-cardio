import { AuthContext } from "pages/_app";
import { useRef } from "react";
import { createContext, useContext, useEffect, useState } from "react";

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
  const playerRef = useRef<PlayerInstance | null>(null);
  useEffect(() => {
    console.log(playerRef.current, token);
    if (token && playerRef.current == null) {
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
        console.log(player);
        playerRef.current = player;
      };
    }
  }, [token, playerRef]);

  useEffect(() => {
    let isSubbed = true;
    if (playerRef.current && isSubbed) {
      playerRef.current
        .getCurrentState()
        .then((state) => {
          setPlayerState(state);
        })
        .catch(console.error);
    }
    const timerId = setInterval(() => {
      if (playerRef.current && isSubbed) {
        playerRef.current
          ?.getCurrentState()
          .then((state) => {
            setPlayerState(state);
          })
          .catch(console.error);
      }
    }, 2000);
    return () => {
      isSubbed = false;
      clearInterval(timerId);
    };
  }, [playerRef.current, token]);
  console.log(playerState);
  return (
    <PlayerContext.Provider value={{ player: playerRef.current, playerState }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlaybackEnabler;
