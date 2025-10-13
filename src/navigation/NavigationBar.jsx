import { useState, useEffect, useEffectEvent } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

const components = ["Home", "Simulation", "About"];

export default function NavigationBar(){
    const [isMobile, setIsMobile] = useState(window.innerWidth<=768);   // true daca e telefon
    const [menuOpen, setMenuOpen] = useState(false);
    
    useEffectEvent(()=>{
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            window.addEventListener("resize",handleResize);
            return()=>window.removeEventListener("resize", handleResize);
        }
    },[]);

    return(
        <nav className="navbar">
            <div className="navbar-logo">Gargantua</div>
            {isMobile ? (
                <>
                <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </div>
                {menuOpen && (
                    <div className="dropdown-menu">
                    {components.map((comp) => (
                        <Link key={comp} to={`/${comp.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                        {comp}
                        </Link>
                    ))}
                    </div>
                )}
                </>
            ) : (
                <div className="nav-links">
                {components.map((comp) => (
                    <Link key={comp} to={`/${comp.toLowerCase()}`}>
                    {comp}
                    </Link>
                ))}
                </div>
            )}
        </nav>
    );
}