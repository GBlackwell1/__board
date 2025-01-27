import React, { useRef, useState } from 'react';
import {IconButton, Tooltip } from '@mui/material';
import { useDispatch } from 'react-redux';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import '../App.css';
import './ListItem.css';
import { Opacity } from '@mui/icons-material';

type Props = { 
    ListItemName: string; 
    ListItemDescription: string;
    ListItemSection: string; // Unsure if required at this level 
};

const ListItem: React.FC<Props> = ({ListItemDescription, ListItemName, ListItemSection}) => { 
    let dragItemRef = useRef<HTMLElement | null>(null);
    const [hover, setHover] = useState<boolean>(false);
    const dispatch = useDispatch();
    
    // Below sets the item to be draggable and non-draggable
    const setClickedItem = () => {
        dispatch({type: 'itemSelected/listItemGrabbed', payload: ListItemName});
        dragItemRef.current = document.getElementById(`${ListItemName}-parent`);
    }
    document.addEventListener("mouseup", () => {
        dispatch({type: 'itemSelected/listItemDropped', payload: ListItemName});
    });

    const listItemStyle = {
        cursor: 'grab', 
        color: 'var(--background)',
        opacity: hover ? 1 : 0.0,
        transition: 'opacity 0.1s ease-in-out' // Add this line for the transition
    };

    return ( 
        <div className="DraggableListItemParent"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <h5>{ListItemName}</h5>
            <Tooltip title={ListItemDescription} placement='right'>
                <IconButton 
                    id={`${ListItemName}-draggable`}
                    onPointerDown={setClickedItem}
                    style={listItemStyle}
                    >
                    <DragIndicatorOutlinedIcon />
                </IconButton>
            </Tooltip>
        </div>
     );
};

export default ListItem;