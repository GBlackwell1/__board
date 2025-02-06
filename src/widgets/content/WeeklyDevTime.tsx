import React from "react";
import { WidgetProps } from "../../data/SectionObject";
import LoadAlert from "../../dialogs/LoadAlert";

const WeeklyDevTime: React.FC<WidgetProps> = ({buttonPress}) => {
    return (
        buttonPress ? <p>Lorum Ipsum</p> : null
    );
}

export default WeeklyDevTime;