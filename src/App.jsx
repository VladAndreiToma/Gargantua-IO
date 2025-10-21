import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import Simulation from './components/Simulation';
import Home from './components/Home';
import About from './components/About';
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
import TimeDilationAndRelativisticEffects from './components/learning/TimeDilationAndRelativisticEffects';
import InformationParadoxAndHawkingRadiation from './components/learning/InformationParadoxAndHawkingRadiation';
import NumericalRelativity from './components/learning/NumericalRelativity';
import InterstellarAndGargantuaModel from './components/learning/InterstellarAndGargantuaModel';
import Tensors from './components/simulation/tensors/Tensors';
import Temperature from './components/simulation/temperature/Temperature';
import Gravity from './components/simulation/gravity/Gravity';
import Quiz1 from './components/quizes/Quiz1';
import Quiz2 from './components/quizes/Quiz2';
import Quiz3 from './components/quizes/Quiz3';
import Quiz4 from './components/quizes/Quiz4';
import Quiz5 from './components/quizes/Quiz5';
import Quiz6 from './components/quizes/Quiz6';
import Quiz7 from './components/quizes/Quiz7';
import Quiz8 from './components/quizes/Quiz8';
import Quiz9 from './components/quizes/Quiz9';

// Componenta pentru mobil
function MobileVersionBanner() {
  return (
    <div style={{height:'100vh',flexDirection:'column', textAlign:'center', boxSizing:'border-box',padding:'3rem 3rem',justifyContent:'flex-start', alignItems:'center'}}>
      <h1 style={{fontSize:'6rem'}}>GargantuaIO</h1>
      <h1 style={{fontSize:'5rem'}}>Available on mobile devices for flexibility and ease of usage</h1>
    </div>
  );
}

// Obiectul de rute principale
const components = {
  '': Home,
  simulation: Simulation,
  learning: Learning,
  quiz: Quiz,
  gallery: Gallery,
  about: About,
};

// Componenta principală
function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 800);

  useEffect(() => {
    // Funcția care actualizează starea la resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    // Atașează evenimentul de resize
    window.addEventListener('resize', handleResize);

    // Curăță event listenerul la unmount (good practice)
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Dacă e mobil → afișăm bannerul
  if (!isMobile) {
    return <MobileVersionBanner />;
  }

  // Dacă e desktop → randăm rutele
  return (
    <Router>
      <Routes>
        
        {Object.entries(components).map(([thePath, TheComponent]) => (
          <Route key={thePath} path={`/${thePath}`} element={<TheComponent />} />
        ))}

        <Route path='/learning/introduction' element={<Introduction />} />
        <Route path='/learning/spacetime-and-general-relativity' element={<SpacetimeAndGeneralRelativity />} />
        <Route path='/learning/schwarzschild-geometry' element={<SchwarzshildGeometry />} />
        <Route path='/learning/kerr-black-holes' element={<KerrBlackHoles />} />
        <Route path='/learning/accretion-disks-and-jets' element={<AccretionDisksAndJets />} />
        <Route path='/learning/gravitational-lensing' element={<GravitationalLensing />} />
        <Route path='/learning/black-hole-mergers' element={<BlackHolesMergers />} />
        <Route path='/learning/time-dilation-and-relativistic-effects' element={<TimeDilationAndRelativisticEffects/>}/>
        <Route path='/learning/information-paradox-and-hawking-radiation' element={<InformationParadoxAndHawkingRadiation/>}/>
        <Route path='/learning/numerical-relativity' element={<NumericalRelativity/>}/>
        <Route path = "/learning/interstellar-and-gargantua-model" element={<InterstellarAndGargantuaModel/>}/>
      
        <Route path='/simulation/tensors' element={<Tensors/>}/>
        <Route path='/simulation/temperature-and-entropy' element={<Temperature/>}/>
        <Route path='/simulation/gravity' element={<Gravity/>}/>

        <Route path='/quiz/quiz-1' element={<Quiz1/>}/>
        <Route path='/quiz/quiz-2' element={<Quiz2/>}/>
        <Route path='/quiz/quiz-3' element={<Quiz3/>}/>
        <Route path='/quiz/quiz-4' element={<Quiz4/>}/>
        <Route path='/quiz/quiz-5' element={<Quiz5/>}/>
        <Route path='/quiz/quiz-6' element={<Quiz6/>}/>
        <Route path='/quiz/quiz-7' element={<Quiz7/>}/>
        <Route path='/quiz/quiz-8' element={<Quiz8/>}/>
        <Route path='/quiz/quiz-9' element={<Quiz9/>}/>

      </Routes>
    </Router>
  );
}

export default App;
