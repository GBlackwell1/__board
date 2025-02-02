import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "../App.css";
import { RootState } from '../redux/reduxTypes';
import WidgetBasis from '../widgets/WidgetBasis';
import SectionObject from '../data/SectionObject';

const selectState = (state: RootState) => state.itemSelected.itemSelected;
type Props = { id: string; };


const DropSection: React.FC<Props> = ({id}) => {
    const [mouseEnter, setMouseEnter] = useState<boolean>(false);
    const [mousePos, setMousePos] = useState<{x: number, y: number}>({x: 0, y: 0});
    const [sectionObject, setSectionObject] = useState<SectionObject>(new SectionObject(id));
    const itemSelected = useSelector(selectState);

    useEffect(() => {
        const sectionRef = document?.getElementById(`${id}-section`);
        function handleMouseMovement(event: MouseEvent) {
            setMousePos({x: event.clientX, y: event.clientY});
        }   

        // Handles dropping of widgets to respective board sections
        function handleMouseUp() {
            if (sectionRef) {
                let sectionPosition = sectionRef.getBoundingClientRect();
                if (mouseEnter && itemSelected) {
                    const isLeft = (mousePos.x - sectionPosition.x) < sectionPosition.width / 2;
                    const isTop = (mousePos.y - sectionPosition.y) <= sectionPosition.height / 2;
                    sectionObject.AddtoList(isTop, isLeft, itemSelected);
                }
            }
        }

        window.addEventListener("mousemove", handleMouseMovement);
        sectionRef?.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMovement);
            sectionRef?.removeEventListener("mouseup", handleMouseUp);
        }
    }, [mouseEnter, mousePos, itemSelected, sectionObject, id]);
    
    function widgetRender(widget: string) {
        return (
            <WidgetBasis 
                key={`${widget}-${id}`} 
                header={widget} 
                deleteListItem={sectionObject.DeleteFromList} 
            />
        )
    }

    return (
        <div 
            className="draggableSection" 
            id={`${id}-section`}
            onMouseEnter={() => {setMouseEnter(true)}}
            onMouseLeave={() => {setMouseEnter(false)}}
            style={(sectionObject.TopList.length === 0 && sectionObject.TopList.length === 0) ? {} : {background: "none"}}    
        >
            <div className='topSection' style={(sectionObject.TopList.length > 0) ? {height: "100%"} : {height: "auto"}}>
                {sectionObject.TopList.map((widget) => {
                    return ((sectionObject.TopList.length === 0) ? null : widgetRender(widget)) 
                })}
            </div>
            <div className='bottomSection' style={(sectionObject.BottomList.length > 0) ? {height: "100%"} : {height: "auto"}}>
                {sectionObject.BottomList.map((widget) => {
                        return ((sectionObject.TopList.length === 0) ? null : widgetRender(widget))
                })}
            </div>
        </div>
    );
}
export default DropSection;