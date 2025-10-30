import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMovies, getMovieById, getCast, getRecommended, getVideos } from './api';
import type {
    Movie,
    initialState,
} from './types';

export const fetchMovies = createAsyncThunk<
    { results: Movie[]; page: number; total_pages: number },
    { query: string; page?: number },
    { rejectValue: string }
>('movies/fetchMovies', async ({ query, page = 1 }, { rejectWithValue }) => {
    try {
        return await getMovies(query, page);
    } catch (err) {
        if (err instanceof Error) return rejectWithValue(err.message);
        return rejectWithValue('Unknown error');
    }
});

export const fetchMovieById = createAsyncThunk<
    initialState['currentMovie'],
    { id: number },
    { rejectValue: string }
>('movies/fetchMovieById', async ({ id }, { rejectWithValue }) => {
    try {
        return await getMovieById(id);
    } catch (err) {
        if (err instanceof Error) return rejectWithValue(err.message);
        return rejectWithValue('Unknown error');
    }
});

export const fetchCast = createAsyncThunk<
    initialState['cast'],
    { id: number },
    { rejectValue: string }
>('movies/fetchCast', async ({ id }, { rejectWithValue }) => {
    try {
        return await getCast(id);
    } catch (err) {
        if (err instanceof Error) return rejectWithValue(err.message);
        return rejectWithValue('Unknown error');
    }
});

export const fetchRecommendedMovies = createAsyncThunk<
    initialState['recommendedMovies'],
    { id: number },
    { rejectValue: string }
>('movies/fetchRecommendedMovies', async ({ id }, { rejectWithValue }) => {
    try {
        return await getRecommended(id);
    } catch (err) {
        if (err instanceof Error) return rejectWithValue(err.message);
        return rejectWithValue('Unknown error');
    }
});

export const fetchMovieVideos = createAsyncThunk<
    initialState['movieVideos'],
    { id: number },
    { rejectValue: string }
>('movies/fetchMovieVideos', async ({ id }, { rejectWithValue }) => {
    try {
        return await getVideos(id);
    } catch (err) {
        if (err instanceof Error) return rejectWithValue(err.message);
        return rejectWithValue('Unknown error');
    }
});
