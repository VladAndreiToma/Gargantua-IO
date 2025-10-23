import { FaDiscord, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import NavigationBar from "../../navigation/NavigationBar";
import { FaTiktok, } from "react-icons/fa6";

const additionalStyleForP = {
    display:"flex", justifyContent:'center', alignItems:'center', flexDirection:'column', fontSize:'1.3rem', gap:'1.5rem',
}
const rowsOfSocialFollow = {
    display:"flex", justifyContent:'center', flexDirection:'row', fontSize:'2rem', gap:'1.5rem', alignItems:'center', fotWeight: '900'
}
export default function AppVersion(){
    return(
        <div className="page-container">
            <NavigationBar/>
            <div className="about-scroller">
                <p style={additionalStyleForP}>
                   <l style={{fontWeight:'900'}}>Gargantua-IO</l>
                   <l>Copyright October 2025</l>
                   <l>All rights reserverd to Gargantua-IO</l>
                   <l>All contents are proprietary to Gargantua-IO</l>
                </p>
                <p style={additionalStyleForP}>
                    <l>Powered by the idea of gamifying learning nontheless hard subjects in physics</l>
                    <l>Aiming to combine relativistic physics with heuristics and visual interpretations</l>
                </p>
                <p style={additionalStyleForP}>
                    <l>Follow us on social media:</l>
                    <div style={rowsOfSocialFollow}><FaInstagram/><FaFacebook/><FaTwitter/><FaTiktok/></div>
                    <l>Also check out our community:</l>
                    <div style={rowsOfSocialFollow}><FaDiscord/></div>
                </p>
            </div>
        </div>
    )
}