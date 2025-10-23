import NavigationBar from "../../../navigation/NavigationBar";
import SpaceTimeFabric from "./SpaceTimeFabric";

export default function SpaceTime(){
    return(
        <div className="page-container">
            <NavigationBar/>
            <div className="simulation-scroller">
                <h1 className="chapter-title">Topic 4 - SpaceTime Fabric and Geodezic Curvatures</h1>
                <SpaceTimeFabric/>
            </div>
        </div>
    )
}