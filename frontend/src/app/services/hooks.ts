import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {rootReducer} from "./rootReducer.ts";
import {store} from "./store.ts";

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
