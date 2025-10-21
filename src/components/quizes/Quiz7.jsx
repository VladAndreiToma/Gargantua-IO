import NavigationBar from "../../navigation/NavigationBar";
import QuizTemplate from "./QuizTemplate";

const title = "Quiz 7";
const subject = "Aspect about Time Dilation and Relativistic Effects";

const questions = [
  {
    question: "What is time dilation?",
    options: [
      "The speeding up of time due to motion",
      "The slowing down of time relative to another observer",
      "The disappearance of time at high velocities",
      "A distortion of time only in quantum systems"
    ],
    correct: 1,
  },
  {
    question: "According to Special Relativity, time dilation occurs because:",
    options: [
      "Light travels at different speeds in different frames",
      "The speed of light is constant for all observers",
      "Mass increases with velocity",
      "Gravity slows down clocks"
    ],
    correct: 1,
  },
  {
    question: "Which equation expresses time dilation in Special Relativity?",
    options: [
      "t' = t / √(1 - v²/c²)",
      "t' = t × (1 - v²/c²)",
      "t' = t × γ²",
      "t' = t / (1 + v/c)"
    ],
    correct: 0,
  },
  {
    question: "If a spaceship travels close to the speed of light, how does time pass for astronauts onboard compared to Earth observers?",
    options: [
      "Faster for astronauts",
      "Slower for astronauts",
      "Same for both",
      "Randomly varying"
    ],
    correct: 1,
  },
  {
    question: "Gravitational time dilation occurs because:",
    options: [
      "Gravitational fields change the speed of light",
      "Stronger gravity causes time to pass more slowly",
      "Gravity changes atomic structure",
      "Massive bodies absorb time"
    ],
    correct: 1,
  },
  {
    question: "Which experiment first confirmed time dilation using fast-moving particles?",
    options: [
      "Michelson–Morley experiment",
      "Hafele–Keating experiment",
      "Muon decay experiments",
      "Eddington solar eclipse observation"
    ],
    correct: 2,
  },
  {
    question: "In the Hafele–Keating experiment (flying atomic clocks around Earth), what was observed?",
    options: [
      "No time difference between clocks",
      "Clocks on planes showed both special and general relativistic effects",
      "Clocks ran faster on the ground only",
      "Only gravitational effects were measured"
    ],
    correct: 1,
  },
  {
    question: "Which effect combines both special and general relativistic time dilation?",
    options: [
      "Gravitomagnetic precession",
      "Twin paradox",
      "Frame dragging",
      "Cosmic expansion"
    ],
    correct: 1,
  },
  {
    question: "In the twin paradox, the traveling twin ages:",
    options: [
      "Faster than the one on Earth",
      "Slower than the one on Earth",
      "At the same rate",
      "Not at all"
    ],
    correct: 1,
  },
  {
    question: "What happens to time near a black hole's event horizon?",
    options: [
      "It speeds up",
      "It slows down drastically",
      "It reverses",
      "It disappears completely"
    ],
    correct: 1,
  },
  {
    question: "The gravitational time dilation near a Schwarzschild black hole is given by:",
    options: [
      "t' = t × √(1 - 2GM/rc²)",
      "t' = t / √(1 - 2GM/rc²)",
      "t' = t × (1 + 2GM/rc²)",
      "t' = t × γ"
    ],
    correct: 0,
  },
  {
    question: "If two observers are moving relative to each other, how does each perceive the other's clock?",
    options: [
      "Both see the other's clock running faster",
      "Both see the other's clock running slower",
      "Only one sees the effect",
      "Neither notices a difference"
    ],
    correct: 1,
  },
  {
    question: "Why do GPS satellites need relativistic corrections?",
    options: [
      "Because they are moving and in weaker gravity, both affecting their clock rates",
      "Because the Earth's magnetic field distorts time",
      "Because of quantum effects in atomic clocks",
      "Because of air resistance"
    ],
    correct: 0,
  },
  {
    question: "Which of the following best describes the combination of velocity and gravitational time dilation near a black hole?",
    options: [
      "Velocity dilation dominates always",
      "Gravitational dilation dominates near the horizon",
      "They exactly cancel each other",
      "Both are negligible"
    ],
    correct: 1,
  },
  {
    question: "From a distant observer’s perspective, an object falling into a black hole appears to:",
    options: [
      "Accelerate and vanish",
      "Slow down and freeze at the horizon",
      "Bounce back out",
      "Disappear instantly"
    ],
    correct: 1,
  }
];



export default function Quiz7(){
    return(
        <div className="page-container"> <NavigationBar/> <QuizTemplate {...{title, subject, questions}} /></div>
    )
}