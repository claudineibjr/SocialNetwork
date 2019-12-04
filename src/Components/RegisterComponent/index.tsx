// React Imports
import React, {Component} from 'react';

// Redux
import { connect } from 'react-redux';
import * as Actions from '../../Store/actions';
import store, { IStore } from '../../Store/index';

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
import User, {Gender} from '../../Model/User';

// Services
import {Utilities} from '../../Services/Utilities';

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
    firstName: string,
    lastName: string,
    password: string,
    sex: Gender,
    birthday?: Date
}

class RegisterComponent extends Component<IProps, IState>{
    errorMessages: Map<number, string> = new Map<number, string>();

    constructor(props: IProps){
        super(props);

        this.state = {
            submitted: false,
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            sex: Gender.NOT_INFORM,
            birthday: undefined
        }

        // Initializing map
        for (let field in FIELD)
            this.errorMessages.set(parseInt(field), '');
    }

    // Functions and consts
    displayError = (field: FIELD): boolean => {
        return this.displayHelperText(field).length > 0;
    }

    setHelpersText = (): void => {
        const {email, password, firstName} = this.state;

        let message: string = '';

        // Email
        message = '';
        if (!Utilities.validateEmail(email))
            message =  'Email address is not valid';
        this.errorMessages.set(FIELD.EMAIL, message);

        // FirstName
        message = '';
        if (firstName.length === 0)
            message =  'First Name Required';;
        this.errorMessages.set(FIELD.FIRSTNAME, message);
        
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
            const {email, firstName, lastName, sex, birthday} = this.state;
            const user: User = new User(email, firstName, sex, birthday, lastName);

            if ( (store.getState() as IStore).userAuthenticated == undefined )
                this.props.dispatch(Actions.login(user));
            else
                this.props.dispatch(Actions.logoff());
        }
    }

    render(){
        const {email, password, firstName, lastName, sex, birthday} = this.state;

        this.setHelpersText();
        return(
            <div className="componentContainer">
                <div className="componentWelcome">
                    Welcome to mine, yours, our Social Network!
                </div>
    
                <form className='componentForm'>
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
                            onChange = {newValue => this.setState({password: newValue.target.value}) }
                            id="password"
                            label="Password"
                            type="password"
                            helperText = {this.displayHelperText(FIELD.PASSWORD)}
                            variant="outlined"/>
    
                        <TextField 
                            required
                            error = {this.displayError(FIELD.FIRSTNAME)}
                            value={firstName}
                            onChange = {newValue => this.setState({firstName: newValue.target.value}) }
                            id="firstName"
                            label="First name"
                            helperText = {this.displayHelperText(FIELD.FIRSTNAME)}
                            variant="outlined"/>
    
                        <TextField 
                            id="lastName"
                            value={lastName}
                            onChange = {newValue => this.setState({lastName: newValue.target.value}) }
                            error = {this.displayError(FIELD.LASTNAME)}
                            label="Last name"
                            helperText = {this.displayHelperText(FIELD.LASTNAME)}
                            variant="outlined"/>
    
                        <TextField
                            id="date"
                            label="Date of birth"
                            type="date"
                            value={birthday}
                            onChange = {newValue => {
                                let newDate: Date | null;
                                newDate = new Date(newValue.target.value);
                                if (newDate.getFullYear() > 1000)
                                    this.setState({birthday: newDate})
                            }}
                            className = 'inputDate'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            />
    
                        <FormControl
                            variant="outlined"
                            error={this.displayError(FIELD.SEX)}>
                            <InputLabel id="demo-simple-select-error-label">Gender</InputLabel>
                            <Select
                                labelId="demo-simple-select-error-label"
                                id="demo-simple-select-error"
                                value={sex}
                                onChange={newValue => this.setState({sex: newValue.target.value as Gender})}
                                >
                                <MenuItem value={Gender.MALE}>Male</MenuItem>
                                <MenuItem value={Gender.FEMALE}>Female</MenuItem>
                                <MenuItem value={Gender.NOT_INFORM}>Not informed</MenuItem>
                            </Select>
                            <FormHelperText>{this.displayHelperText(FIELD.SEX)}</FormHelperText>
                        </FormControl>
    
                </form>
    
                <div className = 'formSubmit'>
                    <Button
                        variant="contained"
                        color="primary"
                        className='submitButton'
                        onClick = {this.handleRegister}>
                        Register
                    </Button>
                </div>
            </div>
        );
    }

}

export default connect((state: IStore) => ({
    userAuthenticated: state.userAuthenticated}) ) (RegisterComponent)