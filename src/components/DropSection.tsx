import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import "../App.css";
import { RootState } from '../redux/reduxTypes';
import WidgetBasis from '../widgets/WidgetBasis';

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
                if (mouseEnter && itemSelected && !topList.includes(itemSelected) && !bottomList.includes(itemSelected)) {
                    const isLeft = (mousePos.x - sectionPosition.x) < sectionPosition.width / 2;
                    const isBottom = (mousePos.y - sectionPosition.y) > sectionPosition.height / 2;

                    if (topList.length < 2 && !isBottom) {
                        setTopList(isLeft ? [itemSelected, ...topList] : [...topList, itemSelected]);
                    } else if (bottomList.length < 2 && isBottom) {
                        setBottomList(isLeft ? [itemSelected, ...bottomList] : [...bottomList, itemSelected]);
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

    function swapLists(newTopList: string[], newBottomList: string[]) {
        setTopList(newTopList);
        setBottomList(newBottomList);
    }
    
    // Delete a widget from the list and if necessary swap lists
    function deleteListItem(widget: string) {
        const newTopList = topList.filter((item) => item !== widget);
        const newBottomList = bottomList.filter((item) => item !== widget);

        setTopList(newTopList);
        setBottomList(newBottomList);

        if (newTopList.length === 0 && newBottomList.length > 0)
            swapLists([...newBottomList], []);
    }
    
    function widgetRender(list: string[], widget: string) {
        return (
            <WidgetBasis 
                key={`${widget}-${id}`} 
                header={widget} 
                deleteListItem={deleteListItem} 
            />
        )
    }

    return (
        <div 
            className="draggableSection" 
            id={`${id}-section`}
            onMouseEnter={() => {setMouseEnter(true)}}
            onMouseLeave={() => {setMouseEnter(false)}}
            style={(topList.length === 0 && bottomList.length === 0) ? {} : {background: "none"}}    
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