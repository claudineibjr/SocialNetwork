// React Imports
import React, {Component} from 'react';

// Redux
import { connect } from 'react-redux';
import * as Actions from '../../Store/actions';
import { IStore } from '../../Store/index';

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
import User from '../../Model/User';

// Icons


// Enums
enum FIELD {
    EMAIL,
    FIRSTNAME,
    LASTNAME,
    PASSWORD,
    SEX,
    BIRHTDAY
}

// Interfaces
interface IProps {
    userAuthenticated?: User
}

interface IState {
    submitted: boolean,
    email: string,
    password: string
}

class LoginComponent extends Component<IProps, IState>{
    constructor(props: IProps){
        super(props);

        this.state = {
            submitted: false,
            email: '',
            password: ''
        };
    }
    
    // Functions and consts
    displayError = (field: FIELD): boolean => {
        return this.displayHelperText(field).length > 0;
    }

    displayHelperText = (field: FIELD): string => {
        const {submitted, email, password} = this.state;

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
    
    handleRegister = async () => {
        this.setState({submitted: true});
    }
    
    render(){
        //console.log('Login Component - this.props.userAuthenticated');
        //console.log(this.props.userAuthenticated);

        const {email, password} = this.state;
        return(
            <div className="componentContainer componentLoginContainer">
                <div className="componentWelcome">
                    Good to see you again. Welcome!
                </div>

                <form className="componentForm componentLoginForm">
                    <TextField
                        required
                        error = {this.displayError(FIELD.EMAIL)}
                        value={email}
                        onChange = {newValue => this.setState({email: newValue.target.value}) }
                        id="email"
                        label="E-mail"
                        helperText = {this.displayHelperText(FIELD.EMAIL)}
                        variant="outlined"/>

                    <TextField 
                        required
                        error = {this.displayError(FIELD.PASSWORD)}
                        value={password}
                        onChange = {newValue => this.setState({password: newValue.target.value})}
                        id="password"
                        label="Password"
                        type="password"
                        helperText = {this.displayHelperText(FIELD.PASSWORD)}
                        variant="outlined"/>

                </form>

                <div className="formSubmit">
                    <Button
                        variant="contained"
                        color="primary"
                        className='submitButton'
                        onClick = {this.handleRegister}>
                        Login
                    </Button>
                </div>

            </div>
        );
    }
}

export default connect((state: IStore) => ({
    userAuthenticated: state.userAuthenticated}) ) (LoginComponent)