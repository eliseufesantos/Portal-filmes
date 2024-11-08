import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx';
import MovieListPage from './pages/MovieListPage.jsx';
import MovieDetailPage from './pages/MovieDetailPage.jsx';
import GenreListPage from './pages/GenreListPage.jsx';
import MoviesByGenrePage from './pages/MoviesByGenrePage.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Favoritos from './pages/Favoritos.jsx';
import WatchedList from './pages/WatchedList.jsx';
import WatchLaterList from './pages/WatchLaterList.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'filmes', element: <MovieListPage /> },
      { path: 'filmes/:id', element: <MovieDetailPage /> },
      { path: 'generos', element: <GenreListPage /> },
      { path: 'generos/:id', element: <MoviesByGenrePage /> },
      { path: 'favoritos', element: <Favoritos /> },
      { path: 'assistidos', element: <WatchedList /> },
      { path: 'ver-depois', element: <WatchLaterList /> },
      { path: '*', element: <PageNotFound /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);