import NavigationBar from "../../navigation/NavigationBar";
import QuizTemplate from "./QuizTemplate";

export default function Quiz3(){
    const title = "Quiz 3";
const subject = "Aspects about Kerr Black Holes";

const questions = [
  {
    question: "What is unique about a Kerr black hole compared to a Schwarzschild black hole?",
    options: [
      "It has electric charge",
      "It rotates (has angular momentum)",
      "It is non-rotating",
      "It cannot form an event horizon"
    ],
    correct: 1,
  },
  {
    question: "Which parameter represents the spin of a Kerr black hole?",
    options: [
      "a = J/M",
      "r_s = 2GM/c²",
      "Q = electric charge",
      "Λ = cosmological constant"
    ],
    correct: 0,
  },
  {
    question: "What is the ergosphere?",
    options: [
      "The singularity at the center",
      "Region outside the event horizon where spacetime is dragged",
      "The stable orbit radius",
      "A region of zero curvature"
    ],
    correct: 1,
  },
  {
    question: "Inside the ergosphere, objects can:",
    options: [
      "Remain stationary relative to distant stars",
      "Escape using negative energy states",
      "Travel faster than light",
      "Form a singularity"
    ],
    correct: 1,
  },
  {
    question: "What effect allows energy extraction from a Kerr black hole?",
    options: [
      "Hawking radiation",
      "Penrose process",
      "Frame dragging",
      "Spaghettification"
    ],
    correct: 1,
  },
  {
    question: "Which metric describes a rotating black hole?",
    options: [
      "Schwarzschild metric",
      "Kerr metric",
      "Reissner–Nordström metric",
      "Minkowski metric"
    ],
    correct: 1,
  },
  {
    question: "Frame dragging means:",
    options: [
      "Spacetime rotates around the black hole",
      "Light is absorbed completely",
      "Time stops near the horizon",
      "Mass disappears"
    ],
    correct: 0,
  },
  {
    question: "The event horizon of a Kerr black hole depends on:",
    options: [
      "Mass only",
      "Spin only",
      "Mass and spin",
      "Charge and spin"
    ],
    correct: 2,
  },
  {
    question: "How many horizons can a Kerr black hole have?",
    options: [
      "1",
      "2",
      "3",
      "None"
    ],
    correct: 1,
  },
  {
    question: "The innermost stable circular orbit (ISCO) for a Kerr black hole depends on:",
    options: [
      "Mass only",
      "Spin and direction of orbit",
      "Spin only",
      "Nothing"
    ],
    correct: 1,
  },
  {
    question: "What happens to the shape of the event horizon as spin increases?",
    options: [
      "Becomes perfectly spherical",
      "Becomes oblate (flattened at poles)",
      "Becomes prolate (elongated)",
      "Remains the same"
    ],
    correct: 1,
  },
  {
    question: "Can a Kerr black hole have negative energy orbits?",
    options: [
      "Yes, inside the ergosphere",
      "No, only outside",
      "Yes, everywhere",
      "No, never"
    ],
    correct: 0,
  },
  {
    question: "Which phenomenon is closely related to Kerr black holes and astrophysical jets?",
    options: [
      "Frame dragging and rotational energy",
      "Tidal forces at the Schwarzschild radius",
      "Hawking radiation",
      "Geodetic precession only"
    ],
    correct: 0,
  },
  {
    question: "The singularity of a Kerr black hole is:",
    options: [
      "Point-like",
      "Ring-shaped",
      "Spherical",
      "Cylindrical"
    ],
    correct: 1,
  },
  {
    question: "Which equation is solved to get the Kerr metric?",
    options: [
      "Einstein Field Equations",
      "Schrödinger Equation",
      "Maxwell Equations",
      "Navier–Stokes Equation"
    ],
    correct: 0,
  }
];
    return(
        <div className="page-container">
            <NavigationBar/>
            <QuizTemplate {...{title,subject, questions}}/>
        </div>
    );
}