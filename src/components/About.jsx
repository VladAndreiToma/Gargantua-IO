import { FaArrowRight } from "react-icons/fa6";
import NavigationBar from "../navigation/NavigationBar";
import { Link } from "react-router-dom";
import { FaDiscord, FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa6";
const topics = [
    "Your Achievements",
    "Science News",
]

function slugGenerator(inputName){
    return inputName.toLowerCase().replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
}   

const fastStyle = {
    display:"flex", boxSizing:"border-box", padding:'0rem 2rem', flexDirection:"column", alignItems:"center", textAlign:"center",
    padding:'1rem 1rem', width:'90%', gap:'0.5rem',
}
const rowsOfSocialFollow = {
    display:"flex", justifyContent:'center', flexDirection:'row', fontSize:'1.8rem', gap:'1.5rem', alignItems:'center', fotWeight: '900'
}

export default function About(){
    return(
        <div className="page-container">
            <div className="page-scroller">
                {
                    topics.map((t, idx)=>
                        {return(<div key={idx} className="glass-box"><label>{t}</label>
                            <Link to={`${slugGenerator(t)}`}  style={{color:"#fff", textDecoration:'none'}}>
                                <FaArrowRight style={{width:'1.3rem', height:'1.3rem'}}/>
                            </Link>
                            </div>)})
                }
                <div style={fastStyle}>
                    <l>Interesting things on social media:</l>
                    <div style={rowsOfSocialFollow}><FaInstagram/><FaFacebook/><FaTwitter/><FaTiktok/></div>
                    <l>Growing community on Discord Servers:</l>
                    <div style={rowsOfSocialFollow}><FaDiscord/></div>
                </div>
            </div>
            <NavigationBar/>
        </div>
    )
}