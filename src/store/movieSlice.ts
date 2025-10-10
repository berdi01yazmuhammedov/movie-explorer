import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '.';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
};

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async ({ query }: { query: string }, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();
            let url = '';
            if (query) {
                params.append('query', query);
                url = `https://api.themoviedb.org/3/search/movie?${params.toString()}`;
            } else {
                url = `https://api.themoviedb.org/3/discover/movie?sort_by=release_date.desc&${params.toString()}`;
            }

            const res = await fetch(url, options);
            if (!res.ok) throw new Error('Failed to fetch movies');
            const data = await res.json();
            return data.results;
        } catch (error: string | any) {
            return rejectWithValue(error.message);
        }
    }
);

export const selectFilteredMovies = createSelector(
    (state: RootState) => state.movies.result,
    (state: RootState) => state.movies.filters,
    (movies, filters) => {
        let filtered = [...movies];

        if (filters.genre) {
            filtered = filtered.filter((m) => m.genre_ids.includes(filters.genre!));
        }

        if (filters.year) {
            const start = parseInt(filters.year);
            const end = start + 9;
            filtered = filtered.filter((m) => {
                const release = parseInt(m.release_date?.slice(0, 4));
                return release >= start && release <= end;
            });
        }

        if (filters.sortBy === 'rating') {
            filtered.sort((a, b) => b.vote_average - a.vote_average);
        } else if (filters.sortBy === 'release_date') {
            filtered.sort(
                (a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
            );
        } else if (filters.sortBy === 'popularity') {
            filtered.sort((a, b) => b.popularity - a.popularity);
        }

        return filtered;
    }
);
export const fetchMovieById = createAsyncThunk(
    'movies/fetchMovieById',
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, options);
            if (!res.ok) throw new Error('Failed to fetch movie');
            const data = await res.json();
            return data;
        } catch (error: string | any) {
            return rejectWithValue(error.message);
        }
    }
);

interface Filters {
    genre: number | null;
    year: string | null;
    sortBy: 'popularity' | 'rating' | 'release_date' | null;
}
export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
interface initialState {
    searchValue: string;
    query: string;
    result: Movie[];
    currentMovie: Movie | null;
    loading: boolean;
    error: string | null;
    filters: Filters;
}
const initialState: initialState = {
    searchValue: '',
    query: '',
    result: [],
    currentMovie: null,
    loading: false,
    error: null,
    filters: {
        genre: null,
        year: null,
        sortBy: 'popularity',
    },
};

const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setQuery(state, action) {
            state.query = action.payload;
        },
        setResult(state, action) {
            state.result = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setFilter<K extends keyof Filters>(
            state: initialState,
            action: { payload: { key: K; value: Filters[K] } }
        ) {
            const { key, value } = action.payload;
            if (state.filters[key] === value) {
                state.filters[key] = null as Filters[K];
            } else {
                state.filters[key] = value;
            }
        },
        clearFilters(state) {
            state.filters = {
                genre: null,
                year: null,
                sortBy: null,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovies.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.result = action.payload;
            })
            .addCase(fetchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            
            .addCase(fetchMovieById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMovieById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentMovie = action.payload;
            })
            .addCase(fetchMovieById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const {
    setSearchValue,
    setQuery,
    setResult,
    setLoading,
    setError,
    setFilter,
    clearFilters,
} = movieSlice.actions;
export default movieSlice.reducer;
