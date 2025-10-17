import NavigationBar from "../../../navigation/NavigationBar";
import GravitySimulator from "./GravitySimulator";

export default function Gravity(){
    return(
        <div className="page-container">
            <NavigationBar/>
            <div className="simulation-scroller">
                <h1 className="chapter-title">Topic 3 - Gravity & Gravitational Force Field</h1>
                <GravitySimulator/>
            </div>
        </div>
    )
}