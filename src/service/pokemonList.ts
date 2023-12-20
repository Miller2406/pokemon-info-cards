import axios from "axios";
import POKEMON_BASE_URL from "@/utils/constant";

export const pokemonListService = {
  getPokemonList: async (limit?: number, offset?: number) => {
    await axios.get(
      `${POKEMON_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    );
  },
};
