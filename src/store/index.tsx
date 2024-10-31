// third-party
import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  TypedUseSelectorHook,
} from "react-redux";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// project import
import reducers from "./reducers";

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof reducers>;

export type AppDispatch = typeof store.dispatch;

const persister = persistStore(store);

const { dispatch } = store;

const useDispatch = () => useAppDispatch<AppDispatch>();
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { store, dispatch, persister, useSelector, useDispatch };

// item list
const FILLENEGY = "FILLENEGY";
const LIMITINCREASE = "LIMITINCREASE";
const TAPMULTI = "TAPMULTI";
const TAPINCREASE = "TAPINCREASE";

export { FILLENEGY, LIMITINCREASE, TAPINCREASE, TAPMULTI };

// image import
import ImgDollar from "./../../public/image/bitcoin.png";
import ImgDoubleTap from "./../../public/image/double-tap.png";
import ImgButtery from "./../../public/image/battery.png";

export { ImgDollar, ImgDoubleTap, ImgButtery };

export function formatNumberWithCommas(number: number, locale = "en-US") {
  let tmp = "";
  let tmpNumber = number;
  if (tmpNumber >= 1000000000000000) {
    tmpNumber = Math.floor(tmpNumber / 1000000000000) / 1000;
    tmp = "P";
  } else if (tmpNumber >= 1000000000000) {
    tmpNumber = Math.floor(tmpNumber / 1000000000) / 1000;
    tmp = "T";
  } else if (tmpNumber >= 1000000000) {
    tmpNumber = Math.floor(tmpNumber / 1000000) / 1000;
    tmp = "G";
  } else if (tmpNumber >= 1000000) {
    tmpNumber = Math.floor(tmpNumber / 1000) / 1000;
    tmp = "M";
  } else if (tmpNumber >= 1000) {
    tmpNumber = tmpNumber / 1000;
    tmp = "K";
  }

  return new Intl.NumberFormat(locale).format(tmpNumber) + " " + tmp;
}
