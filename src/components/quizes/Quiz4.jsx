import NavigationBar from "../../navigation/NavigationBar";
import QuizTemplate from "./QuizTemplate";

const title = "Quiz 4";
const subject = "Aspects about Accretion Disks and Astrophysical Jets";

const questions = [
  {
    question: "What primarily powers an accretion disk around a black hole?",
    options: [
      "Nuclear fusion in the disk",
      "Gravitational potential energy of infalling matter",
      "Dark matter interactions",
      "Magnetic monopoles"
    ],
    correct: 1,
  },
  {
    question: "The inner edge of an accretion disk is typically located at:",
    options: [
      "The Schwarzschild radius",
      "The innermost stable circular orbit (ISCO)",
      "The event horizon plus 1000 km",
      "The ergosphere boundary"
    ],
    correct: 1,
  },
  {
    question: "Which phenomenon causes heating of the accretion disk?",
    options: [
      "Viscous friction between orbiting gas layers",
      "Cosmic microwave background",
      "Hawking radiation",
      "Tidal disruption from nearby stars"
    ],
    correct: 0,
  },
  {
    question: "Jets are usually aligned along:",
    options: [
      "The black hole spin axis",
      "The galactic plane",
      "Random directions",
      "The accretion disk outer edge"
    ],
    correct: 0,
  },
  {
    question: "Which process is crucial in collimating astrophysical jets?",
    options: [
      "Strong magnetic fields threading the disk",
      "Radiation pressure alone",
      "Dark energy",
      "Neutrino emission"
    ],
    correct: 0,
  },
  {
    question: "Jets can reach relativistic speeds due to:",
    options: [
      "Conversion of rotational energy of the black hole",
      "Gravity alone",
      "Photon pressure",
      "Accretion disk cooling"
    ],
    correct: 0,
  },
  {
    question: "The temperature in the inner accretion disk is typically:",
    options: [
      "10³ K",
      "10⁶–10⁷ K",
      "Room temperature",
      "10⁹ K"
    ],
    correct: 1,
  },
  {
    question: "What kind of radiation is emitted from the hottest inner regions of the disk?",
    options: [
      "Infrared",
      "Ultraviolet and X-rays",
      "Radio waves",
      "Gravitational waves"
    ],
    correct: 1,
  },
  {
    question: "Which mechanism explains the extraction of rotational energy for jet formation in Kerr black holes?",
    options: [
      "Penrose process and Blandford–Znajek mechanism",
      "Schwarzschild collapse",
      "Hawking evaporation",
      "Tidal stripping"
    ],
    correct: 0,
  },
  {
    question: "Accretion disks can be geometrically:",
    options: [
      "Thin (Keplerian) or thick (advection-dominated)",
      "Only spherical",
      "Only toroidal",
      "Flat and static always"
    ],
    correct: 0,
  },
  {
    question: "Why are jets observed often in X-ray binaries and AGNs?",
    options: [
      "High accretion rates and magnetic field alignment",
      "Because of dark matter halos",
      "Due to cosmic microwave background",
      "Random chance"
    ],
    correct: 0,
  }
];

export default function Quiz4(){
    return(
            <div className="page-container">
                <NavigationBar/>
                <QuizTemplate {...{title,subject, questions}}/>
            </div>
        );
}