// React Imports
import React from 'react';

// Styles
import '../../Pages/Login/styles.css'

// Material-UI Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

// Components

// Model

// Services
import {Utilities} from '../../Services/Utilities';

// Icons

export default function LoginComponent(){
    // Enums
    enum FIELD {
        EMAIL,
        FIRSTNAME,
        LASTNAME,
        PASSWORD,
        SEX,
        BIRHTDAY
    }

    // State
    const [submitted, setSubmitted] = React.useState(false);
    
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    // Functions and consts
    const displayError = (field: FIELD): boolean => {
        return displayHelperText(field).length > 0;
    }

    const displayHelperText = (field: FIELD): string => {
        if (!submitted)
            return '';

        switch (field){
            case FIELD.EMAIL:
                if (!Utilities.validateEmail(email))
                    return 'Email address is not valid';
                else
                    return '';

            case FIELD.PASSWORD:
                if (password.length === 0)
                    return 'Password is required';
                else
                    return '';

            default:
                return '';
        }
    }    
    
    async function handleRegister () {
        setSubmitted(true);
    }
    
    return(
        <div className="componentContainer componentLoginContainer">
            <div className="componentWelcome">
                Good to see you again. Welcome!
            </div>

            <form className="componentForm componentLoginForm">
                <TextField
                    required
                    error = {displayError(FIELD.EMAIL)}
                    value={email}
                    onChange = {newValue => setEmail(newValue.target.value)}
                    id="email"
                    label="E-mail"
                    helperText = {displayHelperText(FIELD.EMAIL)}
                    variant="outlined"/>

                <TextField 
                    required
                    error = {displayError(FIELD.PASSWORD)}
                    value={password}
                    onChange = {newValue => setPassword(newValue.target.value)}
                    id="password"
                    label="Password"
                    type="password"
                    helperText = {displayHelperText(FIELD.PASSWORD)}
                    variant="outlined"/>

            </form>

            <div className="formSubmit">
                <Button
                    variant="contained"
                    color="primary"
                    className='submitButton'
                    onClick = {handleRegister}>
                    Login
                </Button>
            </div>

        </div>
    );
}