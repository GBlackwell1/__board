import React from "react";
import { WidgetProps } from "../../data/SectionObject";
import { useState } from "react"; 
import { Button, Dialog, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './WeeklyDevTime.css';
import GlobalSettings from "../../data/GlobalSettings";
const globalSettings = new GlobalSettings();

/**
 * Thoughts on how to implement this widget:
 * - If button is pressed make a new dialog that allows the user to enter the total number of time they worked for the week
 * - If the user has already entered the time, display the time they entered
 * - Similar loading mechanism to the section, parse and serialize java 
 */
const WeeklyDevTime: React.FC<WidgetProps> = ({buttonOpen, buttonPress}) => {
    let DateList: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let HourList: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const [times, setTimes] = useState<number[]>(globalSettings.WorkTime);

    function handleChange(event: SelectChangeEvent, index: number) { 
        times[index] = parseInt(event.target.value);
        setTimes([...times]);
    }

    return (
        <div>
        <Dialog 
            open={buttonOpen} 
            PaperProps={{
                sx: {
                    backgroundColor: 'var(--background)',
                    color: 'var(--header)',
                    padding: '2em',
                    fontFamily: 'Open Sans',
                }
            }}
        >
            <h2>Time Entry Alert</h2>
            <div className="dateListInput">
                {DateList.map((date, index) => {
                    return (
                      <div className="dateItem" key={index}>
                        <InputLabel id={`${index}-label`} sx={{color: "var(--header)"}}>{date}</InputLabel>
                        <Select
                          id= {`${index}-select`}
                          sx={{
                            color: "var(--header)",
                            border: "1px solid rgba(255, 255, 255, 0.23)",
                            width: "60px",
                          }}
                          value={times[index].toString()}
                          onChange={(event: SelectChangeEvent) => handleChange(event, index)}
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
                <Button onClick={() => {globalSettings.WorkTime = times; buttonPress()}}>SUBMIT</Button>
                <Button onClick={buttonPress}>CANCEL</Button>
            </div>
        </Dialog>
        {globalSettings.WorkTime}
        </div>
    );
}

export default WeeklyDevTime;