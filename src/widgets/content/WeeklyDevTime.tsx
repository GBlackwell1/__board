import React from "react";
import { WidgetProps } from "../../data/SectionObject";
import { useState } from "react"; 
import { Dialog, MenuItem } from "@mui/material";
import Select from '@mui/material/Select';
import './WeeklyDevTime.css';

/**
 * Thoughts on how to implement this widget:
 * - If button is pressed make a new dialog that allows the user to enter the total number of time they worked for the week
 * - If the user has already entered the time, display the time they entered
 * - Similar loading mechanism to the section, parse and serialize java 
 */
const WeeklyDevTime: React.FC<WidgetProps> = ({buttonOpen, buttonPress}) => {
    let DateList: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let HourList: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

    return (
        <Dialog 
            open={buttonOpen} 
            // onClick={buttonPress}
            PaperProps={{
                sx: {
                    backgroundColor: 'var(--background)',
                    color: 'var(--header)',
                    padding: '2em',
                    fontFamily: 'Open Sans',
                }
            }}
        >
            <div>Time Entry Alert</div>
            <div className="dateListInput">
                {DateList.map((date, index) => {
                    return (
                        <div className="dateItem" key={index}>
                            <label>{date}</label>
                            <Select> 
                                {HourList.map((hour, index) => {
                                    return (<MenuItem key={index} value={hour}>{hour}</MenuItem>)
                                })}
                            </Select>
                        </div>
                    )
                })}
            </div>
        </Dialog>
    );
}

export default WeeklyDevTime;