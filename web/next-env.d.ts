/// <reference types="next" />
/// <reference types="next/types/global" />
type TracksSearchResponseType = {
  tracks: {
    href: string;
    items: Array<TrackType>;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
  };
};
type AlbumType = {
  album_type: string;
  artists: Array<ArtistType>;
  available_markets: Array<string>;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: Array<{ height: number; url: string; width: number }>;
  name: string;
  // YYYY-MM-DD
  release_date: string;
  release_date_precision: string;
};
type ArtistType = unknown;
type ItemType = "album" | "artist" | "playlist" | "track" | "show" | "episode";
type TrackType = {
  album: AlbumType;
  artists: ArtistType;
  name: string;
  disc_number: number;
  duration_ms: number;
  explicit: false;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: Boolean;
  is_playable: Boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: 5;
  type: "track";
  uri: string;
};

type PlaylistType = Array<TrackType>;

type PlayerConfig = {
  name: string;
  getOAuthToken: (cb) => void;
  volume: number;
};
type PlayerInstance = {
  connect: () => void;
  disconnect: () => void;
  addListener: () => void;
  removeListener: () => void;
  getCurrentState: () => void;
  setName: () => void;
  getVolume: () => void;
  setVolume: () => void;
  pause: () => void;
  resume: () => void;
  togglePlay: () => void;
  seek: () => void;
  previousTrack: () => void;
  _options: any;
  _id: any;
};

interface Spotify {
  Player: (obj: PlayerConfig) => PlayerInstance;
}

interface Window extends Window {
  onSpotifyWebPlaybackSDKReady: () => void;
}
