import React from 'react';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

type Props = {
    title: string;
    message: string;
    close: () => void;
    isOpen: () => boolean;
}

const InputAlert: React.FC<Props> = ({title, message, close, isOpen}) => {
    return (
        <Dialog
            open={isOpen()}
            onClose={() => close()}
        >
            <DialogTitle>{title}</DialogTitle>
            {message}
        </Dialog>
    );
}

export default InputAlert;