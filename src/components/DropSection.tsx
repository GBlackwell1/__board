import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "../App.css";
import { RootState } from '../redux/reduxTypes';
import { Button } from '@mui/material';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';

const selectState = (state: RootState) => state.itemSelected.itemSelected;
type Props = { id: string; };

const DropSection: React.FC<Props> = ({id}) => {
    const [mouseEnter, setMouseEnter] = useState<boolean>(false);
    const [mousePos, setMousePos] = useState<{x: number, y: number}>({x: 0, y: 0});
    const itemSelected = useSelector(selectState);
    const [topList, setTopList] = useState<string[]>([]);
    const [bottomList, setBottomList] = useState<string[]>([]);

    useEffect(() => {
        const sectionRef = document?.getElementById(`${id}-section`);
        function handleMouseMovement(event: MouseEvent) {
            setMousePos({x: event.clientX, y: event.clientY});
        }   

        // Handles dropping of widgets to respective board sections
        function handleMouseUp() {
            if (sectionRef) {
                let sectionPosition = sectionRef.getBoundingClientRect();            
                if (mouseEnter && itemSelected && 
                    !topList.includes(itemSelected) && 
                    !bottomList.includes(itemSelected))  {
                    /* If the widget does not exist prior, place it in the right quadrant based on mouse
                    *  x and y positions. Maximum of 2 widgets per half. */
                    if (topList.length < 2) {
                        if ((mousePos.x-sectionPosition.x)-sectionPosition.width/2 < 0) 
                            setTopList([itemSelected, ...topList]);
                        else 
                            setTopList([...topList, itemSelected]);
                    } else if (bottomList.length < 2 && (mousePos.y-sectionPosition.y)-sectionPosition.height/2 > 0) {
                        if ((mousePos.x-sectionPosition.x)-sectionPosition.width/2 < 0)
                            setBottomList([itemSelected, ...bottomList]);
                        else if ((mousePos.x-sectionPosition.x)-sectionPosition.width/2 > 0)
                            setBottomList([...bottomList, itemSelected]);
                    }   
                }
            }
        }

        window.addEventListener("mousemove", handleMouseMovement);
        sectionRef?.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMovement);
            sectionRef?.removeEventListener("mouseup", handleMouseUp);
        }
    }, [mouseEnter, mousePos, itemSelected, topList, bottomList, id]);

    function deleteListItem(widget: string) {
        if (topList.includes(widget)) setTopList(topList.filter((item) => item !== widget));
        else if (bottomList.includes(widget)) setBottomList(bottomList.filter((item) => item !== widget));   
    }

    function widgetRender(list: string[], widget: string) {
        return (
            <div className="topWidgetStyles"
                style={(list.length%2 !== 0) ? {flexBasis: "100%"} : {flexBasis: "50%"}}>
                <Button
                    onClick={() => deleteListItem(widget)}
                >
                    <DragIndicatorOutlinedIcon />
                </Button>
                {widget}
            </div> 
        )
    }

    return (
        <div 
            className="draggableSection" 
            id={`${id}-section`}
            onMouseEnter={() => {setMouseEnter(true)}}
            onMouseLeave={() => {setMouseEnter(false)}}    
        >
            <div className='topSection' style={(topList.length > 0) ? {height: "100%"} : {height: "auto"}}>
                {topList.map((widget) => {
                    return (( topList.length === 0) ? null : widgetRender(topList, widget)) 
                })}
            </div>
            <div className='bottomSection' style={(bottomList.length > 0) ? {height: "100%"} : {height: "auto"}}>
                {bottomList.map((widget) => {
                        return (( bottomList.length === 0) ? null : widgetRender(bottomList, widget))
                })}
            </div>
        </div>

    );
}
export default DropSection;