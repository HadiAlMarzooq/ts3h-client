export type Episode = {
  trackId: number;
  trackName: string;
  artistName: string;
  description?: string;
  releaseDate?: string;
  trackTimeMillis?: number;
  artworkUrl160: string;
  trackViewUrl: string;
};

export type Track = {
  trackId: number;
  trackName: string;
  artistName: string;
  artworkUrl100: string;
  trackViewUrl: string;
};

export type Podcast = {
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl600: string;
  feedUrl: string;
};

export type SearchResults = {
  episodes: Episode[];
  tracks: Track[];
  podcasts: Podcast[];
};
export type SearchState = {
  term: string;
  results: SearchResults;
  loading: boolean;
  error: string | null;
};
export type ViewState = "initial" | "results";
export type SearchAction =
  | { type: "SET_TERM"; payload: string }
  | { type: "SET_RESULTS"; payload: SearchResults }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "RESET" };
