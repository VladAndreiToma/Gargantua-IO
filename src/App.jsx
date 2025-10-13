import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { element } from 'three/tsl';
import Simulation from './components/Simulation';
import Home from './components/Home';
import About from './components/About';

const components = {
  '': Home,
  simulation: Simulation,
  about: About,
}

function App(){
  return(
    <Router>
      <Routes>
        {
          Object.entries(components).map(([thePath, TheComponent])=>(
            <Route key={thePath} path={`/${thePath}`} element={<TheComponent/>}/>
          ))
        }
      </Routes>
    </Router>
  )
}

export default App
