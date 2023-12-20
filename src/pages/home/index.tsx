import { useEffect } from "react";

import { pokemonLisService, pokemonDetailService } from "@/service";

const HomePage = () => {
  const callData = async () => {
    const data = await pokemonDetailService.getPokemonDetail("ditto");
    console.log("data ", data.data);
  };

  useEffect(() => {
    callData();
  }, []);

  return <div>HomePage</div>;
};

export default HomePage;
