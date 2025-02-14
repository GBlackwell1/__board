import React from "react";
import { WidgetProps } from "../../data/SectionObject";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import {
  Button,
  Dialog,
  InputLabel,
  LinearProgress,
  LinearProgressProps,
  MenuItem,
  linearProgressClasses,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./WeeklyTime.css";
import GlobalSettings from "../../data/GlobalSettings";
const globalSettings = new GlobalSettings();

type TimeProgressProps = LinearProgressProps & {
  value: number;
  times: number[];
};

const TimeProgress: React.FC<TimeProgressProps> = ({ times, value, ...props }) => {
  const ProgressStyled = styled(LinearProgress)(() => ({
    height: `${(value/Math.max(...times))*100}%`,
    borderRadius: "10px 10px 1px 1px",
    width: '20%',
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.23)",
    backgroundColor: "var(--background)",
    [`& .${linearProgressClasses.bar}`]: {
      background: "linear-gradient(135deg, var(--tag-green) 0%, #ffffff 5%)",
      height: `10000em`, 
    },
  }));
  return <ProgressStyled variant="determinate" value={100} {...props} />;
};

const WeeklyPersonalTime: React.FC<WidgetProps> = ({ buttonOpen, buttonPress }) => {
  let DateList: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let HourList: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [times, setTimes] = useState<number[]>(globalSettings.PersonalTime);

  function handleChange(event: SelectChangeEvent, index: number) {
    times[index] = parseInt(event.target.value);
    setTimes([...times]);
  }

  return (
    <div style={{height: '75%'}}>
      <Dialog
        open={buttonOpen}
        PaperProps={{
          sx: {
            backgroundColor: "var(--background)",
            color: "var(--header)",
            padding: "2em",
            fontFamily: "Open Sans",
          },
        }}
      >
        <h2>Weekly Personal Time</h2>
        <div className="dateListInput">
          {DateList.map((date, index) => {
            return (
              <div className="dateItem" key={index}>
                <InputLabel
                  id={`${index}-label`}
                  sx={{ color: "var(--header)" }}
                >
                  {date}
                </InputLabel>
                <Select
                  id={`${index}-select`}
                  sx={{
                    color: "var(--header)",
                    border: "1px solid rgba(255, 255, 255, 0.23)",
                    width: "60px",
                  }}
                  value={times[index].toString()}
                  onChange={(event: SelectChangeEvent) =>
                    handleChange(event, index)
                  }
                >
                  {HourList.map((hour, index) => {
                    return (
                      <MenuItem key={index} value={hour}>
                        {hour}
                      </MenuItem>
                    );
                  })}
                </Select>
              </div>
            );
          })}
        </div>
        <div className="buttonContainer">
          <Button
            onClick={() => {
              globalSettings.PersonalTime = times;
              buttonPress();
            }}
          >
            SUBMIT
          </Button>
          <Button onClick={buttonPress}>CANCEL</Button>
        </div>
      </Dialog>
      <section className="timeItemContainer">
        {globalSettings.PersonalTime.map((time, index) => {
          return (
            <div key={index} className="timeItem">
              <h3>{DateList[index]}</h3>
              <TimeProgress times={times} value={time} />
              <p>{time}hr</p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default WeeklyPersonalTime;
