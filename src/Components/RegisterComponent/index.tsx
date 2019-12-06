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
import IconButton from '@material-ui/core/IconButton';

// Components
import CustomSnackBar, {VARIANT} from '../CustomSnackBar';

// Model
import User, {Gender} from '../../Model/User';

// Services
import {Utilities} from '../../Services/Utilities';
import {FirebaseAuth} from '../../Services/Firebase/FirebaseAuth';
import {UserDB} from '../../Services/Firebase/Database/UserDB';
import {CloudStorage} from '../../Services/Firebase/CloudStorage';

// Icons
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import BlockIcon from '@material-ui/icons/Block';

// Enums
enum FIELD {
    EMAIL,
    FIRSTNAME,
    LASTNAME,
    PASSWORD,
    SEX
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
    showSnackBar: boolean,
    snackBarText: string,
    pictureFile?: File,
    picturePreviewURL: string
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
            showSnackBar: false,
            snackBarText: '',
            pictureFile: undefined,
            picturePreviewURL: ''
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
            const {email, password, firstName, lastName, sex, pictureFile} = this.state;
            let user: User = new User(email, firstName, sex, lastName);

            FirebaseAuth.createUser(email, password).then(async (info) => {
                user.id = info.user!.uid;
                if (pictureFile){
                    CloudStorage.uploadUserImage(user.id, pictureFile!);
                    user.hasImage = true;
                }

                await UserDB.createUser(user);
                this.props.dispatch(Actions.login(user));
            }).catch( async (error) => {
                await this.setState({snackBarText: error.message})
                this.setState({showSnackBar: true});
            });
        }
    }

    handleClose = () => this.setState({showSnackBar: false});

    handleImageSelected = (file: File) => {
        if (file){
            let fileReader: FileReader = new FileReader();
            fileReader.onloadend = () => {
                this.setState({
                    pictureFile: file,
                    picturePreviewURL: fileReader.result! as string
                });
            }

            fileReader.readAsDataURL(file);
        }
    }

    handleRemoveProfilePicture = () => {
        this.setState({
            pictureFile: undefined,
            picturePreviewURL: ''
        });
    }

    render(){
        const {email, password, firstName, lastName, sex, showSnackBar, snackBarText, picturePreviewURL} = this.state;

        this.setHelpersText();
        return(
            <div className="componentContainer">
                <div className="componentWelcome">
                    Welcome to mine, yours, our Social Network!
                </div>
    
                <CustomSnackBar
                    variant = {VARIANT.ERROR}
                    handleClose={this.handleClose}
                    show={showSnackBar}
                    text={snackBarText}/>

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

                        <div className="profilePicture">

                            <div className="profileIcons">

                                <input
                                    accept="image/*" 
                                    className='inputUploadPicture'
                                    type="file"
                                    id='profileImage'
                                    onChange = {newValue => this.handleImageSelected(newValue.target.files![0])} />
                                <label htmlFor="profileImage">
                                    <IconButton
                                        color="primary"
                                        aria-label="upload picture"
                                        component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>

                                {picturePreviewURL && 
                                    <IconButton
                                        color="primary"
                                        aria-label="upload picture"
                                        onClick = {() => this.handleRemoveProfilePicture()}
                                        component="span">
                                        <BlockIcon />
                                    </IconButton>
                                }

                            </div>

                            {picturePreviewURL && 
                                <img className = 'profilePicture' src={picturePreviewURL} />
                            }
                        </div>
    
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