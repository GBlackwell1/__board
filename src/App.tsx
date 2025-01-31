import React, {useState} from 'react';
import './App.css';
import UI from './components/UI';
import DropSection from './components/DropSection';
import { IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from './redux/reduxTypes';
import MenuIcon from '@mui/icons-material/Menu';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InputAlert from './dialogs/InputAlert';
import SaveAlert from './dialogs/SaveAlert';
import LoadAlert from './dialogs/LoadAlert';

const App: React.FC = () => {
  let drawerWidth: number = 205; 
  const [open, setOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [saveOpen, setSaveOpen] = useState<boolean>(false);
  const [loadOpen, setLoadOpen] = useState<boolean>(false);
  const selectState = (state: RootState) => state.APIRefresh.APIRefresh;
  const getAlertOpen = () => { return dialogOpen; }
  const getSaveOpen = () => { return saveOpen; }
  const getLoadOpen = () => { return loadOpen; }

  return ( 
    <div id="toplevel">
      <InputAlert 
        title="API Refresh Rate" 
        message="Please choose the refresh rate for __Board API calls" 
        close={() => setDialogOpen(false)} 
        isOpen={getAlertOpen}
      />
      <SaveAlert
        title="Save __Board" 
        message="Would you like to save your current __Board layout to JSON?" 
        close={() => setSaveOpen(false)} 
        isOpen={getSaveOpen}
      />
      <LoadAlert
        title="Load __Board" 
        message="Drop your __Board JSON file here or click to upload." 
        close={() => setLoadOpen(false)} 
        isOpen={getLoadOpen}
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
            <IconButton onClick={() => setLoadOpen(!loadOpen)} > 
              <FileUploadIcon style={{color: 'white'}}/>
            </IconButton>
            <IconButton onClick={() => setSaveOpen(!saveOpen)} >
              <SaveIcon style={{color: 'white'}}/>
            </IconButton>
            <IconButton onClick={() => setDialogOpen(!dialogOpen)}>
              <p>{useSelector(selectState)}</p>
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
