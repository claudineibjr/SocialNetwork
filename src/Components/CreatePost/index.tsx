// React Imports
import React, {Component} from 'react';

// Redux
import { connect } from 'react-redux';
import store, { IStore } from '../../Store/index';
import * as Actions from '../../Store/actions';

// Styles
import './styles.css'

// Material-UI Components
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

// Components
import CustomSnackBar, {VARIANT} from '../CustomSnackBar';

// Model
import Post from '../../Model/Post';
import User from '../../Model/User';

// Services
import {Utilities} from '../../Services/Utilities';
import {PostDB} from '../../Services/Firebase/Database/PostDB';
import { PostVisibility } from '../../Model/Post';

// Icons

interface IProps {
    dispatch: any
}

interface IState {
    submitted: boolean,
    visibility: PostVisibility,
    postContent: string,
    showSnackBar: boolean
}

enum FIELD {
    POST_CONTENT
}

class CreatePost extends Component<IProps, IState>{
    errorMessages: Map<number, string> = new Map<number, string>();
    
    constructor(props: IProps){
        super(props);

        this.state = {
            submitted: false,
            visibility: PostVisibility.PRIVATE,
            postContent: '',
            showSnackBar: false
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
        const {postContent} = this.state;

        let message: string = '';

        // Email
        message = '';
        if (postContent.length === 0)
            message =  'Post content required';
        this.errorMessages.set(FIELD.POST_CONTENT, message);
    }

    displayHelperText = (field: FIELD): string => {
        if (this.state.submitted)
            return this.errorMessages.get(field) as string;
        else
            return '';
    }

    handlePost = async () => {
        this.setState({submitted: true});

        let error: boolean = false;
        this.errorMessages.forEach((value: string, key: number) => {
            if (!error)
                error = value.length > 0;
        });

        if (!error){
            const {postContent, visibility} = this.state;
            const user: User = (store.getState() as IStore).userAuthenticated!;
            
            const post: Post = new Post(user, new Date(), postContent, visibility);
            PostDB.createPost(post).then((idPost) => {
                this.props.dispatch(Actions.createPost(post));
                this.setState({submitted: false, showSnackBar: true, postContent: ''});
            });
        }
    }

    setPostContent = (newValue: string) => this.setState({postContent: newValue});
    setVisibility = (newValue: PostVisibility) => this.setState({visibility: newValue});
    handleCloseSnackBar = () => this.setState({showSnackBar: false})
    
    render(){
        const {visibility, postContent, showSnackBar} = this.state;

        this.setHelpersText();
        return(
            <div className="createPostContainer">
    
                <CustomSnackBar
                    variant = {VARIANT.SUCCESS}
                    handleClose={this.handleCloseSnackBar}
                    show={showSnackBar}
                    text='Post created'/>

                <div className="contentArea">
                    <TextField
                        id="outlined-multiline-static"
                        label="What's going on?"
                        multiline
                        rows="4"
                        value={postContent}
                        onChange = {newValue => this.setPostContent(newValue.target.value)}
                        margin="normal"
                        variant="outlined"
                        error = {this.displayError(FIELD.POST_CONTENT)}
                        helperText = {this.displayHelperText(FIELD.POST_CONTENT)}
                        />
                </div>
    
                <div className="bottomButtons">
                    <FormControl 
                        variant="outlined"
                        className = 'formChooseVisibility'>
                        <Select
                            labelId="demo-simple-select-error-label"
                            id="demo-simple-select-error"
                            value={visibility}
                            onChange={newValue => this.setVisibility(newValue.target.value as PostVisibility)}
                            >
                            <MenuItem value={PostVisibility.PRIVATE}>Only friends</MenuItem>
                            <MenuItem value={PostVisibility.PUBLIC}>Public</MenuItem>
                        </Select>
                    </FormControl>
    
                    <Button
                        variant="contained"
                        color="primary"
                        onClick = {this.handlePost}
                        className = 'formSubmit'>
                        Post
                    </Button>
                </div>
            </div>
        );
    }
}

export default connect((state: IStore) => ({}) ) (CreatePost)