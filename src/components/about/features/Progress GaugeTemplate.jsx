import { CircularProgressbar , buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ProgressGaugeTemplate({value,maxValue=9}){
    const percent = maxValue > 0 ? Math.round((value/maxValue)*100) : 0;
    return(
        <div style={{width:"100%", margin:'0 auto'}}>
            <CircularProgressbar value={percent} text={`${value}/${maxValue}`}
             styles={buildStyles({textColor:'#a0c4ff', pathColor:'#1e3a8a', trailColor:'#0f172a',strokeLinecap:'round', textSize:'20px'})}/>
        </div>
    );
}