import { createApi, fetchBaseQuery } from "@rtk-incubator/rtk-query";

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  entityTypes: ["Pokemon"],
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}/`,
      provides: (_, name) => [{ type: "Pokemon", id: name }]
    })
  }),
  keepUnusedDataFor: 5
});

export const { useGetPokemonByNameQuery } = pokemonApi;
