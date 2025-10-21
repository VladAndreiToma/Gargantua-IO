import NavigationBar from "../../navigation/NavigationBar";
import QuizTemplate from "./QuizTemplate";

export default function Quiz1(){
    
    const title = "Quiz 1";
    const subject = "Aspects about General Relativity";
    const questions = [
    // Easy
    {
        question: "What is spacetime?",
        options: [
        "A separate dimension from space",
        "A 4D continuum combining space and time",
        "The same as classical space",
        "Only the time dimension"
        ],
        correct: 1,
    },
    {
        question: "Who formulated General Relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Galileo Galilei"],
        correct: 1,
    },
    // Medium
    {
        question: "What causes gravitational time dilation?",
        options: [
        "High velocity relative to an observer",
        "Strong gravitational fields",
        "Temperature differences",
        "Magnetic fields"
        ],
        correct: 1,
    },
    {
        question: "Which phenomenon is predicted by General Relativity?",
        options: [
        "Photoelectric effect",
        "Gravitational lensing",
        "Quantum entanglement",
        "Chemical bonding"
        ],
        correct: 1,
    },
    // Hard
    {
        question: "Einstein Field Equations relate:",
        options: [
        "Mass and energy to spacetime curvature",
        "Charge distribution to magnetic field",
        "Wave functions to probability densities",
        "Momentum to velocity"
        ],
        correct: 0,
    },
    {
        question: "What is the Schwarzschild radius?",
        options: [
        "The size of the universe",
        "The radius of a black hole’s event horizon",
        "Distance light travels in one year",
        "Radius of atomic nucleus"
        ],
        correct: 1,
    },
    {
        question: "What happens to light near a massive object?",
        options: [
        "Its speed changes",
        "It follows a curved path",
        "It disappears",
        "It becomes polarized"
        ],
        correct: 1,
    },
    {
        question: "Frame-dragging effects occur due to:",
        options: [
        "Moving charges",
        "Rotating massive objects",
        "Temperature gradients",
        "Quantum fluctuations"
        ],
        correct: 1,
    },
    {
        question: "What is a geodesic in spacetime?",
        options: [
        "The shortest path in flat space only",
        "The path of least resistance for particles",
        "The natural path an object follows under gravity alone",
        "A curve connecting black holes"
        ],
        correct: 2,
    },
    {
        question: "Which experiment confirmed General Relativity via light bending?",
        options: [
        "Michelson-Morley experiment",
        "Eddington's 1919 solar eclipse observation",
        "Double-slit experiment",
        "Hafele–Keating experiment"
        ],
        correct: 1,
    },
    ];

    return(
        <div className="page-container">
            <NavigationBar/>
            <QuizTemplate {...{title,subject, questions}}/>
        </div>
    )
}