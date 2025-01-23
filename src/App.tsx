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
      <div className="UIContainer"
        style={{width: !open ? drawerWidth : 0}}>
        <UI openFunc={UIOpen} />
      </div>
      <div 
        style={{marginLeft: open ? drawerWidth : 0}}
        className="boardContainer">
            <div className="boardHeader">
              <h2>__Board</h2>
            </div>
            <div  className="draggableParent">
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
