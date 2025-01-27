import React from 'react';
import { Drawer, Divider, DividerProps } from "@mui/material";
import ListItem from '../widgets/ListItem';
import ListItems from '../data/ListItems.json';
import "./UI.css";

type UIProps = {
  open: boolean;
}

const LocalDivider: React.FC<DividerProps> = ({children}) => {
  return (
    <Divider 
      sx={{ 
        color: 'var(--header)', 
        fontWeight: 'bold',  
        margin: "1em", 
        '&::before, &::after': {
          borderColor: 'rgba(255, 255, 255, 0.9)'
        }
        }}  
        textAlign='left' 
      >
      {children}
    </Divider>
  );
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
          sx: { marginTop: '2em',
                backgroundColor: 'var(--background)',
                color: 'var(--header)',
           }
        }}
      >
          {/* WORK SECTION */}
          <LocalDivider>WORK</LocalDivider>
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
          <LocalDivider>PERSONAL</LocalDivider>
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
          <LocalDivider>STATISTICS</LocalDivider>
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
          <LocalDivider>WORKFLOW</LocalDivider>
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
          <LocalDivider>APIS</LocalDivider>
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