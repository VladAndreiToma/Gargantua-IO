import NavigationBar from "../../navigation/NavigationBar";
import QuizTemplate from "./QuizTemplate";

const title = "Quiz 8";
const subject = "Aspects about Black Hole Information Paradox and Hawking Radiation";

const questions = [
  {
    question: "What is Hawking radiation?",
    options: [
      "Radiation emitted due to nuclear fusion inside black holes",
      "Thermal radiation arising from quantum effects near the event horizon",
      "Electromagnetic waves produced by accretion disks",
      "Gravitational waves escaping from the singularity"
    ],
    correct: 1,
  },
  {
    question: "According to Hawking’s prediction, black holes can:",
    options: [
      "Absorb all radiation perfectly",
      "Emit radiation and lose mass over time",
      "Grow indefinitely due to quantum fluctuations",
      "Reflect incident light from their surface"
    ],
    correct: 1,
  },
  {
    question: "Hawking radiation originates due to:",
    options: [
      "Gravitational waves colliding at the event horizon",
      "Pair production near the event horizon where one particle escapes",
      "Tidal stretching of photons",
      "Collisions between dark matter particles"
    ],
    correct: 1,
  },
  {
    question: "What happens to a black hole as it emits Hawking radiation?",
    options: [
      "Its mass increases",
      "Its temperature decreases",
      "Its mass decreases and temperature rises",
      "It becomes stable at a constant temperature"
    ],
    correct: 2,
  },
  {
    question: "The 'information paradox' refers to:",
    options: [
      "Loss of information when particles enter the event horizon",
      "The inability to locate a black hole precisely",
      "The uncertainty of Hawking’s predictions",
      "The random nature of radiation detected by telescopes"
    ],
    correct: 0,
  },
  {
    question: "Why is the information paradox problematic for physics?",
    options: [
      "It violates conservation of energy",
      "It suggests a breakdown of quantum unitarity",
      "It implies relativity is incorrect",
      "It leads to superluminal information transfer"
    ],
    correct: 1,
  },
  {
    question: "In Hawking’s original formulation, the emitted radiation is:",
    options: [
      "Purely random and thermal, containing no information",
      "Encoded with detailed information about the infalling matter",
      "Partially polarized and structured",
      "Composed only of neutrinos"
    ],
    correct: 0,
  },
  {
    question: "The entropy of a black hole is proportional to:",
    options: [
      "Its volume",
      "Its surface area",
      "Its radius cubed",
      "Its temperature"
    ],
    correct: 1,
  },
  {
    question: "Who formulated the idea that black hole entropy is proportional to the event horizon area?",
    options: [
      "Stephen Hawking",
      "Jacob Bekenstein",
      "Roger Penrose",
      "John Wheeler"
    ],
    correct: 1,
  },
  {
    question: "According to the Bekenstein–Hawking formula, entropy \( S \) is given by:",
    options: [
      "S = kA / 4ℏG",
      "S = kA / 4πr²",
      "S = E / T",
      "S = k log(A)"
    ],
    correct: 0,
  },
  {
    question: "As a black hole evaporates completely, what key question remains unresolved?",
    options: [
      "Whether its spin remains constant",
      "Where the absorbed information goes",
      "Whether gravity remains attractive",
      "If it leaves a magnetic remnant"
    ],
    correct: 1,
  },
  {
    question: "The 'firewall paradox' proposes that:",
    options: [
      "Quantum entanglement at the horizon creates an energetic barrier",
      "Hawking radiation cools the event horizon",
      "Black holes have reflective surfaces",
      "Information escapes through wormholes"
    ],
    correct: 0,
  },
  {
    question: "What is the 'Page curve' related to?",
    options: [
      "The time evolution of black hole luminosity",
      "The entropy of Hawking radiation over time",
      "The trajectory of infalling particles",
      "The redshift of light near the horizon"
    ],
    correct: 1,
  },
  {
    question: "According to quantum gravity proposals, information might escape via:",
    options: [
      "Quantum tunneling or subtle correlations in Hawking radiation",
      "Gravitational lensing around the black hole",
      "Magnetic monopoles in the accretion disk",
      "Tidal forces tearing information apart"
    ],
    correct: 0,
  },
  {
    question: "What is one modern resolution idea of the information paradox?",
    options: [
      "Black holes permanently destroy information",
      "Information is encoded in the correlations of Hawking radiation (unitary evaporation)",
      "Information remains forever trapped beyond the singularity",
      "Information is duplicated both inside and outside the horizon"
    ],
    correct: 1,
  }
];


export default function Quiz8(){
    return(
        <div className="page-container">
            <NavigationBar/>
            <QuizTemplate {...{title, subject, questions}}/>
        </div>
    )
}