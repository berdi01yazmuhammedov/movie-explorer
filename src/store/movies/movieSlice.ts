import { createSlice } from '@reduxjs/toolkit';
import type { Filters, initialState } from './types';
import { fetchCast, fetchMovieById, fetchMovies, fetchMovieVideos, fetchRecommendedMovies } from './thunk';


const initialState: initialState = {
    searchValue: '',
    query: '',
    isSearching: false,
    result: [],
    currentMovie: null,
    cast: [],
    recommendedMovies: [],
    movieVideos: [],
    loading: false,
    error: null,
    filters: {
        genre: null,
        year: null,
        sortBy: 'popularity',
    },
    page: 1,
    total_pages: 1,
    hasMore: true,
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
            state.isSearching = !!action.payload.trim();
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
                const { results, page, total_pages } = action.payload;
                if (page === 1) {
                    state.result = results;
                } else {
                    state.result = [...state.result, ...results];
                }
                state.page = page;
                state.total_pages = total_pages;
                state.hasMore = page < total_pages;
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
            })
            .addCase(fetchCast.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCast.fulfilled, (state, action) => {
                state.loading = false;
                state.cast = action.payload;
            })
            .addCase(fetchCast.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchRecommendedMovies.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRecommendedMovies.fulfilled, (state, action) => {
                state.loading = false;
                state.recommendedMovies = action.payload;
            })
            .addCase(fetchRecommendedMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchMovieVideos.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMovieVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.movieVideos = action.payload;
            })
            .addCase(fetchMovieVideos.rejected, (state, action) => {
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
