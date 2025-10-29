import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMovies, getMovieById, getCast, getRecommended, getVideos } from './api';

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async ({ query, page = 1 }: { query: string; page?: number }, { rejectWithValue }) => {
        try {
            return await getMovies(query, page);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchMovieById = createAsyncThunk(
    'movies/fetchMovieById',
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            return await getMovieById(id);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchCast = createAsyncThunk(
    'movies/fetchCast',
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            return await getCast(id);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchRecommendedMovies = createAsyncThunk(
    'movies/fetchRecommendedMovies',
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            return await getRecommended(id);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchMovieVideos = createAsyncThunk(
    'movies/fetchMovieVideos',
    async ({ id }: { id: number }, { rejectWithValue }) => {
        try {
            return await getVideos(id);
        } catch (err: any) {
            return rejectWithValue(err.message);
        }
    }
);
