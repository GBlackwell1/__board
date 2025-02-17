import React, { useEffect } from "react";
import GlobalSettings from "../../data/GlobalSettings";
import { styled } from "@mui/material/styles";
import "./TimePercentages.css";
import { LinearProgress, linearProgressClasses} from "@mui/material";
const globalSettings = new GlobalSettings();

const TimePercentages: React.FC = () => {
    const [total, setTotal] = React.useState<number>(0);
    let wTime: number = 0;
    
    useEffect(() => {
      let daysCounted = 0;
      wTime = 0;
      for (let i = 0; i < globalSettings.WorkTime.length; i++) {
        if (globalSettings.WorkTime[i] + globalSettings.PersonalTime[i] > 0) {
          wTime +=
            globalSettings.WorkTime[i] /
            (globalSettings.WorkTime[i] + globalSettings.PersonalTime[i]);
          daysCounted++;
        }
      }
      setTotal((wTime / daysCounted) * 100);
    }, [globalSettings.PersonalTime, globalSettings.WorkTime]);

    const ProgressStyled = styled(LinearProgress)(() => ({
        height: `20%`,
        borderRadius: "5px",
        width: '100%',
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.23)",
        backgroundColor: "var(--tag-green)",
        [`& .${linearProgressClasses.bar}`]: {
          background: "linear-gradient(135deg, var(--tag-blue) 0%, #ffffff 5%)",
          height: `10000em`, 
        },
    }));

    return (
      <div style={{height: '100%', marginBottom: '1em'}} className="timePercentages">
        <p>{Math.round(total)}%</p>
        <ProgressStyled value={total} variant="determinate" />
        <p>{Math.round(100-total)}%</p>
      </div>
    );
}

export default TimePercentages;