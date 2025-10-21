import NavigationBar from "../../navigation/NavigationBar";
import QuizTemplate from "./QuizTemplate";

export default function Quiz2(){
    
    const title = "Quiz 2";
const subject = "Aspects about Schwarzschild Geometry";
    const questions = [
  {
    question: "What does the Schwarzschild solution describe?",
    options: [
      "A rotating black hole",
      "A non-rotating, spherically symmetric black hole",
      "A charged black hole",
      "A neutron star only"
    ],
    correct: 1,
  },
  {
    question: "What is the Schwarzschild radius?",
    options: [
      "The radius of the singularity",
      "The radius of the event horizon",
      "The radius where light speed changes",
      "The distance to the nearest star"
    ],
    correct: 1,
  },
  {
    question: "What happens to time near a Schwarzschild radius?",
    options: [
      "It speeds up compared to distant observers",
      "It slows down compared to distant observers",
      "It stops completely for all observers",
      "It becomes imaginary"
    ],
    correct: 1,
  },
  {
    question: "Which component of the Schwarzschild metric represents radial distance?",
    options: [
      "g_tt",
      "g_rr",
      "g_theta_theta",
      "g_phi_phi"
    ],
    correct: 1,
  },
  {
    question: "What is the innermost stable circular orbit (ISCO) for a Schwarzschild black hole?",
    options: [
      "2 GM/c²",
      "3 GM/c²",
      "6 GM/c²",
      "9 GM/c²"
    ],
    correct: 2,
  },
  {
    question: "Which of these phenomena can be explained using Schwarzschild geometry?",
    options: [
      "Gravitational lensing",
      "Magnetic reconnection",
      "Quantum entanglement",
      "Nuclear fusion in stars"
    ],
    correct: 0,
  },
  {
    question: "What happens at r = 0 in the Schwarzschild solution?",
    options: [
      "Nothing special, space is flat",
      "It’s the event horizon",
      "A singularity where curvature becomes infinite",
      "Circular orbit is stable"
    ],
    correct: 2,
  },
  {
    question: "Which effect describes the precession of planetary orbits near a massive object?",
    options: [
      "Lense-Thirring precession",
      "Perihelion precession",
      "Thomas precession",
      "Geodetic precession"
    ],
    correct: 1,
  }
];

    return(
        <div className="page-container">
            <NavigationBar/>
            <QuizTemplate {...{title,subject, questions}}/>
        </div>
    )
}