// React Imports
import React from 'react';

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

// Model

// Services
import {Utilities} from '../../Services/Utilities';

// Icons

export default function CreatePost(){
    // Enums
    enum VISIBILITY {
        FRIENDS = 'Friends',
        PUBLIC = 'Public'
    }

    enum FIELD {
        POST_CONTENT
    }

    // State
    const [submitted, setSubmitted] = React.useState(false);
    const [visibility, setVisibility] = React.useState(VISIBILITY.FRIENDS);
    const [postContent, setPostContent] = React.useState('');

    // Functions and consts
    const displayError = (field: FIELD): boolean => {
        return displayHelperText(field).length > 0;
    }

    const displayHelperText = (field: FIELD): string => {
        if (!submitted)
            return '';

        switch (field){
            case FIELD.POST_CONTENT:
                if (postContent.length === 0)
                    return 'Post content required';
                else
                    return '';

            default:
                return '';
        }
    }

    async function handlePost(){
        setSubmitted(true);
    }

    return(
        <div className="createPostContainer">

            <div className="contentArea">
                <TextField
                    id="outlined-multiline-static"
                    label="What's going on?"
                    multiline
                    rows="4"
                    value={postContent}
                    onChange = {newValue => setPostContent(newValue.target.value)}
                    margin="normal"
                    variant="outlined"
                    error = {displayError(FIELD.POST_CONTENT)}
                    helperText = {displayHelperText(FIELD.POST_CONTENT)}
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
                        onChange={newValue => setVisibility(newValue.target.value as VISIBILITY)}
                        >
                        <MenuItem value={VISIBILITY.FRIENDS}>{VISIBILITY.FRIENDS}</MenuItem>
                        <MenuItem value={VISIBILITY.PUBLIC}>{VISIBILITY.PUBLIC}</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    color="primary"
                    onClick = {handlePost}
                    className = 'formSubmit'>
                    Post
                </Button>
            </div>
        </div>
    );
}