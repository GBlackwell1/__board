import React, { ChangeEvent } from 'react';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import './LoadAlert.css';
import { Button } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { MapObject } from '../data/SectionObject';

type Props = {
    title: string;
    message: string;
    close: () => void;
    isOpen: () => boolean;
}

const LoadAlert: React.FC<Props> = ({title, message, close, isOpen}) => {
    const [file, setFile] = useState<File | null | undefined>(null);
    const [JSONString, setJSONString] = useState<string>("{}");

    function expectedFormat(data: any): data is MapObject {
        for (const [key, value] of data) {
            if (typeof key !== 'string' || typeof value !== 'object') {
                return false;
            }
        }
        return true;
    }

    const LoadFile = (value: ChangeEvent) => {
        if (value.target) {
            const newFile: File | null | undefined = (value.target as HTMLInputElement).files?.item(0);
            if (newFile) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const JSONData: JSON = JSON.parse(e.target?.result as string);
                        let FormatData: any = new Map(Object.entries(JSONData));
                        if (expectedFormat(FormatData)) {
                            setFile(newFile);
                            setJSONString(JSON.stringify(JSONData));
                            alert('File loaded successfully!');
                        } else {
                            throw(new Error("JSON is of incorrect format!"));
                        }
                        
                    } catch (error) {
                        alert("Error parsing JSON: "+error);
                    }
                };
                reader.readAsText(newFile);
            }
        }
    }

    const HandleSubmit = () => {
        if (file !== null) {
            localStorage.setItem('boardObject', JSONString);
            window.location.reload()
        } else {
            alert("File not loaded!");
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
                    <Button onClick={() => HandleSubmit()}>SUBMIT</Button>
                    <Button onClick={close}>CANCEL</Button>
                </div>
            </div>
        </Dialog>
    );
}

export default LoadAlert;