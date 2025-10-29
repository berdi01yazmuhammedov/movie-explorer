import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from './movieSlice';
import type { Person } from './personSlice';

interface FavoritesState {
    favoriteMovies: Movie[];
    favoritePersons: Person[];
}

const loadFavorites = (): Movie[] => {
    try {
        const stored = localStorage.getItem('favorites');
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
};

const initialState: FavoritesState = {
    favoriteMovies: loadFavorites(),
    favoritePersons: [],
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
            localStorage.setItem('favorites', JSON.stringify(state.favoriteMovies));
        },
        clearFavoriteMovies: (state) => {
            state.favoriteMovies = [];
            localStorage.removeItem('favorites');
        },


        toggleFavoritePerson: (state, action: PayloadAction<Person>) => {
            const existing = state.favoritePersons.find((p) => p.id === action.payload.id);
            if (existing) {
                state.favoritePersons = state.favoritePersons.filter(
                    (p) => p.id !== action.payload.id
                );
            } else {
                state.favoritePersons.push(action.payload);
            }
            localStorage.setItem('favorites', JSON.stringify(state.favoritePersons));
        },
        clearFavoritePersons: (state) => {
            state.favoritePersons = [];
            localStorage.removeItem('favorites');
        },
    },
});

export const { toggleFavoriteMovie, clearFavoriteMovies, toggleFavoritePerson, clearFavoritePersons } = favoritesSlice.actions;
export default favoritesSlice.reducer;
