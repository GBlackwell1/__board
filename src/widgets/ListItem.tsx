import React, {useRef} from 'react';
import {Button, Tooltip} from '@mui/material';
import { useDispatch } from 'react-redux';
// FIXME: Rapid and errative dragging causes the item to be lost
type Props = { ListItemName: string; };
const ListItem: React.FC<Props> = ({ListItemName}) => { 
    let dragItemRef = useRef<HTMLElement | null>(null);
    const dispatch = useDispatch();
    // Controls how the item is dragged
    /* FIXME: Mousemovement should be handled differently, thoughts:
    - When clicked logged the current item held in a global state file
    - When release, release that element on the page wherever it was being held */
    const onMouseDrag = (event: MouseEvent) => {
        const { movementX, movementY } = event;
        let computedStyle = window.getComputedStyle(dragItemRef.current as HTMLElement);
        let leftValue: number = parseInt(computedStyle.left);
        let topValue: number = parseInt(computedStyle.top);
        if (dragItemRef.current) {
            dragItemRef.current.style.left = `${leftValue + movementX}px`;
            dragItemRef.current.style.top = `${topValue + movementY}px`;
        }
    };
    // Below sets the item to be draggable and non-draggable
    const setClickedItem = () => {
        dispatch({type: 'itemSelected/listItemGrabbed', payload: ListItemName});
        dragItemRef.current = document.getElementById(`${ListItemName}-parent`);
        dragItemRef.current?.addEventListener("mousedown", () => {
            dragItemRef.current?.addEventListener("mousemove", onMouseDrag);
        });
    }
    document.addEventListener("mouseup", () => {
        dispatch({type: 'itemSelected/listItemDropped', payload: ListItemName});
        dragItemRef.current?.removeEventListener("mousemove", onMouseDrag);
    });
    // TODO: Do some animation that shows dragability to spots on the board
    return ( 
        <div id={`${ListItemName}-parent`}>
            <Tooltip title="List Item" placement='right'>
                <Button>ListItem</Button>
            </Tooltip>
            <Button id={`${ListItemName}-draggable`}
                onPointerDown={setClickedItem}>
                something
            </Button>
        </div>
     );
};

export default ListItem;