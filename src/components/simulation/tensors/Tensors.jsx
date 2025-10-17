import NavigationBar from "../../../navigation/NavigationBar";
import GenericTensorBuilder from "./GenericTensorBuilder";
import SingleTensorVisualizer from "./SingleTensorVisualizer";

export default function Tensors(){
    return(
        <div className="page-container">
            <NavigationBar/>
            <div className="simulation-scroller">
                <h1 className="chapter-title">Topic 1 - Tensor Visualization</h1>
                <p>A tensor can be thought of as a structured mapping between geometric directions and physical magnitudes — a mathematical object that encodes how a quantity responds to changes in spatial orientation.</p>
                <SingleTensorVisualizer/>
                <p>You can have NORMAL components that are eigen values of your orthonormal system of reference and form the main diagonal where i = j = k and shear temrs where indices differ from each other and they are a measure of a qunatity in crossdependence.<br/>
                    Since is a matrix of vectors you can reduce it into planes of each indices: i j k for any valuea of i j and k in (x,y,z)
                </p>
                <GenericTensorBuilder/>
                <p>
                    As described earlier in the first simulation the magnitude of a physical quantity can change with respect to an evolution of the system in space or time or both. We say that it undergoes changes.
                    The rate at which these changes occur are measured with the well known differential equations which in most of the cases link space-related evolutions to time-related ones. 
                </p>
            </div>
        </div>
    )
}