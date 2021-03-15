import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@rtk-incubator/rtk-query/dist";
import { pokemonApi } from "./features/pokemon/service";

import { isRejectedWithValue } from "@reduxjs/toolkit";
/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger = (api) => (next) => (
  action
) => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these use matchers!
  console.log({ action });
  console.log("is rejected: ", isRejectedWithValue(action));
  if (isRejectedWithValue(action)) {
    console.warn("We got a rejected action!", action);
  }

  return next(action);
};

export function setupStore() {
  const store = configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (gDM) =>
      gDM({
        immutableCheck: {
          warnAfter: 200
        },
        serializableCheck: {
          warnAfter: 200
        }
      })
        .concat(pokemonApi.middleware)
        // .concat(rtkQueryErrorLogger)
  });

  setupListeners(store.dispatch);

  return store;
}

const store = setupStore();

export default store;
