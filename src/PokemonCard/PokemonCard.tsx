import React from "react";
import { Type } from "@/interface/pokemonDetail";
import { Link } from "react-router-dom";

interface PokemonCardProps {
  image: string;
  name: string;
  id: number;
  types: Type[];
}

const PokemonCard = ({ image, name, id, types }: PokemonCardProps) => {
  return (
    <div className="max-w-sm  bg-white  rounded-[20px] overflow-hidden shadow dark:border-gray-700 p-[10px] ">
      <div className="bg-center bg-[url('/public\images\poke-card-bg.png')] rounded-[20px] bg-cover">
        <Link to={`/detail/${name}`}>
          <img
            className="p-[30px] w-full rounded-[20px] overflow-hidden  max-h-[218px] aspect-square"
            src={image}
            alt=""
          />
        </Link>
      </div>
      <div className="py-[10px] px-[10px]">
        <div className="flex justify-between">
          <h5 className="capitalize text-xl font-bold tracking-tight text-gray-900 ">
            {name}
          </h5>
          <h5 className="m text-xl font-bold tracking-tight text-gray-900 ">
            #{id}
          </h5>
        </div>
        <div className="flex gap-2 justify-end">
          {types.map((item, index) => {
            return (
              <span
                key={index}
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
