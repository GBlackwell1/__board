import React, {useState} from 'react';
import { Drawer, Button, Paper } from "@mui/material";
import ListItem from '../widgets/ListItem';

const UI: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  // TODO: Make a list of all the elements in the board
  // TODO: Make sure the drawer opening is cohesive with the logo __board
  // TODO: Make sure individual elements support click and drag to additional elevations
  // TODO: Partition UI 
  return ( 
    <Paper>
      <Button onClick={() => setOpen(true)} >
        __Board
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <ListItem ListItemName='PLACEHOLDER'/>
      </Drawer>

    </Paper>
  );
}

export default UI;