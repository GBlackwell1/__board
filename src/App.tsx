import React, {useState} from 'react';
import './App.css';
import UI from './components/UI';
import DropSection from './components/DropSection';
import { Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const App: React.FC = () => {
  let drawerWidth: number = 188; 
  const [open, setOpen] = useState<boolean>(false);
  /* Thoughts:
  * - Parent object for all widgets, will control API request rate (global settings instead?)
  */
  return ( 
    <div id="toplevel">
      
      <div className="boardContainer">
        <div className="boardHeader">
          <Button onClick={() => setOpen(!open)} >
            <MenuIcon style={{color: 'white'}}/>
          </Button>
          <h3>__Board</h3>
        </div>
        <div className="draggableParent"
             style={{marginLeft: open ? drawerWidth : 0, transition: 'margin-left 0.24s'}}>
          <UI open={open}/>    
          <DropSection id="NW"/>
          <DropSection id="NE"/>
          <DropSection id="SW"/>
          <DropSection id="SE"/>
        </div>
      </div>
      
    </div>
  );
}
export default App;
