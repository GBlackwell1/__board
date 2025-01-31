import React from 'react';
import Dialog from '@mui/material/Dialog';
import './LoadAlert.css';
import { Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

type Props = {
    title: string;
    message: string;
    close: () => void;
    isOpen: () => boolean;
}

const LoadAlert: React.FC<Props> = ({title, message, close, isOpen}) => {
    function handleLoad() {
       
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
            <div className='uploadGroupStyles'>
                <div>
                    <Button 
                        style={{width: '100%', height: '100%'}}
                        onClick={() => handleLoad()}
                    >
                        <FileUploadIcon sx={{color: 'rgba(255, 255, 255, .2)'}}/>
                    </Button>
                </div>
                <Button style={{margin:'1em'}}onClick={close}>CANCEL</Button>
            </div>
        </Dialog>
    );
}

export default LoadAlert;