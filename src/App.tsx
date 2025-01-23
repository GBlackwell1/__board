import React, {useState} from 'react';
import './App.css';
import UI from './components/UI';
import DropSection from './components/DropSection';

const App: React.FC = () => {
  let drawerWidth: number = 188;
    
  const [open, setOpen] = useState<boolean>(false);
  // TODO: Make sure the drawer opening is cohesive with the logo __board
  const UIOpen = (openClick: boolean) => { 
    setOpen(openClick); 
  };
  /* Thoughts:
  * - Parent object for all widgets, will control API request rate (global settings instead?)
  */
  return ( 
    <div id="toplevel">
      <UI openFunc={UIOpen} />
      <div 
        style={{marginLeft: open ? drawerWidth : 0, transition: 'margin-left 0.24s'}}
        className="draggableParent">
            <DropSection id="NW"/>
            <DropSection id="NE"/>
            <DropSection id="SW"/>
            <DropSection id="SE"/>
        </div>
        
    </div>
  );
}
export default App;
