import { useEffect } from "react";
import { pokemonListServices, pokemonDetailServices } from "@/service";
import { usePokemonListStore } from "@/store/pokemonList";
import { useForm } from "react-hook-form";
import { generationList, sortList, typesList } from "@/utils/optionList";
import { IPokemonDetailRespose } from "@/interface/pokemonDetail";

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
  const generation = watch("generation");
  const types = watch("types");
  const sort = watch("sort");

  const callData = async (filter: {
    name: string;
    limit: number;
    offset: number;
  }) => {
    setFetchPokemonList({ data: [], loading: true, error: null });
    const responseList = await pokemonListServices.getPokemonList(
      filter.limit,
      filter.offset
    );
    const pokeList = [];

    if (responseList.status === 200) {
      const responseResults = responseList.data?.results || [];
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
      const data = filterPokemon(pokeList, keyword, types, sort);
      setPokemonList({ data: data, loading: false, error: null });
    } else {
      setFetchPokemonList({
        data: [],
        loading: false,
        error: responseList.error,
      });
    }
  };

  const filterPokemon = (
    fetchPokemon: IPokemonDetailRespose[],
    keyword: string,
    types: number,
    sort: number
  ) => {
    const keywordFilter = fetchPokemon.filter((item) =>
      item.name.toLowerCase().includes(keyword?.toLowerCase())
    );
    const typesFilter =
      typesList[types] !== "all types"
        ? keywordFilter.filter((item) =>
            item.types.find((f) =>
              f.type.name.toLowerCase().includes(typesList[types].toLowerCase())
            )
          )
        : keywordFilter;
    return sortBy(typesFilter, sortList[sort]);
  };

  const sortBy = (data: IPokemonDetailRespose[], sort: string) => {
    switch (sort) {
      case "id":
        return data.sort((a, b) => a.id - b.id);
      case "name":
        return data.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
      default:
        return data.sort((a, b) => a.id - b.id);
    }
  };

  useEffect(() => {
    if (generation !== undefined) {
      callData(generationList[generation]);
    }
  }, [generation]);

  useEffect(() => {
    const data = filterPokemon(fetchPokemon.data, keyword, types, sort);
    setPokemonList({
      data: data,
      loading: false,
      error: null,
    });
  }, [keyword, types, sort]);

  return {
    fieldKeyword: register("keyword"),
    fieldGeneration: register("generation"),
    fieldTypes: register("types"),
    fieldSort: register("sort"),
  };
};

export { useSearchForm };
