// React Imports
import React from 'react';

// Styles
import '../../Pages/Login/styles.css'
import profilePicture from '../../Resources/ProfilePicture.png';

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

export default function RegisterComponent(){
    // Enums
    enum FIELD {
        EMAIL,
        FIRSTNAME,
        LASTNAME,
        PASSWORD,
        SEX,
        BIRHTDAY
    }
    
    enum SEX{
        NONE = '',
        MALE = 'Male',
        FEMALE = 'Female',
        NOT_INFORM = 'I prefer not to inform'
    }
    
    // State
    const [submitted, setSubmitted] = React.useState(false);
    
    const [email, setEmail] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [sex, setSex] = React.useState('');
    const [birthday, setBirthday] = React.useState<Date | null>(new Date());

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

            case FIELD.FIRSTNAME:
                if (firstName.length === 0)
                    return 'First Name Required';
                else
                    return ''

            case FIELD.PASSWORD:
                if (password.length === 0)
                    return 'Password is required';
                else
                    return '';

            case FIELD.SEX:
                if (sex === SEX.NONE)
                    return 'Sex is required';
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
        <div className="componentContainer">
            <div className="componentWelcome">
                Welcome to mine, yours, our Social Network!
            </div>

            <form className='componentForm'>
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
                        error = {displayError(FIELD.FIRSTNAME)}
                        value={firstName}
                        onChange = {newValue => setFirstName(newValue.target.value)}
                        id="firstName"
                        label="First name"
                        helperText = {displayHelperText(FIELD.FIRSTNAME)}
                        variant="outlined"/>

                    <TextField 
                        id="lastName"
                        value={lastName}
                        onChange = {newValue => setLastName(newValue.target.value)}
                        error = {displayError(FIELD.LASTNAME)}
                        label="Last name"
                        helperText = {displayHelperText(FIELD.LASTNAME)}
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

                    <TextField
                        id="date"
                        label="Date of birth"
                        type="date"
                        value={birthday}
                        onChange = {newValue => {let newDate: Date | null; newDate = new Date(newValue.target.value); if (newDate.getFullYear() > 1000) setBirthday(newDate)}}
                        className = 'inputDate'
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                        />

                    <FormControl
                        variant="outlined"
                        error={displayError(FIELD.SEX)}>
                        <InputLabel id="demo-simple-select-error-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-error-label"
                            id="demo-simple-select-error"
                            value={sex}
                            onChange={newValue => setSex(newValue.target.value as string)}
                            >
                            <MenuItem value={SEX.NONE}>
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={SEX.MALE}>{SEX.MALE}</MenuItem>
                            <MenuItem value={SEX.FEMALE}>{SEX.FEMALE}</MenuItem>
                            <MenuItem value={SEX.NOT_INFORM}>{SEX.NOT_INFORM}</MenuItem>
                        </Select>
                        <FormHelperText>{displayHelperText(FIELD.SEX)}</FormHelperText>
                    </FormControl>

            </form>

            <div className = 'formSubmit'>
                <Button
                    variant="contained"
                    color="primary"
                    className='submitButton'
                    onClick = {handleRegister}>
                    Register
                </Button>
            </div>
        </div>
    );
}