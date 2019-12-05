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
import Checkbox from '@material-ui/core/Checkbox';

// Components
import CustomSnackBar, {VARIANT} from '../CustomSnackBar';

// Model
import User from '../../Model/User';

// Services
import {Utilities} from '../../Services/Utilities';
import {FirebaseAuth} from '../../Services/Firebase/FirebaseAuth';
import {UserDB} from '../../Services/Firebase/Database/UserDB';

// Icons
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
    snackBarText: string,
    keepConnected: boolean
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
            snackBarText: '',
            keepConnected: true
        };

        // Initializing map
        for (let field in FIELD)
            this.errorMessages.set(parseInt(field), '');
    }
    
    componentWillMount = () => {
        const userID = localStorage.getItem('@SocialNetwork/uid');
        if (userID)
            this.loginUser(userID);
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
    
    handleLogin = async () => {
        this.setState({submitted: true});

        let error: boolean = false;
        this.errorMessages.forEach((value: string, key: number) => {
            if (!error)
                error = value.length > 0;
        });

        if (!error){
            const {email, password, keepConnected} = this.state;
            FirebaseAuth.loginUser(email, password).then((info) => {
                if (keepConnected)
                    localStorage.setItem('@SocialNetwork/uid', info.user!.uid);
                else
                    localStorage.removeItem('@SocialNetwork/uid');

                this.loginUser(info.user!.uid);
            }).catch(async (error) => {
                await this.setState({snackBarText: error.message})
                this.setState({showSnackBar: true});
            });
        }
    }

    loginUser = (userUID: string) => {
        UserDB.getUser(userUID).then((user) => {
            this.props.dispatch(Actions.login(user));
        });
    }
    
    handleClose = () => this.setState({showSnackBar: false});

    render(){   
        const {email, password, showSnackBar, snackBarText, keepConnected} = this.state;
        
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

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={keepConnected}
                                onChange={newValue => this.setState({keepConnected: newValue.target.checked }) }
                                value={keepConnected}
                                color="primary"
                            />
                        }
                        label="Keep connected"/>

                </form>

                <div className="formSubmit">
                    <Button
                        variant="contained"
                        color="primary"
                        className='submitButton'
                        onClick = {this.handleLogin}>
                        Login
                    </Button>
                </div>

            </div>
        );
    }
}

export default connect((state: IStore) => ({
    userAuthenticated: state.userAuthenticated}) ) (LoginComponent)