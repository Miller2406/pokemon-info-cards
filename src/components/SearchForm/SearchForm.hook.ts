import { useEffect } from "react";
import { pokemonListServices, pokemonDetailServices } from "@/service";
import { usePokemonListStore } from "@/store/pokemonList";
import { useForm } from "react-hook-form";

const useSearchForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { setFetchPokemonList, fetchPokemon, setPokemonList } =
    usePokemonListStore();
  const keyword = watch("keyword");

  const callData = async () => {
    const responseList = await pokemonListServices.getPokemonList();
    const pokeList = [];

    if (responseList.status === 200) {
      const responseResults = responseList.data?.results || [];
      setFetchPokemonList({ data: [], loading: true, error: null });
      for (const pokemon of responseResults) {
        const response = await pokemonDetailServices.getPokemonDetail(
          pokemon.name
        );
        const pokeData = response.data;
        if (pokeData)
          pokeList.push({
            ...pokeData,
            image:
              pokeData.sprites.other.dream_world.front_default ||
              pokeData.sprites.other["official-artwork"].front_default,
          });
      }
      setFetchPokemonList({ data: pokeList, loading: false, error: null });
      setPokemonList({ data: pokeList, loading: false, error: null });
    } else {
      setFetchPokemonList({
        data: [],
        loading: false,
        error: responseList.error,
      });
    }
  };

  useEffect(() => {
    callData();
  }, []);

  useEffect(() => {
    const data = fetchPokemon.data.filter((item) =>
      item.name.toLowerCase().includes(keyword?.toLowerCase())
    );
    setPokemonList({
      data: data,
      loading: false,
      error: null,
    });
  }, [keyword]);

  return {
    fieldKeyword: register("keyword"),
  };
};

export { useSearchForm };
