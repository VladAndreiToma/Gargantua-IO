import NavigationBar from "../../navigation/NavigationBar";
import QuizTemplate from "./QuizTemplate";

const title = "Quiz 5";
const subject = "Aspects about Gravitational Lensing";

const questions = [
  {
    question: "What is gravitational lensing?",
    options: [
      "Bending of light due to strong magnetic fields",
      "Deflection of light by massive objects due to spacetime curvature",
      "Absorption of light by interstellar dust",
      "Scattering of photons in plasma clouds"
    ],
    correct: 1,
  },
  {
    question: "Which of the following predicted gravitational lensing first?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Hubble",
      "Stephen Hawking"
    ],
    correct: 1,
  },
  {
    question: "In strong lensing, what typical feature appears?",
    options: [
      "A single distorted image",
      "Multiple images or Einstein rings",
      "Only dimming of light",
      "Gamma-ray bursts"
    ],
    correct: 1,
  },
  {
    question: "An Einstein ring is formed when:",
    options: [
      "The source, lens, and observer are perfectly aligned",
      "The source is behind a rotating black hole",
      "The observer moves at relativistic speed",
      "The light source emits polarized light"
    ],
    correct: 0,
  },
  {
    question: "What is 'microlensing' mainly used for in astronomy?",
    options: [
      "Detecting exoplanets and compact dark objects",
      "Observing large-scale cosmic voids",
      "Measuring cosmic microwave background",
      "Detecting quasars only"
    ],
    correct: 0,
  },
  {
    question: "The deflection angle of light near a mass M at distance b is proportional to:",
    options: [
      "M / b",
      "M × b²",
      "M / b²",
      "M² / b"
    ],
    correct: 0,
  },
  {
    question: "Weak lensing is primarily used to study:",
    options: [
      "The distribution of dark matter in the Universe",
      "Solar flares",
      "Exoplanet atmospheres",
      "Atomic transitions"
    ],
    correct: 0,
  },
  {
    question: "Which type of gravitational lensing can create 'arcs' and 'arclets' in galaxy cluster images?",
    options: [
      "Strong lensing",
      "Microlensing",
      "Quantum lensing",
      "Relativistic beaming"
    ],
    correct: 0,
  },
  {
    question: "The time delay between multiple lensed images can be used to:",
    options: [
      "Measure the Hubble constant",
      "Determine star metallicities",
      "Measure the Earth's curvature",
      "Calibrate radio telescopes"
    ],
    correct: 0,
  },
  {
    question: "Which telescope provided famous gravitational lensing images like 'Einstein Cross' and 'Cosmic Horseshoe'?",
    options: [
      "Hubble Space Telescope",
      "Chandra X-ray Observatory",
      "James Webb Space Telescope",
      "Kepler Telescope"
    ],
    correct: 0,
  }
];

export default function Quiz5(){
    return(
        <div className="page-container">
            <NavigationBar/>
            <QuizTemplate {...{title,subject, questions}}/>
        </div>
    )
}
