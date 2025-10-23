import NavigationBar from "../navigation/NavigationBar";
const bh1 = '/black-hole1.jpeg';
const bh2 = '/black-hole2.jpeg';
const bh3 = '/black-hole3.jpeg';
const bh4 = '/black-hole4.jpeg';
const bh0 = '/black-hole0.jpeg';
const bh5 = '/black-hole5.jpeg';
export default function Gallery(){
    return(
        <div className="page-container">
            <NavigationBar/>
            <div className="gallery-row">
                <div className="gallery-child-vertical-scroller">
                    <img src={bh1} alt="black hole 1" className="picture-style"/>
                    <img src={bh2} className="picture-style"/>
                    <img src={bh5} className="picture-style"/>
                </div>
                <div className="gallery-child-vertical-scroller">
                    <img src={bh3} className="picture-style"/>
                    <img src={bh4} className="picture-style"/>
                    <img src={bh0} className="picture-style"/>
                </div>
            </div>
        </div>
    )
}