import NavigationBar from "../navigation/NavigationBar";

export default function Home() {
  return (
    <div style={{display:"flex",minHeight:"100vh", height:"auto",background:"radial-gradient(circle at 30% 40%, #1b0033, #002244 70%, #000 100%)", width:'100vw'}}>
      <NavigationBar/>
      <div style={{flex:1,display:"flex", flexDirection:'column',alignItems:"center",justifyContent:"flex-start", gap:'5vh', boxSizing:"border-box", paddingTop:'7rem', paddingBottom:'5rem', height:"auto"}}>
        <div className="glass-box">
          <label style={{fontSize:'1.8rem'}}><b>GargantuaIO</b></label>
          <label style={{fontSize:'1.4rem', fontStyle:"italic"}}>Where Physics Meets Visualization</label>
          <label>Hi there, I am Gargantua! I provide a real time simulation engine that brings the physics of black holes to life.</label>
          <label>Watch light bend under gravity, observe spacetime distort and explore how massive objects shape the universe around them</label>
          <label>Powered by <b>WebGL</b>, <b>Three.js</b> and <b>GPU-accelerated physics.</b></label>
        </div>
        <div className="glass-box">
          <label style={{fontSize:'1.8rem'}}><b>Who am I?</b></label>
          <label>I am an application originated from the idea of turning complex astrophysical phenomena into interactive, visual experiences.</label>
          <label>The goal is to merge scientific accuracy with modern web technologies - making cosmic mechanics not unly understandable but beautiful. </label>
          <label>I was built from the ground up to demonstrate how relativity, light and gravity interact in ways that challenge human intuition.</label>
        </div>
        <div className="glass-box">
          <label style={{fontSize:'1.8rem'}}><b>Mission...</b></label>
          <label>To make the invisible visible</label>
          <label>Creating an environment where anyone - from students to researchers - can explore the behavior of black holes in real time</label>
          <label>I aim to bridge science and visualization, giving users a way to feel the laws of physics through interaction, not just equations</label>
          <label>Every simulation follows physical-based models, simplified just enough to run smoothly online - but accurate enough to inspire real scientific curiosity</label>
        </div>
        <div className="glass-box">
          <label style={{fontSize:'1.8rem'}}><b>What I provide...</b></label>
          <ul className="features-list">
            <li><b>Black Hole Collision Simulation:</b><br/>Observe mergers and gravitational waves visualized in real-time.</li>
            <li><b>Light Raytracing & Gravitational Lensing:</b><br/>See how light bends and warps as it passes near.</li>
            <li><b>Spacetime Distortion Visualization:</b><br/>Interactive warping of space using dynamic field rendering.</li>
            <li><b>Accretion Disk Modeling:</b><br/>Simulated particle flows and radiation effects around singularities.</li>
            <li><b>Customizable Parameters:</b><br/>Adjust gravity strength, mass ratios, orbital velocity, and time dilation.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
