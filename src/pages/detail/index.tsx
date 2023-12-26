import PokemonCard from "@/PokemonCard";
import { IPokemonDetailRespose } from "@/interface/pokemonDetail";
import { pokemonDetailServices, pokemonListServices } from "@/service";
import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";

type pokemonType = {
  data: IPokemonDetailRespose | undefined;
  loading: boolean;
  error: null | any;
};

const DetailPage = () => {
  const { name } = useParams();

  const [pokemon, setPokemon] = useState<pokemonType>({
    data: undefined,
    loading: true,
    error: null,
  });

  const callData = async (name: string) => {
    const response = await pokemonDetailServices.getPokemonDetail(name);
    if (response.status === 200) {
      setPokemon({ data: response.data, loading: false, error: null });
    } else {
      setPokemon({
        data: undefined,
        loading: false,
        error: response.error,
      });
    }
  };

  useEffect(() => {
    if (name) callData(name);
  }, [name]);

  return (
    <div className=" w-[90%] m-[auto] max-w-[1100px]">
      <div className="flex justify-center ">
        <img
          src="/public\images\logo.webp"
          alt="pokedek-logo"
          className="max-h-[80px] mt-[20px] "
        />
      </div>

      <div className="w-[90%] max-w-[600px] m-auto">
        {/* {pokemon.data && (
          <PokemonCard
            image={pokemon.data?.image || ""}
            name={pokemon.data?.name}
            id={pokemon.data?.id}
            types={pokemon.data?.types}
          />
        )} */}
      </div>
    </div>
  );
};

export default DetailPage;
