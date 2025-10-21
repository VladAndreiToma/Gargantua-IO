import NavigationBar from "../../navigation/NavigationBar";
import QuizTemplate from "./QuizTemplate";

const title = "Quiz 6";
const subject = "Aspects about Black Hole Mergers";

const questions = [
  {
    question: "What is a black hole merger?",
    options: [
      "The collision and coalescence of two black holes into one",
      "A neutron star collapsing into a black hole",
      "A black hole evaporating via Hawking radiation",
      "Two galaxies merging without any black holes involved"
    ],
    correct: 0,
  },
  {
    question: "Which type of waves are primarily emitted during a black hole merger?",
    options: [
      "Electromagnetic waves",
      "Gravitational waves",
      "Neutrino bursts",
      "Cosmic rays"
    ],
    correct: 1,
  },
  {
    question: "Which observatory first detected gravitational waves from a black hole merger?",
    options: [
      "LIGO",
      "Chandra",
      "Kepler",
      "ALMA"
    ],
    correct: 0,
  },
  {
    question: "The first detected merger event GW150914 involved black holes of approximately:",
    options: [
      "3 and 5 solar masses",
      "10 and 15 solar masses",
      "30 and 35 solar masses",
      "100 and 200 solar masses"
    ],
    correct: 2,
  },
  {
    question: "In a binary system, what happens to the orbital period as the black holes spiral closer?",
    options: [
      "It increases",
      "It decreases",
      "It remains constant",
      "It oscillates randomly"
    ],
    correct: 1,
  },
  {
    question: "What causes the black holes to lose energy and spiral inward before merging?",
    options: [
      "Electromagnetic radiation",
      "Gravitational wave emission",
      "Tidal friction",
      "Dark matter drag"
    ],
    correct: 1,
  },
  {
    question: "The final black hole after the merger is typically:",
    options: [
      "Static and non-rotating",
      "Rotating with a spin parameter less than 1",
      "Rotating faster than light",
      "Rapidly expanding in mass"
    ],
    correct: 1,
  },
  {
    question: "What is the 'ringdown' phase in a merger?",
    options: [
      "The stage when gravitational waves are emitted strongest",
      "The final stage when the merged black hole settles into a stable Kerr configuration",
      "The inspiral phase of two black holes",
      "The phase when electromagnetic radiation dominates"
    ],
    correct: 1,
  },
  {
    question: "What fraction of the total mass-energy is typically radiated away as gravitational waves in a merger?",
    options: [
      "Less than 0.01%",
      "About 0.1%",
      "A few percent (1–5%)",
      "Over 50%"
    ],
    correct: 2,
  },
  {
    question: "What determines the direction and magnitude of the 'recoil kick' of the remnant black hole?",
    options: [
      "The asymmetry in gravitational wave emission due to unequal masses or spins",
      "The presence of magnetic fields",
      "The motion of nearby stars",
      "The curvature of surrounding spacetime"
    ],
    correct: 0,
  },
  {
    question: "Why are black hole mergers important in cosmology?",
    options: [
      "They provide tests of General Relativity in the strong-field regime",
      "They create new galaxies",
      "They explain cosmic inflation",
      "They emit visible light used for distance measurements"
    ],
    correct: 0,
  },
  {
    question: "What is the main limitation in detecting black hole mergers with current instruments?",
    options: [
      "The weakness of gravitational wave signals compared to background noise",
      "The lack of optical counterparts",
      "The Earth's rotation",
      "The size of telescope mirrors"
    ],
    correct: 0,
  },
  {
    question: "How can mergers of supermassive black holes be detected in the future?",
    options: [
      "Through space-based detectors like LISA",
      "By neutrino detectors underground",
      "By X-ray telescopes only",
      "By measuring cosmic rays"
    ],
    correct: 0,
  },
  {
    question: "What is a 'chirp' signal in the context of gravitational wave detection?",
    options: [
      "A signal that increases in frequency and amplitude as black holes approach merger",
      "A periodic signal from pulsars",
      "A steady tone from distant quasars",
      "A background noise in detectors"
    ],
    correct: 0,
  },
  {
    question: "What happens to the gravitational wave frequency as the black holes get closer?",
    options: [
      "It decreases",
      "It increases",
      "It remains constant",
      "It becomes random"
    ],
    correct: 1,
  }
];


export default function Quiz6(){
    return(
        <div className="page-container">
            <NavigationBar/>
            <QuizTemplate {...{title, subject, questions}}/>
        </div>
    )
}