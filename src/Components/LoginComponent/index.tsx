// React Imports
import React, {Component} from 'react';

// Redux
import { connect } from 'react-redux';
import * as Actions from '../../Store/actions';
import store, { IStore } from '../../Store/index';

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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// Components
import CustomSnackBar, {VARIANT} from '../CustomSnackBar';

// Model
import User, { Gender } from '../../Model/User';

// Services
import {Utilities} from '../../Services/Utilities';
import {FirebaseAuth} from '../../Services/Firebase/FirebaseAuth';
import {UserDB} from '../../Services/Firebase/Database/UserDB';

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
    dispatch: any,
    userAuthenticated?: User
}

interface IState {
    submitted: boolean,
    email: string,
    password: string,
    showSnackBar: boolean,
    snackBarText: string
}

class LoginComponent extends Component<IProps, IState>{
    errorMessages: Map<number, string> = new Map<number, string>();
    
    constructor(props: IProps){
        super(props);

        this.state = {
            submitted: false,
            email: '',
            password: '',
            showSnackBar: false,
            snackBarText: ''
        };

        // Initializing map
        for (let field in FIELD)
            this.errorMessages.set(parseInt(field), '');
    }
    
    // Functions and consts
    displayError = (field: FIELD): boolean => {
        return this.displayHelperText(field).length > 0;
    }

    setHelpersText = (): void => {
        const {email, password} = this.state;

        let message: string = '';

        // Email
        message = '';
        if (!Utilities.validateEmail(email))
            message =  'Email address is not valid';
        this.errorMessages.set(FIELD.EMAIL, message);

        // Password
        message = '';
        if (password.length === 0)
            message =  'Password is required';
        this.errorMessages.set(FIELD.PASSWORD, message);
    }

    displayHelperText = (field: FIELD): string => {
        if (this.state.submitted)
            return this.errorMessages.get(field) as string;
        else
            return '';
    }
    
    handleRegister = async () => {
        this.setState({submitted: true});

        let error: boolean = false;
        this.errorMessages.forEach((value: string, key: number) => {
            if (!error)
                error = value.length > 0;
        });

        if (!error){
            const {email, password} = this.state;
            FirebaseAuth.loginUser(email, password).then((info) => {
                UserDB.getUser(info.user!.uid).then((user) => {
                    this.props.dispatch(Actions.login(user));
                });
            }).catch(async (error) => {
                await this.setState({snackBarText: error.message})
                this.setState({showSnackBar: true});
            });
        }
    }
    
    handleClose = () => this.setState({showSnackBar: false});

    render(){   
        const {email, password, showSnackBar, snackBarText} = this.state;
        
        this.setHelpersText();
        return(
            <div className="componentContainer componentLoginContainer">
                <div className="componentWelcome">
                    Good to see you again. Welcome!
                </div>

                <CustomSnackBar
                    variant = {VARIANT.ERROR}
                    handleClose={this.handleClose}
                    show={showSnackBar}
                    text={snackBarText}/>

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