import React, {useRef} from 'react';
import {IconButton, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import '../App.css';
import './ListItem.css';

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

    return ( 
        <div className="DraggableListItemParent">
            <h5>{ListItemName}</h5>
            <Tooltip title={ListItemDescription} placement='right'>
                <IconButton id={`${ListItemName}-draggable`}
                    onPointerDown={setClickedItem}
                    style={{cursor: 'grab', color: 'white'}}
                    >
                    <DragIndicatorOutlinedIcon />
                </IconButton>
            </Tooltip>
        </div>
     );
};

export default ListItem;