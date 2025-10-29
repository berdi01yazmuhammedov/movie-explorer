import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from './movieSlice';
import type { Person } from './personSlice';
type SimplePerson = Pick<Person, "id" | "name" | "profile_path">
interface FavoritesState {
    favoriteMovies: Movie[];
    favoritePersons: SimplePerson[];
}

const loadFavorites = <T>(key: string): T[] => {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const initialState: FavoritesState = {
    favoriteMovies: loadFavorites<Movie>("favoriteMovies"),
    favoritePersons: loadFavorites<Person>("favoritePersons"),
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
            localStorage.setItem('favoriteMovies', JSON.stringify(state.favoriteMovies));
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
            localStorage.setItem('favoritePersons', JSON.stringify(state.favoritePersons));
        },
        clearFavoritePersons: (state) => {
            state.favoritePersons = [];
            localStorage.removeItem('favoritePersons');
        },
    },
});

export const { toggleFavoriteMovie, clearFavoriteMovies, toggleFavoritePerson, clearFavoritePersons } = favoritesSlice.actions;
export default favoritesSlice.reducer;
