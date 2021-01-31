import { createContext, useMemo, useState } from "react";
import { uniqBy } from "lodash";

export type PlaylistContextType = {
  playlist: PlaylistType | null;
  addTrack: ((track: TrackType, index?: number) => void) | null;
  removeTrack: ((id: string) => void) | null;
  insertTrack: ((rightIndex: number, track: TrackType) => void) | null;
};

export const PlaylistContext = createContext<PlaylistContextType>({
  playlist: null,
  addTrack: null,
  removeTrack: null,
  insertTrack: null,
});

export const PlaylistProvider: React.FC = ({ children }) => {
  const [playlist, setPlaylist] = useState<PlaylistType>([] as TrackType[]);

  const addTrack = (track: TrackType) => {
    setPlaylist(uniqBy(playlist.concat([track]), (item) => item.uri));
  };

  const removeTrack = (id: string) => {
    setPlaylist(playlist.filter((i) => i.id != id));
  };

  const insertTrack = (rightIndex: number, track: TrackType) => {
    setPlaylist(playlist.splice(rightIndex, 0, track));
  };

  const memoVal = useMemo(() => {
    return {
      playlist: playlist,
      addTrack: addTrack,
      removeTrack: removeTrack,
      insertTrack: insertTrack,
    };
  }, [playlist, addTrack, removeTrack, insertTrack]);

  return (
    <PlaylistContext.Provider value={memoVal}>
      {children}
    </PlaylistContext.Provider>
  );
};
