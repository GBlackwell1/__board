import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "../App.css";
import { RootState } from '../redux/reduxTypes';

const selectState = (state: RootState) => state.itemSelected.itemSelected;
type Props = { id: string; };

const DropSection: React.FC<Props> = ({id}) => {
    const [elementState, setElementState] = useState<number>(0);
    const [mouseEnter, setMouseEnter] = useState<boolean>(false);
    const [mousePos, setMousePos] = useState<{x: number, y: number}>({x: 0, y: 0});
    const itemSelected = useSelector(selectState);
    

    useEffect(() => {
        const sectionRef = document?.getElementById(`${id}-section`);
        const parentElt = document?.getElementById("toplevel");

        function handleMouseMovement(event: MouseEvent) {
            setMousePos({x: event.clientX, y: event.clientY});
        }   

        function handleMouseUp() {
            if (sectionRef && parentElt) {
                let sectionPosition = sectionRef.getBoundingClientRect();            
                if (mouseEnter && itemSelected)  {
                    // TODO: Logic for determining movement of widget sections
                    // Probably need a switch case statement here
                    if ((mousePos.x-sectionPosition.x)-sectionPosition.width/2 < 0)
                        console.log("Dropped "+itemSelected+" on left");
                    else
                        console.log("Dropped "+itemSelected+" on right");
                    setElementState(elementState + 1);
                    sectionRef.innerHTML = itemSelected;
                }
            }
        }

        window.addEventListener("mousemove", handleMouseMovement);
        sectionRef?.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMovement);
            sectionRef?.removeEventListener("mouseup", handleMouseUp);
        }

    }, [mouseEnter, mousePos, itemSelected, elementState, id]);

    return (
        <div 
            className="draggableSection" 
            id={`${id}-section`}
            onMouseEnter={() => {setMouseEnter(true)}}
            onMouseLeave={() => {setMouseEnter(false)}}    
        >
            DraggableSection
        </div>
    );
}
export default DropSection;