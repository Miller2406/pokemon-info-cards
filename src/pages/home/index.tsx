import PokemonCard from "@/PokemonCard";
import SearchForm from "@/components/SearchForm";
import { usePokemonListStore } from "@/store/pokemonList";
import ReactLoading from "react-loading";

const HomePage = () => {
  const { pokemon, fetchPokemon } = usePokemonListStore();

  return (
    <div className=" w-[90%] m-[auto] max-w-[1100px]">
      <div className="flex justify-center ">
        <img
          src="public\images\logo.webp"
          alt="pokedek-logo"
          className="max-h-[80px] mt-[20px] "
        />
      </div>
      <SearchForm />

      {fetchPokemon.loading && (
        <div className="h-[60vh] flex justify-center items-center">
          <ReactLoading type={"bars"} color="#fff" />
        </div>
      )}
      {!fetchPokemon.loading && (
        <div className="grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3 gap-[20px] mt-[40px]">
          {pokemon.data.map((item) => {
            return (
              <PokemonCard
                image={item.image}
                name={item.name}
                id={item.id}
                types={item.types}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
