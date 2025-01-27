import React from 'react';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './WidgetBasis.css';
const listItems: { ListItemName: string, Tags: [{TagName: string, TagColor: string}] }[] = require('../data/ListItems.json');

type Props = { header: string;
               deleteListItem: (header: string) => void;
};

const WidgetBasis: React.FC<Props> = ({header, deleteListItem}) => {
    let listItem = listItems.find((item: any) => item.ListItemName === header);
    let tags = listItem?.Tags;

    console.log(tags);

    return (
        <div className="widgetStyles">
            <div className="widgetHeader">
                <h2>{header}</h2>
                <IconButton onClick={() => deleteListItem(header)}
                    style={{color: 'white'}}>
                    <DeleteIcon />
                </IconButton>
            </div>
            <div className="widgetTagContainer">
                {tags?.map((tag, index) => 
                    <p key={index}
                        className='widgetBasisTags'
                        style={{backgroundColor: `var(--tag-${tag.TagColor})`}}>
                            {tag.TagName}
                    </p>)}
            </div>
        </div> 
    );
}

export default WidgetBasis;