import React, {useState} from 'react';
import './App.css';
import UI from './components/UI';
import DropSection from './components/DropSection';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import InputAlert from './dialogs/InputAlert';

const App: React.FC = () => {
  let drawerWidth: number = 205; 
  const [open, setOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
 
  const getAlertOpen = () => { return dialogOpen; }

  return ( 
    <div id="toplevel">
      <InputAlert 
        title="API Refresh Rate" 
        message="Please choose the refresh rate for __Board API calls" 
        close={() => setDialogOpen(false)} 
        isOpen={getAlertOpen}
      />
      <div className="boardContainer">
        <div className="boardHeader">
          <div className="boardHeaderLeft">
            <IconButton onClick={() => setOpen(!open)} >
              <MenuIcon style={{color: 'white'}}/>
            </IconButton>
            <h3>__Board</h3>
          </div>
          <div className="boardHeaderRight">
            <IconButton >
              <SaveIcon style={{color: 'white'}}/>
            </IconButton>
            <IconButton onClick={() => setDialogOpen(!dialogOpen)}>
              <RefreshIcon style={{color: 'white'}}/>
            </IconButton>
          </div>
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
