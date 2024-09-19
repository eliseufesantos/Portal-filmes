import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import MovieListPage from './pages/MovieListPage.jsx'
import MovieDetailPage from './pages/MovieDetailPage.jsx'
import GenreListPage from './pages/GenreListPage.jsx'
import MoviesByGenrePage from './pages/MoviesByGenrePage.jsx'
import PageNotFound from './pages/PageNotFound.jsx'

const router = createBrowserRouter ([{/* Deve ter as rotas:
  home
  filmes
  Detalhes do Filme
  Lista de gêneros
  Filmes por gênero
  Page Not Found
  */
 
  path:'/',
  element: <App/>,
  children: [
    {index: true, element: <Home/>},
    {path:'/filmes', element: <MovieListPage/>},
    {path:'/filmes/:id', element: <MovieDetailPage/>},
    {path:'/generos', element: <GenreListPage/>},
    {path:'/generos/:id', element: <MoviesByGenrePage/>},
    {path:'/*', element: <PageNotFound/>}
  ]
}])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
