import axios from "axios";
import { POKEMON_BASE_URL } from "@/utils/constant";
import { IPokemonListRespose } from "@/interface/pokemonList";
import { handleResponse, IResponse } from "@/utils/handleResponse";

interface IGetPokemonListResponse extends IResponse {
  status: number | undefined;
  data?: IPokemonListRespose;
}

export const pokemonListServices = {
  getPokemonList: async (
    limit?: number,
    offset?: number
  ): Promise<IGetPokemonListResponse> => {
    try {
      const response = await axios.get(
        `${POKEMON_BASE_URL}/pokemon?limit=${limit || 115}&offset=${
          offset || 0
        }`
      );
      return handleResponse.success(response);
    } catch (error: any) {
      return handleResponse.error(error);
    }
  },
};
