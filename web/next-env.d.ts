/// <reference types="next" />
/// <reference types="next/types/global" />

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
