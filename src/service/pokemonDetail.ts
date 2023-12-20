import axios from "axios";
import { POKEMON_BASE_URL } from "@/utils/constant";
import { IPokemonDetailRespose } from "@/interface/pokemonDetail";

interface IGetPokemonDetailResponse {
  status: number | undefined;
  data: IPokemonDetailRespose;
}

export const pokemonDetailService = {
  getPokemonDetail: async (
    name: string
  ): Promise<IGetPokemonDetailResponse> => {
    const response = await axios.get(`${POKEMON_BASE_URL}/pokemon/${name}`);
    return response;
  },
};
