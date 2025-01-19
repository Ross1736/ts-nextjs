import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import counterReducer from "./features/counterSlice";
import userReducer from "./features/userSlice";
import { userApi } from "./services/userApi";

export const store = configureStore({
  reducer: {
    counterReducer,
    userReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);

// exportamos tipos de datos en el estado y acciones
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
