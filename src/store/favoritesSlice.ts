import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from './movies/types';
import type { Person } from './personSlice';
import { loadFromStorage, saveToStorage } from './utils/localstorage';
type SimplePerson = Pick<Person, "id" | "name" | "profile_path">
interface FavoritesState {
    favoriteMovies: Movie[];
    favoritePersons: SimplePerson[];
}


const initialState: FavoritesState = {
    favoriteMovies: loadFromStorage<Movie>("favoriteMovies"),
    favoritePersons: loadFromStorage<Person>("favoritePersons"),
};
const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavoriteMovie: (state, action: PayloadAction<Movie>) => {
            const existing = state.favoriteMovies.find((m) => m.id === action.payload.id);
            if (existing) {
                state.favoriteMovies = state.favoriteMovies.filter(
                    (m) => m.id !== action.payload.id
                );
            } else {
                state.favoriteMovies.push(action.payload);
            }
            saveToStorage('favoriteMovies', state.favoriteMovies);
        },
        clearFavoriteMovies: (state) => {
            state.favoriteMovies = [];
            localStorage.removeItem('favoriteMovies');
        },


        toggleFavoritePerson: (state, action: PayloadAction<SimplePerson>) => {
            const existing = state.favoritePersons.find((p) => p.id === action.payload.id);
            if (existing) {
                state.favoritePersons = state.favoritePersons.filter(
                    (p) => p.id !== action.payload.id
                );
            } else {
                state.favoritePersons.push(action.payload);
            }
            saveToStorage('favoriteMovies', state.favoriteMovies);
        },
        clearFavoritePersons: (state) => {
            state.favoritePersons = [];
            localStorage.removeItem('favoritePersons');
        },
    },
});

export const { toggleFavoriteMovie, clearFavoriteMovies, toggleFavoritePerson, clearFavoritePersons } = favoritesSlice.actions;
export default favoritesSlice.reducer;
