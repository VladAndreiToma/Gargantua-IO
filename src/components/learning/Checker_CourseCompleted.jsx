import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function CheckerCourseCompleted(){
    // i check location first dinamically from url
    const location = useLocation();
    const [completed, setCompleted] = useState(false);
    // take last part
    const whatCourseUrl = location.pathname.split("/").filter(Boolean).pop();
    const assignedStorageKey = `course_${whatCourseUrl}_completed`;

    useEffect(()=>{
        const saved = localStorage.getItem(assignedStorageKey);
        if(saved) setCompleted(true);  // if i have the entry key if not completed stays false
    },[assignedStorageKey]);

    const markCompleted = ()=>{
        localStorage.setItem(assignedStorageKey,"true");
        setCompleted(true);
    };

    if(completed)
        return(
            <div style={{fontSize:'1.2rem', fontWeight:"bold", display:"flex", flexDirection:'column',justifyContent:"center", alignItems:"center", gap:'1rem'}}>
                <FaCheckCircle style={{width:'2rem', height:'2rem'}}/>
                <l>Course Completed</l>
            </div>
        )
    return(
        <div>
            <button className="mark-completed-button" style={{fontSize:'1rem'}} onClick={markCompleted}>Mark as Completed</button>
        </div>
    )

}   