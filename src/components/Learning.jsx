import { Link } from "react-router-dom";
import NavigationBar from "../navigation/NavigationBar";
import { FaArrowRight } from "react-icons/fa6";

const topics = [
  "Introduction", 
  "Spacetime and General Relativity", 
  "Schwarzschild Geometry",
  "Kerr Black Holes", 
  "Accretion Disks and Jets",
  "Gravitational Lensing", 
  "Black Hole Mergers", 
  "Time Dilation and Relativistic Effects",
  "Information Paradox and Hawking Radiation", 
  "Numerical Relativity",
  "Interstellar and Gargantua Model"
];

export default function Learning() {
  // funcție mică pt convertit titlul în slug (link friendly)
  const toSlug = (title) => 
    title.toLowerCase()
         .replace(/[^\w\s-]/g, "") // scoate caractere speciale
         .trim()
         .replace(/\s+/g, "-"); // înlocuiește spațiile cu -

  return (
    <div className="page-container">
      <NavigationBar />
      <div className="page-scroller">
        {topics.map((topic, idx) => {
          const slug = toSlug(topic);
          return (
            <div key={idx} className="glass-box">
              <label>{idx + 1}. {topic}</label>
              <Link to={`/learning/${slug}`} style={{color:'#eee',textDecoration:"none"}}>
                <FaArrowRight style={{ width: "1.3rem", height: "1.3rem" }} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
