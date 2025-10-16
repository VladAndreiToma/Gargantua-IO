import NavigationBar from "../../../navigation/NavigationBar";
import GenericTensorBuilder from "./GenericTensorBuilder";

export default function Tensors(){
    return(
        <div className="page-container">
            <NavigationBar/>
            <div className="simulation-scroller">
                <div className="chapter-title">Chapter 1 - Tensor Visualization</div>
                <GenericTensorBuilder/>
            </div>
        </div>
    )
}