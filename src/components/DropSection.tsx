import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "../App.css";
import { RootState } from '../redux/reduxTypes';

const selectState = (state: RootState) => state.itemSelected.itemSelected;
type Props = { id: string; };

const DropSection: React.FC<Props> = ({id}) => {
    const [mouseEnter, setMouseEnter] = useState<boolean>(false);
    const [mousePos, setMousePos] = useState<{x: number, y: number}>({x: 0, y: 0});
    const itemSelected = useSelector(selectState);
    const [widgetList, setWidgetList] = useState<Map<number, string>>(new Map());
    const [bottomRender, setBottomRender] = useState<boolean>(false);

    // top-left: 0
    // top-right: 1
    // bottom-left: 2
    // bottom-right: 3

    useEffect(() => {
        const sectionRef = document?.getElementById(`${id}-section`);
        const parentElt = document?.getElementById("toplevel");
        function handleMouseMovement(event: MouseEvent) {
            setMousePos({x: event.clientX, y: event.clientY});
        }   

        function handleListChange(position: number) {
            if (itemSelected) {
                setWidgetList(widgetList => new Map(widgetList.set(position, itemSelected)));
            }
        }
        
        // Awful but lets write the logic out for right now
        function handleMouseUp() {
            if (sectionRef && parentElt) {
                let sectionPosition = sectionRef.getBoundingClientRect();            
                if (mouseEnter && itemSelected)  {
                    if (widgetList.size < 2) {
                        if ((mousePos.x-sectionPosition.x)-sectionPosition.width/2 < 0) {
                            handleListChange(0);
                            console.log("Dropped "+itemSelected+" on top-left");
                        } else {
                            handleListChange(1);
                            console.log("Dropped "+itemSelected+" on top-right");
                        }
                    }
                    else if (widgetList.size < 4) {
                        if ((mousePos.x-sectionPosition.x)-sectionPosition.width/2 < 0) {
                            if ((mousePos.y-sectionPosition.y)-sectionPosition.height/2 < 0) {
                                handleListChange(0);
                                console.log("Dropped "+itemSelected+" on top-left");
                            } else {
                                setBottomRender(true);
                                handleListChange(2);
                                console.log("Dropped "+itemSelected+" on bottom-left");
                            }
                        } else {
                            if ((mousePos.y-sectionPosition.y)-sectionPosition.height/2 < 0) {
                                handleListChange(1);
                                console.log("Dropped "+itemSelected+" on top-right");
                            } else {
                                setBottomRender(true);
                                handleListChange(3);
                                console.log("Dropped "+itemSelected+" on bottom-right");
                            }
                        }
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

    }, [mouseEnter, mousePos, itemSelected, widgetList, id]);

    function widgetRender(key: number, widget: string) {
        return (
            <div key={key} className="topWidgetStyles"
                            style={(widgetList.size%2 !== 0) ? {flexBasis: "100%"} : {flexBasis: "50%"}}>
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
            <div className='topSection'>
                { (Array.from(widgetList)
                .sort(([a], [b]) => a - b)
                .map(([key, widget]) => {
                    return ((key < 2) ? widgetRender(key, widget) : null)
                })) }
            </div>
            <div className='bottomSection' style={(bottomRender) ? {height: "100%"} : {height: "auto"}}>
                { (Array.from(widgetList)
                .sort(([a], [b]) => a - b)
                .map(([key, widget]) => {
                    return ((key >= 2) ? widgetRender(key, widget) : null)
                })) }
            </div>
        </div>

    );
}
export default DropSection;