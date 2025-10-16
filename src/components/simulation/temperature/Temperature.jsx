import NavigationBar from "../../../navigation/NavigationBar";
import BlackBodyRadiation from "./BlackBodyRadiation";

export default function Temperature(){
    return(
        <div className="page-container">
            <NavigationBar/>
            <div className="simulation-scroller">
                <div className="chapter-title">Chapter 2 - Temperature & Entropy Visualization</div>
                <BlackBodyRadiation/>
            </div>
        </div>
    )
}