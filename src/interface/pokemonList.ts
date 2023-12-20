export interface IPokemonListRespose {
  count: number;
  next: string;
  previous: null;
  results: IPokemonListItem[];
}

export interface IPokemonListItem {
  name: string;
  url: string;
}
