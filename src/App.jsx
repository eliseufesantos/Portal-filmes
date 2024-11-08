import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {

  return (
    <>
     <Header/>
     <Outlet/>
    </>
  )
}

export default App
