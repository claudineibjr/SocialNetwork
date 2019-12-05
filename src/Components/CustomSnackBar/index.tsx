// React Imports
import React from 'react';

// Styles
import './styles.css'

// Material-UI Components
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

// Components

// Model

// Services

// Icons
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

// Enums
export enum VARIANT {
    WARNING = 'warning',
    SUCCESS = 'success',
    ERROR = 'error',
    INFO = 'info'
}

interface IProps {
    text: string;
    handleClose?: () => void;
    variant: VARIANT;
    show: boolean;
}

export default function CustomSnackBar(props: IProps){
    const { text, handleClose, variant, show } = props;

    let icon;
    switch(variant){
        case VARIANT.WARNING:
            icon = <WarningIcon/>;  break;
        case VARIANT.SUCCESS:
            icon = <CheckCircleIcon/>;  break;
        case VARIANT.ERROR:
            icon = <ErrorIcon/>;  break;
        case VARIANT.INFO:
            icon = <InfoIcon/>;  break;
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={show}
            autoHideDuration={8000}
            onClose={handleClose}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={   <span id="message-id" className='message'>
                            {icon}
                            {text}
                        </span>}
            action={[
                /*<Button key="undo" color="secondary" size="small" onClick={handleClose}>
                    UNDO
                </Button>,*/
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    className='close'
                    onClick={handleClose}>
                <CloseIcon />
                </IconButton>,
            ]}
            className={'SnackBar ' + variant} 
            />
    );
}