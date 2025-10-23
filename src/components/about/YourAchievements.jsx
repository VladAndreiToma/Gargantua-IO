import { useEffect } from "react";
import NavigationBar from "../../navigation/NavigationBar";
import ProgressGaugeTemplate from "./features/Progress GaugeTemplate";

function getMaxUnlockedQuiz(totalQuizes = 9 , prefix = 'quiz'){
    const unlockedQuizes = Object.keys(localStorage).filter((key)=>key.startsWith(prefix) && key.endsWith("_unlocked"))
    .map((key)=>{
        const match = key.match( new RegExp(`${prefix}-(\\d+)_unlocked`));
        return match ? parseInt(match[1],10) : 0;
    });
    return unlockedQuizes.length > 0 ? Math.max(...unlockedQuizes) : 0;
}

const additionalStyleForP = {
    display:"flex", flexDirection:"column", gap:'1.2rem', fontSize:'1.3rem',
    width:'80%', height:'auto', boxSizing:'border-box', padding:'2rem 2rem'
}


function howManyCoursesCompleted(totalCourse = 11){
    return Object.keys(localStorage).filter((key)=>key.startsWith("course_") && key.endsWith("_completed") && localStorage.getItem(key) === "true").length;
}

export default function YourAchievements(){
    let maxUnlocked = getMaxUnlockedQuiz();
    let maxCompleted = howManyCoursesCompleted();
    return(
        <div className="page-container">
            <NavigationBar/>
            <div className="about-scroller">
                <h1 className="chapter-title">Track your progress and see how well you're doing in Gargantua-IO</h1>
                <p style={additionalStyleForP}>
                    <l>Completed Courses</l>
                    <ProgressGaugeTemplate value={maxCompleted} maxValue={11}/>
                </p>
                <p style={additionalStyleForP}>
                    <l>Completed Quizes</l>
                    <ProgressGaugeTemplate value={maxUnlocked} maxValue={9}/>
                </p>
                <p style={additionalStyleForP}>
                    <l>Simulations interacted with</l>
                    <ProgressGaugeTemplate value={3} maxValue={5}/>
                </p>
            </div>
        </div>
    )
}