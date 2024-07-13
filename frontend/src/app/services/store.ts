import {configureStore} from "@reduxjs/toolkit";
import {rootReducer} from "./rootReducer";
import storage from 'redux-persist/lib/storage'
import {RootState} from "../../index";
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

type TFavoriteState = {
  favorite: Record<string, boolean>;
};

const favoriteTransform = createTransform<TFavoriteState, TFavoriteState>(
  (inboundState) => ({favorite: inboundState.favorite}),
  (outboundState) => ({...outboundState, loading: true, error: null, data: []}),
  {whitelist: ['favorite']}
);

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['favorite'],
  transforms: [favoriteTransform],
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