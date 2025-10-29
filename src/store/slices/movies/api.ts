export const API_URL = 'https://api.themoviedb.org/3';
export const userLang = navigator.language || 'en-US';

export const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
    },
};

export const getMovies = async (query: string, page = 1) => {
    const params = new URLSearchParams({ language: userLang, page: page.toString() });
    if (query) params.append('query', query);

    const url = query
        ? `${API_URL}/search/movie?${params.toString()}`
        : `${API_URL}/trending/movie/week?${params.toString()}`;

    const res = await fetch(url, options);
    if (!res.ok) throw new Error('Failed to fetch movies');
    const data = await res.json();

    return { results: data.results, page: data.page, total_pages: data.total_pages };
};

export const getMovieById = async (id: number) => {
    const res = await fetch(`${API_URL}/movie/${id}?language=${userLang}`, options);
    if (!res.ok) throw new Error('Failed to fetch movie');
    return res.json();
};

export const getCast = async (id: number) => {
    const res = await fetch(`${API_URL}/movie/${id}/credits`, options);
    if (!res.ok) throw new Error('Failed to fetch cast');
    const data = await res.json();
    return data.cast;
};

export const getRecommended = async (id: number) => {
    const res = await fetch(`${API_URL}/movie/${id}/recommendations?language=${userLang}`, options);
    if (!res.ok) throw new Error('Failed to fetch recommended movies');
    const data = await res.json();
    return data.results;
};

export const getVideos = async (id: number) => {
    const res = await fetch(`${API_URL}/movie/${id}/videos?language=${userLang}`, options);
    if (!res.ok) throw new Error('Failed to fetch videos for the movie');
    const data = await res.json();
    return data.results;
};
