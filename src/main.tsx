import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import MoviePage from "./pages/MoviePage.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}/>
    <Route path="/movie/:id" element={<MoviePage />}/>
  </Routes>
  </BrowserRouter>
);
// add
// alert-dialog


