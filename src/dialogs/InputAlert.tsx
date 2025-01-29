import React from 'react';
import { useState } from 'react';
import { APIRefreshRateList } from '../redux/features/APIRefreshSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reduxTypes';
import Dialog from '@mui/material/Dialog';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import './InputAlert.css';

const rateState = (state: RootState) => state.APIRefresh.APIRefresh;
type Props = {
    title: string;
    message: string;
    close: () => void;
    isOpen: () => boolean;
}

const InputAlert: React.FC<Props> = ({title, message, close, isOpen}) => {
    const dispatch = useDispatch();
    const rateSelected: number | null = useSelector(rateState);

    const [selectedRate, setSelectedRate] = useState<number>(rateSelected ? rateSelected : 15);

    const handleChange = (
        event: React.MouseEvent<HTMLElement>, 
        newRate: number
    ) => {
        if (newRate !== selectedRate && newRate !== null) {
            setSelectedRate(newRate);
            dispatch({type: `APIRefresh/${newRate}`, payload: newRate});
        }
    };
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
                <ToggleButtonGroup
                    exclusive
                    value={selectedRate}
                    onChange={handleChange}
                >
                    {APIRefreshRateList.map((rate, index) => {
                        return (
                            <ToggleButton 
                                key={index} 
                                value={rate}
                                color='primary'
                                sx={{
                                    color: 'var(--header)', 
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    padding: '2em',
                                }}>
                                {rate}
                            </ToggleButton>
                        );
                    })}
                </ToggleButtonGroup>
            </div>
        </Dialog>
    );
}

export default InputAlert;