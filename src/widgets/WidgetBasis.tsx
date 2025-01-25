import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './WidgetBasis.css';

type Props = { header: string;
               deleteListItem: (header: string) => void;
 };

const WidgetBasis: React.FC<Props> = ({header, deleteListItem}) => {

    return (
        <div className="widgetStyles">
            <div className="widgetHeader">
                <h2>{header}</h2>
                <IconButton onClick={() => deleteListItem(header)}
                    style={{color: 'white'}}>
                    <DeleteIcon />
                </IconButton>
            </div>
        </div> 
    );
}

export default WidgetBasis;