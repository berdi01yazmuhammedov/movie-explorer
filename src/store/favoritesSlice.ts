import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Movie } from './movieSlice';

interface FavoritesState {
    items: Movie[];
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
    items: loadFavorites(),
};
const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action: PayloadAction<Movie>) => {
            const existing = state.items.find((m) => m.id === action.payload.id);
            if (existing) {
                state.items = state.items.filter((m) => m.id !== action.payload.id);
            } else {
                state.items.push(action.payload);
            }
            localStorage.setItem('favorites', JSON.stringify(state.items));
        },
        clearFavorites: (state) => {
            state.items = [];
            localStorage.removeItem('favorites');
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
