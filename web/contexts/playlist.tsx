import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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

const PlaylistEnabler: React.FC = ({ children }) => {
  const [playlist, setPlaylist] = useState<PlaylistType>([] as TrackType[]);

  const addTrack = useCallback((track: TrackType) => {
    setPlaylist(playlist.concat([track]));
  }, []);

  const removeTrack = useCallback((id: string) => {
    setPlaylist(playlist.filter((i) => i.id != id));
  }, []);

  const insertTrack = useCallback((rightIndex: number, track: TrackType) => {
    setPlaylist(playlist.splice(rightIndex, 0, track));
  }, []);

  const memoVal = useMemo(() => {
    return {
      playlist: playlist,
      addTrack: addTrack,
      removeTrack: removeTrack,
      insertTrack: insertTrack,
    };
  }, []);

  return (
    <PlaylistContext.Provider value={memoVal}>
      {children}
    </PlaylistContext.Provider>
  );
};
