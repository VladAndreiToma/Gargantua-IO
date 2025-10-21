import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ScoreGauge({ score }) {
  return (
    <div style={{ width: 120, height: 120 }}>
      <CircularProgressbar 
        value={score} 
        maxValue={100}
        text={`${score}%`}
        styles={buildStyles({
          pathColor: `rgba(0, 200, 255, ${score / 100})`,
          textColor: '#00e1ff',
          trailColor: '#002244',
          textSize: '18px',
        })}
      />
    </div>
  );
}
