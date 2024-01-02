import { IPokemonDetailRespose } from "@/interface/pokemonDetail";
import { pokemonDetailServices } from "@/service";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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
      if (response.data)
        setPokemon({
          data: {
            ...response.data,
            image:
              response.data.sprites.other.dream_world.front_default ||
              response.data.sprites.other["official-artwork"].front_default,
          },
          loading: false,
          error: null,
        });
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
          src="/images/logo.webp"
          alt="pokedek-logo"
          className="max-h-[80px] mt-[20px] "
        />
      </div>

      <div className="m-x-auto translate-y-[-50px]">
        <Link
          to={"/"}
          className="text-white bg-[#1247aa4d] w-[60px] text-center rounded-xl px-3 pb-1 font-semibold absolute translate-y-[-30px]"
        >
          {`<`}
        </Link>
        {pokemon.data && (
          <div className="m-auto max-w-sm rounded-[20px] overflow-hidden shadow dark:border-gray-700 p-[10px] ">
            <div className=" bg-center rounded-[20px] bg-cover relative">
              <div>
                <img
                  className="w-full overflow-hidden aspect-square absolute"
                  src="/public\images\pokemon_bg.png"
                  alt=""
                />
                <img
                  className="p-[80px] w-full rounded-[20px] overflow-hidden relative aspect-square"
                  src={pokemon.data.image}
                  alt=""
                />
              </div>
            </div>
            <div className="translate-y-[-10px] py-[10px] px-[10px] bg-[#152e4756]  text-white rounded-md mt-4">
              <div className="flex justify-between">
                <h5 className="capitalize text-xl font-bold tracking-tight  ">
                  {name}
                </h5>
                <h5 className="m text-xl font-bold tracking-tight ">
                  #{pokemon.data.id}
                </h5>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                <div>
                  <div className="flex gap-x-[10px] font-semibold justify-between pr-[20px]">
                    <div>Height</div>
                    <div>{pokemon.data.height / 10} m</div>
                  </div>
                  <div className="flex gap-x-[10px] font-semibold justify-between pr-[20px]">
                    <div>Weight</div>
                    <div>{pokemon.data.weight / 10} kg</div>
                  </div>
                </div>

                <div className="text-end mt-1 capitalize">
                  {pokemon.data.types.map((item, index) => {
                    return (
                      <span
                        key={index}
                        className={` badge-type-${item.type.name} ml-2 px-2 py-0.5 text-sm rounded-lg text-black`}
                      >
                        {item.type.name}
                      </span>
                    );
                  })}
                </div>
                <div className="mt-[20px] font-semibold bg-[#284d935b] rounded-xl px-2 pt-1 pb-4 ">
                  <h5>Abilities</h5>
                  {pokemon.data.abilities.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={`capitalize bg-[#4caeeb75] rounded-2xl mt-1 mx-4 font-normal text-center`}
                      >
                        {item.ability.name}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-[20px] font-semibold bg-[#284d935b] rounded-lg px-2 pt-1 pb-4 ">
                  <h5>Stats</h5>
                  {pokemon.data.stats.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="flex justify-between ml-1 mr-0.5"
                      >
                        <div className="flex gap-x-[10px] capitalize font-light justify-between ">
                          <div>{item.stat.name}</div>
                        </div>
                        <div className="flex gap-x-[10px] font-thin justify-between ">
                          <div>{item.base_stat}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
