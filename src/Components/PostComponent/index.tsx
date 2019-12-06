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
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Components

// Model
import Post from '../../Model/Post';
import User from '../../Model/User';
import PostEdited from '../../Model/PostEdited';

// Services
import {Utilities} from '../../Services/Utilities';
import { PostDB } from '../../Services/Firebase/Database/PostDB';
import { CloudStorage } from '../../Services/Firebase/CloudStorage';

// Icons
import SaveIcon from '@material-ui/icons/Save';
import BlockIcon from '@material-ui/icons/Block';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';

interface Props {
    key: string,
    post: Post,
    userAuthenticated?: User,
    dispatch: any
}

interface State {
    displayDeleteDialog: boolean,
    editingPost: boolean,
    editingText: string,
    picturePreviewURL: string,
    hasPicture: boolean
}

enum FIELD {
    POST_CONTENT
}

class PostComponent extends Component<Props, State>{
    constructor(props: Props){
        super(props);

        this.state = {
            displayDeleteDialog: false,
            editingPost: false,
            editingText: '',
            picturePreviewURL: '',
            hasPicture: this.props.post.hasPicture
        }
    }
    
    componentWillMount = () => {
        const {post} = this.props;

        if (post.hasPicture){
            CloudStorage.downloadPostImage(post.id).then((pictureURL) => {
                this.setState({picturePreviewURL: pictureURL});
            });
        }
    }

    handleEdit = () => {
        this.setState({editingPost: true, editingText: this.props.post.content});
    }

    handleOpenDeleteDialog = () => {
        if (!this.state.editingPost)
            this.setState({displayDeleteDialog: true});
    }

    handleCloseDeleteDialog = () => {
        if (!this.state.editingPost)
            this.setState({displayDeleteDialog: false});
    }

    handleSaveEdit = async () => {
        const {editingText, hasPicture} = this.state;
        
        if (editingText.length > 0){
            this.handleCancelEdit();

            let {post} = this.props;
            post.history.push(new PostEdited(post.getDate(), post.content));
            post.content = editingText;
            post.setDate(new Date());
            post.hasPicture = hasPicture;
            if (!hasPicture)
                CloudStorage.deletePostImage(post.id);

            await PostDB.updatePost(post);
            this.props.dispatch(Actions.updatePost(post));
        }
    }

    handleCancelEdit = () => {
        if (this.state.editingPost)
            this.setState({editingPost: false});
    }

    confirmDelete = () => {
        this.handleCloseDeleteDialog();

        const {post} = this.props;

        PostDB.deletePost(post.id).then(() => {
            CloudStorage.deletePostImage(post.id);
            this.props.dispatch(Actions.deletePost(post));
        });
    }

    displayError = (field: FIELD): boolean => {
        return this.displayHelperText(field).length > 0;
    }

    displayHelperText = (field: FIELD): string => {
        const {editingPost, editingText} = this.state;

        if (editingPost && editingText.length === 0)
            return 'Post content required';
        else
            return '';
    }

    handleDeletePicture = () => {
        const {id} = this.props.post;
        this.setState({picturePreviewURL: '', hasPicture: false}, () => {
            CloudStorage.deletePostImage(id);
            this.handleSaveEdit();
        });
    }

    handleChangePicture = (file: File, newPicture: boolean = false) => {
        if (file){
            let fileReader: FileReader = new FileReader();
            fileReader.onloadend = () => {
                this.setState({
                    picturePreviewURL: fileReader.result! as string,
                    hasPicture: newPicture ? true : this.state.hasPicture
                });

                this.handleSaveEdit();
            }

            const {id} = this.props.post;
            CloudStorage.uploadPostImage(id, file!);
            fileReader.readAsDataURL(file);
        }
    }

    postImage_hasImageAndEditing = (picturePreviewURL: string) => {
        return (
            <div className="editingImagePost">
                <img className = 'postPicture' src={picturePreviewURL} />
                <div className="postImageEditingButtons">
                    <IconButton 
                        aria-label="cancel upload picture"
                        onClick={this.handleDeletePicture}
                        component="span">
                        <BlockIcon />
                    </IconButton>

                    <input
                        accept="image/*" 
                        className='inputUploadPicture'
                        type="file"
                        id='post-inputImage'
                        onChange = {newValue => this.handleChangePicture(newValue.target.files![0])} />
                    <label htmlFor="post-inputImage">
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span">
                            <SwapHorizIcon />
                        </IconButton>
                    </label>
                </div>
            </div>
        );
    }

    postImage_hasntImageAndEditing = () => {
        return (
            <div>
                <input
                    accept="image/*" 
                    className='inputUploadPicture'
                    type="file"
                    id='post-insertNewImage'
                    onChange = {newValue => this.handleChangePicture(newValue.target.files![0], true)} />
                <label htmlFor="post-insertNewImage">
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span">
                    <PhotoCamera />
                </IconButton>
                </label>
            </div>
        );
    }

    postImage_hasImageAndNotEditing = (picturePreviewURL: string) => {
        return (
            <img className = 'postPicture' src={picturePreviewURL} />
        );
    }

    render(){
        const {post, userAuthenticated} = this.props;
        const {displayDeleteDialog, editingPost, editingText, picturePreviewURL} = this.state;

        let $postImage = null;
        if (editingPost){
            if (picturePreviewURL.length > 0){
                $postImage = this.postImage_hasImageAndEditing(picturePreviewURL);
            }else{
                $postImage = this.postImage_hasntImageAndEditing();
            }
        }else{
            $postImage = this.postImage_hasImageAndNotEditing(picturePreviewURL);
        }

        return(
            <div className="postContainer">

                <Dialog
                    open={displayDeleteDialog}
                    onClose={this.handleCloseDeleteDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        {"Confirm deletion of post?"}
                    </DialogTitle>
                    
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    
                    <DialogActions>
                        <Button onClick={this.handleCloseDeleteDialog} color="primary">
                            No
                        </Button>
                        <Button onClick={this.confirmDelete} color="primary" autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>

                <Card className='cardContainer'>
                    <CardHeader
                        avatar = {<Avatar aria-label="recipe"> C </Avatar>}
                        title={post.user.getFullName()}
                        subheader={Utilities.formatDate(post.getDate(), true)}/>
                    
                    <CardContent>
                        {!editingPost ? (
                            <div className="postContent">
                                {post.content}
                                {$postImage}
                            </div>
                        ) : (
                            <div className="editTextField">
                                <TextField
                                    value={editingText}
                                    multiline
                                    error = {this.displayError(FIELD.POST_CONTENT)}
                                    helperText = {this.displayHelperText(FIELD.POST_CONTENT)}
                                    onChange={newValue => this.setState({editingText: newValue.target.value}) }/>

                                {$postImage}
                            </div>
                        )}

                    </CardContent>

                    {userAuthenticated && userAuthenticated!.id === post.userStr &&
                        <CardActions disableSpacing className = 'cardActions'>
                            <div className="cardActions">
                                <IconButton onClick={this.handleEdit} aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                                
                                <IconButton onClick={this.handleOpenDeleteDialog} aria-label="delete">
                                    <DeleteForeverIcon />
                                </IconButton>
                            </div>

                            {editingPost &&
                                <div className="onlyEditingCardActions">
                                    <IconButton onClick={this.handleSaveEdit} aria-label="delete">
                                        <SaveIcon />
                                    </IconButton>

                                    <IconButton onClick={this.handleCancelEdit} aria-label="delete">
                                        <BlockIcon />
                                    </IconButton>
                                </div>
                            }
                        </CardActions>
                    }

                </Card>
            </div>
        )
    }
}

export default connect((state: IStore) => ({
    userAuthenticated: state.userAuthenticated}) ) (PostComponent)