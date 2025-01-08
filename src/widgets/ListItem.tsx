import React, {useRef} from 'react';
import {Button, Tooltip} from '@mui/material';
import { useDispatch } from 'react-redux';
// FIXME: Rapid and errative dragging causes the item to be lost
type Props = { ListItemName: string; };
const ListItem: React.FC<Props> = ({ListItemName}) => { 
    let dragItemRef = useRef<HTMLElement | null>(null);
    const dispatch = useDispatch();
    
    // Below sets the item to be draggable and non-draggable
    const setClickedItem = () => {
        dispatch({type: 'itemSelected/listItemGrabbed', payload: ListItemName});
        dragItemRef.current = document.getElementById(`${ListItemName}-parent`);
    }
    document.addEventListener("mouseup", () => {
        dispatch({type: 'itemSelected/listItemDropped', payload: ListItemName});
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