import NavigationBar from "../navigation/NavigationBar";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

const quizes = [
    "Quiz 1",
    "Quiz 2",
    "Quiz 3",
    "Quiz 4",
    "Quiz 5",
    "Quiz 6", "Quiz 7", "Quiz 8", "Quiz 9"
]

const quizTopics = [
    "Space Time and General Relativity",
    "Schwarzschild Geometry",
    "Kerr Black Holes",
    "Jets and Accretion Disks",
    "Gravitational Lensing",
    "Mergers of Black Hole",
    "Relativistic Effects and the Time Dilation",
    "Information Paradox and Hawking Radiation",
    "Numerical Relativity"
]
export default function Quiz(){

    const toSlug = (title) => 
    title.toLowerCase()
         .replace(/[^\w\s-]/g, "") // scoate caractere speciale
         .trim()
         .replace(/\s+/g, "-"); // înlocuiește spațiile cu -

    return(
        <div className="page-container">
            <NavigationBar/>
            <div className="page-scroller">
                {
                    quizTopics.map((topic, idx)=>{
                        const slug = toSlug(quizes[idx])
                        return(
                            <div key={idx} className="glass-box">
                                <label>{quizes[idx]}. {topic}</label>
                                <Link to={`/quiz/${slug}`}  style={{color:'#eee',textDecoration:"none"}}>
                                    <FaArrowRight style={{width:"1.3rem", height:'1.3rem'}}/>
                                </Link>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}