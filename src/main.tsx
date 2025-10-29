import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import MoviePage from './pages/MoviePage.tsx';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import Layout from './components/Layout.tsx';
import FavoriteMovies from './pages/FavoriteMovies.tsx';
import PersonPage from './pages/PersonPage.tsx';
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<App />} />
                    <Route path="/movie/:id" element={<MoviePage />} />
                    <Route path="/favoritemovies" element={<FavoriteMovies />} />
                    <Route path="/person/:id" element={<PersonPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);
// add
// alert-dialog
