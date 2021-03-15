import { useGetPokemonByNameQuery } from "./service";

function PokemonItem({ name }) {
  const {
    data,
    error,
    isFetching,
    isLoading,
    isUninitialized,
  } = useGetPokemonByNameQuery(name, {
    skip: !name,
  });

  // reproduction steps:
  // 1. Launch app (npm start)
  // 2. Open console
  // 3. Open redux devtools
  // 4. [in devtools + console] Observe that data fetches normally (query fulfils in devtools, data & statuses populate in console)
  // 5. [in ide] Edit and save this file (e.g. edit the logging text) to trigger a hot reload
  // 6. [in devtools] Observe that the 'pokemonApi/subscriptions/unsubscribeResult' action is dispatched after the hot reload
  // 7. Wait 60 seconds (or length of 'keepUnusedDataFor' option)
  // 8. [in devtools] Observe that the 'pokemonApi/queries/removeQueryResult' action is dispatched
  // 9. [in console] Observe that 'isUninitialized' is now back to true

  console.log("[PokemonItem] - render body edited again");
  console.log({
    name,
    data,
    error,
    isFetching,
    isLoading,
    isUninitialized,
  });

  if (!name) {
    return <div>[NO NAME] - Type a pokemon name to begin</div>;
  }

  if (isUninitialized) {
    return <div>[UNINITIALIZED] - Type a pokemon name to begin</div>;
  }

  if (error) {
    return <div>[ERROR] - Oh no, an error has occurred</div>;
  }

  if (isLoading) {
    return <div>[LOADING] - Loading data...</div>;
  }

  if (isFetching) {
    return <div>[FETCHING] - Fetching {name}...</div>;
  }

  if (!data) return null;

  return (
    <div>
      <h3>{data.species.name}</h3>
      <img src={data.sprites.front_shiny} alt={data.species.name} />
    </div>
  );
}

export default PokemonItem;
