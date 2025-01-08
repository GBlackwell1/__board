import React, {useRef} from 'react';
import {Button, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import '../App.css';

type Props = { 
    ListItemName: string; 
    ListItemDescription: string;
    ListItemSection: string; // Unsure if required at this level 
 };
const ListItem: React.FC<Props> = ({ListItemDescription, ListItemName, ListItemSection}) => { 
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
        <div className="DraggableListItemParent">
            <Button>{ListItemName}</Button>
            <Tooltip title={ListItemDescription} placement='right'>
                <Button id={`${ListItemName}-draggable`}
                    onPointerDown={setClickedItem}>
                    <DragIndicatorOutlinedIcon />
                </Button>
            </Tooltip>
            
        </div>
     );
};

export default ListItem;