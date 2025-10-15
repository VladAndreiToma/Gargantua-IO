import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { element } from 'three/tsl';
import Simulation from './components/Simulation';
import Home from './components/Home';
import About from './components/About';
import { useEffect } from 'react';
import Learning from './components/Learning';
import Quiz from './components/Quiz';
import Gallery from './components/Gallery';
import Introduction from './components/learning/Introduction';
import SpacetimeAndGeneralRelativity from './components/learning/SpacetimeAndGeneralRelativity';
import SchwarzshildGeometry from './components/learning/SchwarzschildGeometry';
import KerrBlackHoles from './components/learning/KerrBlackHoles';
import AccretionDisksAndJets from './components/learning/AccretionDisksAndJets';
import GravitationalLensing from './components/learning/GravitationalLensing';
import BlackHolesMergers from './components/learning/BlackHoleMergers';



const components = {
  '': Home,
  simulation: Simulation,
  learning: Learning,
  quiz: Quiz,
  gallery: Gallery,
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
        <Route path='/learning/introduction' element={<Introduction/>}/>
        <Route path='/learning/spacetime-and-general-relativity' element={<SpacetimeAndGeneralRelativity/>}/>
        <Route path='/learning/schwarzschild-geometry' element={<SchwarzshildGeometry/>}/>
        <Route path='/learning/kerr-black-holes' element={<KerrBlackHoles/>}/>
        <Route path='/learning/accretion-disks-and-jets' element={<AccretionDisksAndJets/>}/>
        <Route path='/learning/gravitational-lensing' element={<GravitationalLensing/>}/>
        <Route path='/learning/black-hole-mergers' element={<BlackHolesMergers/>}/>
      </Routes>
    </Router>
  )
}

export default App
