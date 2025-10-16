import {Link} from "react-router-dom";
import NavigationBar from "../navigation/NavigationBar";
import { FaCaretRight, FaArrowRight } from "react-icons/fa6";

const simulations = [
    "Tensors",
    "Temperature And Entropy",
    "Gravity",
    "Spacetime",
    "Ray Tracing and Light",
];

export default function Simulation(){
    
    const toSlug = (title) => {
       return title.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
    }
    
    return(
        <div className="page-container">
            <NavigationBar/>
            <div className="page-scroller">
                {simulations.map((topic,idx)=>{
                    const slug = toSlug(topic);
                    return(
                        <div key={idx} className="glass-box">
                            <label>{idx+1}. {topic}</label>
                            <Link to={`/simulation/${slug}`} style={{color:'#eee', textDecoration:"none"}}>
                                <FaArrowRight style={{width:'1.3rem', height:'1.3rem',}}/>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}