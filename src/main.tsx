import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import MoviePage from './pages/MoviePage.tsx';
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import Layout from './components/Layout.tsx';
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<App />} />
                    <Route path="/movie/:id" element={<MoviePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </Provider>
);
// add
// alert-dialog
