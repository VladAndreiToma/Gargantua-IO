import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const components = ["Home", "Simulation", "Learning", "Quiz", "Gallery", "About"];
const logo = "/gargantua-logo.webp";

export default function NavigationBar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { const r = () => setIsMobile(window.innerWidth <= 768); window.addEventListener("resize", r); return () => window.removeEventListener("resize", r); }, []);
  useEffect(() => { const s = document.createElement("style"); s.innerHTML = `@keyframes slideIn{from{opacity:0;transform:translateX(100%);}to{opacity:1;transform:translateX(0);}}`; document.head.appendChild(s); return () => document.head.removeChild(s); }, []);

  return (
    <nav style={{position:"fixed",top:0,left:0,width:"100vw",height:"11vh",background:"linear-gradient(90deg,#0b0018 0%,#1b0033 50%,#002244 100%)",display:"flex",justifyContent:"center",alignItems:"center",padding:"0rem 2rem",color:"white",fontFamily:"'Orbitron',sans-serif",zIndex:10,boxShadow:"0 0 15px rgba(0,0,0,0.5)",boxSizing:"border-box"}}>
      <div style={{width:"50%", height:'100%',display:"flex",justifyContent:'flex-start'}}>
        <div style={{backgroundImage:`url(${logo})`,backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"left center",height:"100%",minWidth:"10vw"}}></div>
      </div>

      {isMobile ? (
        <>
          <div onClick={() => setMenuOpen(!menuOpen)} style={{fontSize:"1.5rem",transition:"transform 0.3s ease", display:"flex", alignItems:"center", justifyContent:"flex-end", width:'50%', height:'100%'}}>{menuOpen ? <FaTimes/> : <FaBars/>}</div>
          {menuOpen && (
            <div style={{position:"fixed",top:"11vh",right:0,width:"100vw",height:"89vh",background:"linear-gradient(160deg,rgba(20,0,40,1),rgba(0,0,0,1))",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"2.5rem",animation:"slideIn 0.4s ease forwards",overflowY:"none", zIndex:'10'}}>
              {components.map(c=>(
                <Link key={c} to={c==="Home" ? "/":`/${c.toLowerCase()}`} onClick={()=>setMenuOpen(false)} style={{color:"white",fontSize:"1.5rem",textDecoration:"none",transition:"color 0.3s ease,transform 0.2s ease"}} onMouseOver={e=>{e.target.style.color="#a855f7";e.target.style.transform="scale(1.1)";}} onMouseOut={e=>{e.target.style.color="white";e.target.style.transform="scale(1)";}}>{c}</Link>
              ))}
            </div>
          )}
        </>
      ) : (
        <div style={{display:"flex",gap:"2rem",width:"50%",height:"100%",alignItems:"center",justifyContent:"flex-end"}}>
          {components.map(c=>(
            <Link key={c} to={c==="Home" ? "/":`/${c.toLowerCase()}`} style={{color:"white",fontSize:"1rem",textDecoration:"none",transition:"color 0.3s ease"}} onMouseOver={e=>e.target.style.color="#a855f7"} onMouseOut={e=>e.target.style.color="white"}>{c}</Link>
          ))}
        </div>
      )}
    </nav>
  );
}
