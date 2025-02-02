import React from 'react';
import Dialog from '@mui/material/Dialog';
import './InputAlert.css';
import { Button } from '@mui/material';

type Props = {
    title: string;
    message: string;
    close: () => void;
    isOpen: () => boolean;
}

const SaveAlert: React.FC<Props> = ({title, message, close, isOpen}) => {
    function handleSave() {
        let JSONObj: JSON = JSON.parse(localStorage.getItem('boardObject') || '{}');
        const jsonString = JSON.stringify(JSONObj);
        const blob = new Blob([jsonString], { type: 'application/json' });
        // Create a link element to programtically download the file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'board.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <Dialog
            open={isOpen()}
            onClose={() => close()}
            PaperProps={{
                sx: {
                    backgroundColor: 'var(--background)',
                    color: 'var(--header)',
                    padding: '2em',
                    fontFamily: 'Open Sans',
                }
            }}>
            <h2>{title}</h2>
            {message}
            <div className='buttonGroupStyles'>
                <Button onClick={() => handleSave()}>YES</Button>
                <Button onClick={close}>CANCEL</Button>
            </div>
        </Dialog>
    );
}

export default SaveAlert;