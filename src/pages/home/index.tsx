import PokemonCard from "@/PokemonCard";
import SearchForm from "@/components/SearchForm";
import { usePokemonListStore } from "@/store/pokemonList";

const HomePage = () => {
  const { pokemon } = usePokemonListStore();

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

      <div className="grid grid-cols-4 gap-[20px] mt-[40px]">
        {pokemon.data.map((item) => {
          return <PokemonCard data={item} />;
        })}
      </div>
    </div>
  );
};

export default HomePage;
