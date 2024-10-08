import {combineReducers, configureStore} from '@reduxjs/toolkit';
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import {usersReducer} from "../features/users/usersSlice";
import {categoriesReducer} from "../features/categories/categoriesSlice";
import {ItemsReducer} from "../features/items/itemsSlice";

const usersPersistConfig = {
  key: 'Lalafo:users',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  categories:categoriesReducer,
  items:ItemsReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware:(getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck:{
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE,REGISTER],
      }
    });
  },
});
export const persistor = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
