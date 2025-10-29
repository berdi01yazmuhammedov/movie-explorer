import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";

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