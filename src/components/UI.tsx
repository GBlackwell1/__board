import React, {useState } from 'react';
import { Drawer, Button } from "@mui/material";
import ListItem from '../widgets/ListItem';

type UIProps = {openFunc: (open: boolean) => void;};

const UI: React.FC<UIProps> = ({ openFunc }) => {
  const [open, setOpen] = useState<boolean>(false);
  // TODO: Make a list of all the elements in the board
  // TODO: Make sure the drawer opening is cohesive with the logo __board
  // TODO: Make sure individual elements support click and drag to additional elevations
  // TODO: Partition UI  
  function UIOpen(open: boolean) { 
    setOpen(open);
    openFunc(open);
  }
  return ( 
    <div>
      <Button onClick={() => UIOpen(true)} >
        __Board
      </Button>
      <Drawer 
        open={open} 
        anchor='left'
        variant='persistent'>
          <div>
            <Button onClick={() => UIOpen(false)}>
              XBOARD
            </Button>
          </div>
        <ListItem ListItemName='PLACEHOLDER'/>
      </Drawer>
    </div>
  );
}

export default UI;