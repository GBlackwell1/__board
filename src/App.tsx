import React, {useState} from 'react';
import './App.css';
import UI from './components/UI';
import DropSection from './components/DropSection';

const App: React.FC = () => {
  const drawerWidth: number = 190;
  const [open, setOpen] = useState<boolean>(false);
  // TODO: Make a list of all the elements in the board
  // TODO: Make sure the drawer opening is cohesive with the logo __board
  // TODO: Make sure individual elements support click and drag to additional elevations
  // TODO: Map sections
  const UIOpen = (openClick: boolean) => { setOpen(openClick); };
  /* Thoughts:
  * - Parent object for all widgets, will control API request rate (global settings instead?)
  * - Unsure of how to handle drag feature however for future, continuously divide the sections into halves based on the half in which the cursor is hovered in
  */
  return ( 
    <div>
      <UI openFunc={UIOpen} />
      <div 
        style={{marginLeft: open ? drawerWidth : 0, transition: 'margin-left 0.2s'}}
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
