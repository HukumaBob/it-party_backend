import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./rootReducer";
import storage from 'redux-persist/lib/storage'
import {
  persistStore,
  persistReducer,
  createTransform,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import {RootState} from "./hooks.ts";
import {
  initialState as authorizationInitialState,
  TInitialState as TAuthorizationInitialState
} from "./slices/authorizationSlice.ts";
import {
  initialState as favoriteInitialState,
  TInitialState as TFavoriteInitialState
} from "./slices/favoriteSlice.ts";

const favoriteTransform = createTransform<TFavoriteInitialState, TFavoriteInitialState>(
  (inboundState) => ({
    ...favoriteInitialState,
    favorite: inboundState.favorite
  }),
  outboundState => outboundState,
  {whitelist: ['favorite']}
);

const authorizationTransform = createTransform<TAuthorizationInitialState, TAuthorizationInitialState>(
  (inboundState) => ({
    ...authorizationInitialState,
    refreshToken: inboundState.refreshToken,
    accessToken: inboundState.accessToken,
    isAuthorized: inboundState.isAuthorized,
  }),
  outboundState => outboundState,
  {whitelist: ['authorization']}
);

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['favorite', 'authorization'],
  transforms: [favoriteTransform, authorizationTransform],
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
