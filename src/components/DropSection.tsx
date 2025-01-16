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
    const [topList, setTopList] = useState<string[]>([]);
    const [bottomList, setbottomList] = useState<string[]>([]);

    useEffect(() => {
        const sectionRef = document?.getElementById(`${id}-section`);
        function handleMouseMovement(event: MouseEvent) {
            setMousePos({x: event.clientX, y: event.clientY});
        }   

        function handleMouseUp() {
            if (sectionRef) {
                let sectionPosition = sectionRef.getBoundingClientRect();            
                if (mouseEnter && itemSelected && 
                    !topList.includes(itemSelected) && 
                    !bottomList.includes(itemSelected))  {
                    if (topList.length < 2) {
                        if ((mousePos.x-sectionPosition.x)-sectionPosition.width/2 < 0) 
                            setTopList([itemSelected, ...topList]);
                        else 
                            setTopList([...topList, itemSelected]);
                    } else if (bottomList.length < 2 && (mousePos.y-sectionPosition.y)-sectionPosition.height/2 > 0) {
                        if ((mousePos.x-sectionPosition.x)-sectionPosition.width/2 < 0)
                            setbottomList([itemSelected, ...bottomList]);
                        else if ((mousePos.x-sectionPosition.x)-sectionPosition.width/2 > 0)
                            setbottomList([...bottomList, itemSelected]);
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

    function widgetRender(list: string[], widget: string) {
        return (
            <div className="topWidgetStyles"
                            style={(list.length%2 !== 0) ? {flexBasis: "100%"} : {flexBasis: "50%"}}>
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