import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slices/movies/movieSlice";
import favoritesSlice from "./slices/favoritesSlice";
import personSlice from "./slices/personSlice";
export const store = configureStore({
    reducer: {
        movies: movieSlice,
        favorites: favoritesSlice,
        person: personSlice
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;