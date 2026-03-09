import './App.css'
import Home from './components/home/Home'
import Products from './components/products/Products'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path='/products' element={ <Products /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
