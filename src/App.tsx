import React, {useState, useEffect } from 'react';
import './App.css';
import UI from './components/UI';

const App: React.FC = () => {  // React.FC <= function component
  const [open, setOpen] = useState<boolean>(false);
  // TODO: Make a list of all the elements in the board
  // TODO: Make sure the drawer opening is cohesive with the logo __board
  // TODO: Make sure individual elements support click and drag to additional elevations
  // TODO: Partition UI 
  // TODO: Map sections

  /* Thoughts:
  * - Parent object for all widgets, will control API request rate (global settings instead?)
  * - Unsure of how to handle drag feature however for future, continuously divide the sections into halves based on the half in which the cursor is hovered in
  */
  return ( 
    <div>
      <UI />
      <div className="draggableParent">
        <div className="draggableSection">DraggableSection</div>
        <div className="draggableSection">DraggableSection</div>
        <div className="draggableSection">DraggableSection</div>
        <div className="draggableSection">DraggableSection</div>
      </div>
 
    </div>
  );
}
export default App;
