import React from 'react';
import {Button, Tooltip} from '@mui/material';
const ListItem: React.FC = () => { 
    // TODO: Do some animation that shows dragability to spots on the board
    return ( 
        <div>
            <Tooltip title="List Item" placement='right'>
                <Button>ListItem</Button>
            </Tooltip>
        </div>
     );
};

export default ListItem;