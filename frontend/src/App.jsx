import { TextareaForm } from './elements/Editor'
import { Arena } from './elements/Arena'
import { Home } from './elements/Home'
import './App.css'
import Header from './elements/Header'
import { ThemeProvider } from "./components/theme-provider"
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
function App() {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Router>
        <Routes>
        <Route exact path='/compiler' element={<TextareaForm/>}/>
        <Route exact path='/arena' element={<Arena/>}/>
        <Route exact path='/' element={<Home/>}/>
        </Routes>
      </Router>
      </ThemeProvider>
    </>
  )
}

export default App
