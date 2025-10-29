import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./movies/movieSlice";
import favoritesSlice from "./favoritesSlice";
import personSlice from "./personSlice";
export const store = configureStore({
    reducer: {
        movies: movieSlice,
        favorites: favoritesSlice,
        person: personSlice
    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;