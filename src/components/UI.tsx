import React from 'react';
import { Drawer, Divider } from "@mui/material";
import ListItem from '../widgets/ListItem';
import ListItems from '../data/ListItems.json';
import "./UI.css";

type UIProps = {
  open: boolean;
}

const UI: React.FC<UIProps> = ({open}) => {
  const WorkItems = ListItems.filter(listItem => listItem.ListItemSection.toLowerCase() === 'work');
  const PersonalItems = ListItems.filter(listItem => listItem.ListItemSection.toLowerCase() === 'personal');
  const StatisticsItems = ListItems.filter(listItem => listItem.ListItemSection.toLowerCase() === 'statistics');
  const WorkflowItems = ListItems.filter(listItem => listItem.ListItemSection.toLowerCase() === 'workflow');
  const APIItems = ListItems.filter(listItem => listItem.ListItemSection.toLowerCase() === 'apis');
  
  return ( 
    <div id="UI">   
      <Drawer 
        id="drawer"
        open={open} 
        anchor='left'
        variant='persistent'
        PaperProps={{
          sx: { marginTop: '2%',
                backgroundColor: 'var(--background)',
                color: 'var(--header)',
           }
        }}
      >
          {/* WORK SECTION */}
          <Divider />
          <h4>Work</h4>
          { 
            WorkItems.map(listItem => 
              <ListItem 
                key={`${listItem.ListItemName}-${listItem.ListItemSection}`}
                ListItemName={listItem.ListItemName}
                ListItemDescription={listItem.ListItemDescription}
                ListItemSection={listItem.ListItemSection}
              />
            )
          }
          {/* PERSONAL SECTION */}
          <Divider />
          <h4>Personal</h4>
          { 
            PersonalItems.map(listItem => 
              <ListItem 
                key={`${listItem.ListItemName}-${listItem.ListItemSection}`}
                ListItemName={listItem.ListItemName}
                ListItemDescription={listItem.ListItemDescription}
                ListItemSection={listItem.ListItemSection}
              />
            )
          }
          {/* STATISTICS SECTION */}
          <Divider />
          <h4>Statistics</h4>
          { 
            StatisticsItems.map(listItem => 
              <ListItem 
                key={`${listItem.ListItemName}-${listItem.ListItemSection}`}
                ListItemName={listItem.ListItemName}
                ListItemDescription={listItem.ListItemDescription}
                ListItemSection={listItem.ListItemSection}
              />
            )
          }
          {/* WORKFLOW SECTION */}
          <Divider />
          <h4>Workflow</h4>
          { 
            WorkflowItems.map(listItem => 
              <ListItem 
                key={`${listItem.ListItemName}-${listItem.ListItemSection}`}
                ListItemName={listItem.ListItemName}
                ListItemDescription={listItem.ListItemDescription}
                ListItemSection={listItem.ListItemSection}
              />
            )
          }
          {/* APIS SECTION */}
          <Divider />
          <h4>APIs</h4>
          {
            APIItems.map(listItem => 
              <ListItem 
                key={`${listItem.ListItemName}-${listItem.ListItemSection}`}
                ListItemName={listItem.ListItemName}
                ListItemDescription={listItem.ListItemDescription}
                ListItemSection={listItem.ListItemSection}
              />
            )
          }
      </Drawer>
    </div>
  );
}

export default UI;