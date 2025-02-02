import React, { ChangeEvent } from 'react';
import { useState } from 'react';
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
    const [file, setFile] = useState<File | null | undefined>(null);

    const LoadFile = (value: ChangeEvent) => {
        if (value.target) {
            const newFile: File | null | undefined = (value.target as HTMLInputElement).files?.item(0);
            setFile(newFile);
            
            if (newFile) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const JSONData = JSON.parse(e.target?.result as string);
                        console.log(JSONData);
                        localStorage.setItem('boardObject', JSON.stringify(JSONData));
                        alert('File loaded successfully!');
                    } catch (error) {
                        alert("Error parsing JSON: "+error);
                        
                    }
                };
                reader.readAsText(newFile);
            }
        }
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
                <div className='uploadButton'>
                    <Button 
                        style={{width: '100%', height: '100%'}}
                        onClick={() => document.getElementById('fileInput')?.click()}
                    >
                        {!file ? <FileUploadIcon style={{color: 'rgba(255, 255, 255, 0.2)'}} /> : null}
                        <p>{file?.name}</p>
                    </Button>
                    <input id="fileInput" type="file" accept='.json' onChange={(value) => LoadFile(value)}/>
                    
                </div>
                <div className="buttonContainer">
                    <Button onClick={() => window.location.reload()}>SUBMIT</Button>
                    <Button onClick={close}>CANCEL</Button>
                </div>
            </div>
        </Dialog>
    );
}

export default LoadAlert;