import React from "react";
import { IPokemonDetailRespose } from "@/interface/pokemonDetail";

interface PokemonCardProps {
  data: IPokemonDetailRespose;
}

const PokemonCard = ({ data }: PokemonCardProps) => {
  return (
    <div className="max-w-sm  bg-white  rounded-[20px] overflow-hidden shadow dark:border-gray-700 p-[10px] ">
      <div className="bg-center bg-[url('/public\images\poke-card-bg.png')] aspect-square max-h-[218px] max-w-[218px] rounded-[20px]">
        <a href="#">
          <img
            className="p-[30px] w-full aspect-square max-h-[218px] max-w-[218px] rounded-[20px] overflow-hidden"
            src={data.image}
            alt=""
          />
        </a>
      </div>
      <div className="py-[10px] px-[10px]">
        <div className="flex justify-between">
          <h5 className="capitalize text-xl font-bold tracking-tight text-gray-900 ">
            {data.name}
          </h5>
          <h5 className="m text-xl font-bold tracking-tight text-gray-900 ">
            #{data.id}
          </h5>
        </div>
        <div className="flex gap-2 justify-end">
          {data.types.map((item) => {
            return (
              <span
                className={`badge-type-${item.type.name} px-2 py-0.5 text-sm mt-2 capitalize rounded-lg`}
              >
                {item.type.name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
