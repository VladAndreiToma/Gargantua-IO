import NavigationBar from "../../navigation/NavigationBar";
import QuizTemplate from "./QuizTemplate";
const title = "Quiz 9";
const subject = "Aspects of Numerical Relativity and Computational Methods in General Relativity";

const questions = [
  {
    question: "What is the main goal of numerical relativity?",
    options: [
      "To find exact analytical solutions to Einstein’s field equations",
      "To simulate and solve Einstein’s equations using computational methods",
      "To approximate Newtonian orbits for weak gravity",
      "To visualize spacetime curvature using Euclidean geometry"
    ],
    correct: 1,
  },
  {
    question: "Why are Einstein’s field equations difficult to solve analytically?",
    options: [
      "They are linear differential equations",
      "They couple nonlinear partial differential equations for 10 metric components",
      "They depend only on simple algebraic relations",
      "They ignore time evolution"
    ],
    correct: 1,
  },
  {
    question: "Which formalism is commonly used for numerical simulations in general relativity?",
    options: [
      "ADM (Arnowitt–Deser–Misner) 3+1 decomposition",
      "Schrödinger formalism",
      "Lagrangian mechanics",
      "Gauge-gravity duality framework"
    ],
    correct: 0,
  },
  {
    question: "In the 3+1 ADM decomposition, spacetime is split into:",
    options: [
      "Three spatial coordinates and one temporal coordinate",
      "Two time coordinates and two spatial ones",
      "Three angular coordinates and a scalar field",
      "A complex and a real dimension"
    ],
    correct: 0,
  },
  {
    question: "Which quantities are typically evolved in time in numerical relativity codes?",
    options: [
      "The lapse and shift functions only",
      "The spatial metric and extrinsic curvature",
      "The curvature scalars only",
      "The cosmological constant"
    ],
    correct: 1,
  },
  {
    question: "What is the purpose of the 'lapse function' in the ADM formalism?",
    options: [
      "To define how clocks tick between hypersurfaces",
      "To describe spatial curvature directly",
      "To determine the shape of geodesics",
      "To normalize the Ricci scalar"
    ],
    correct: 0,
  },
  {
    question: "The 'shift vector' in numerical relativity determines:",
    options: [
      "How coordinates shift spatially between time slices",
      "The mass-energy distribution in the field",
      "The local acceleration of test particles",
      "The boundary conditions for radiation"
    ],
    correct: 0,
  },
  {
    question: "Why are constraint equations important in numerical relativity?",
    options: [
      "They fix the gauge of electromagnetic fields",
      "They ensure the evolution remains consistent with Einstein’s equations",
      "They define the curvature of null geodesics",
      "They provide values for the cosmological constant"
    ],
    correct: 1,
  },
  {
    question: "What is the 'BSSN formalism'?",
    options: [
      "A reformulation of ADM equations for improved numerical stability",
      "A method for computing electromagnetic potentials",
      "A tool for visualizing black holes in 3D",
      "A model for quantized spacetime"
    ],
    correct: 0,
  },
  {
    question: "Which numerical technique is commonly used for evolving spacetime metrics?",
    options: [
      "Finite difference methods",
      "Monte Carlo sampling",
      "Fourier transforms only",
      "Lattice gauge averaging"
    ],
    correct: 0,
  },
  {
    question: "What major breakthrough in 2005 involved numerical relativity?",
    options: [
      "The first stable simulation of binary black hole merger and ringdown",
      "Discovery of cosmic inflation",
      "Measurement of the cosmological constant",
      "Simulation of the early Universe expansion"
    ],
    correct: 0,
  },
  {
    question: "Which collaboration first successfully simulated binary black hole mergers?",
    options: [
      "Caltech–Cornell–CITA collaboration",
      "LIGO–Virgo–KAGRA",
      "Maxwell Institute",
      "Event Horizon Telescope team"
    ],
    correct: 0,
  },
  {
    question: "Numerical relativity provides essential templates for:",
    options: [
      "Electromagnetic bursts",
      "Gravitational wave detection and data analysis",
      "Dark energy fluctuations",
      "Quantum vacuum simulations"
    ],
    correct: 1,
  },
  {
    question: "What is a common challenge in numerical relativity simulations?",
    options: [
      "Maintaining numerical stability and constraint preservation",
      "The lack of initial data",
      "The unavailability of boundary conditions",
      "The need for analytic continuation"
    ],
    correct: 0,
  },
  {
    question: "Which modern frameworks are widely used for numerical relativity computations?",
    options: [
      "Einstein Toolkit and SpEC (Spectral Einstein Code)",
      "TensorFlow and PyTorch",
      "ROOT and GEANT4",
      "MATLAB Simulink and COMSOL"
    ],
    correct: 0,
  }
];

export default function Quiz9(){
    return(
        <div className="page-container">
            <NavigationBar/>
            <QuizTemplate {...{title, subject, questions}}/>
        </div>
    )
}