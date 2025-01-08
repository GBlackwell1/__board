import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import "../App.css";
import { RootState } from '../redux/reduxTypes';

const selectState = (state: RootState) => state.itemSelected.itemSelected;
type Props = { id: string; };

const DropSection: React.FC<Props> = ({id}) => {
    const [mouseEnter, setMouseEnter] = useState<boolean>(false);
    const itemSelected = useSelector(selectState);
    let sectionRef = document?.getElementById(`${id}-section`);
    const parentElt = document?.getElementById("toplevel");

    sectionRef?.addEventListener("mouseup", () => {
        if (sectionRef && parentElt) {
            let parentPosition = parentElt.getBoundingClientRect();
            let sectionPosition = sectionRef.getBoundingClientRect();
            //let sectionWidth = window.getComputedStyle(sectionRef).width;
            
            
            if (mouseEnter && itemSelected)  
                sectionRef.innerHTML = itemSelected;
        }
    });

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