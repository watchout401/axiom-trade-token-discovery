import { configureStore } from "@reduxjs/toolkit";

import tokensReducer from "@/store/tokensSlice";
import uiReducer from "@/store/uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    tokens: tokensReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

