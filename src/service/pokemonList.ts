import axios from "axios";
import { POKEMON_BASE_URL } from "@/utils/constant";
import { IPokemonListRespose } from "@/interface/pokemonList";

interface IGetPokemonListResponse {
  status: number | undefined;
  data: IPokemonListRespose;
}

export const pokemonListService = {
  getPokemonList: async (
    limit?: number,
    offset?: number
  ): Promise<IGetPokemonListResponse> => {
    const response = await axios.get(
      `${POKEMON_BASE_URL}/pokemon?limit=${limit || 115}&offset=${offset || 0}`
    );
    return response;
  },
};
