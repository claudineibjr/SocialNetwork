// React Imports
import React, {Component} from 'react';

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
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// Components

// Model

// Services
import {Utilities} from '../../Services/Utilities';

// Icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Post from '../../Model/Post';

interface Props {
    post: Post
}

interface State {

}

export default class PostComponent extends Component<Props, State>{
    constructor(props: Props){
        super(props);
    }
    
    render(){
        return(
            <div className="postContainer">
                <Card className='cardContainer'>
                    <CardHeader
                        avatar = {<Avatar aria-label="recipe"> C </Avatar>}
                        title={this.props.post.user.getFullName()}
                        subheader={Utilities.formatDate(this.props.post.date, true)}/>
                    
                    <CardContent>
                        {this.props.post.content}
                    </CardContent>

                    <CardActions disableSpacing>
                        <IconButton aria-label="edit">
                            <EditIcon />
                        </IconButton>
                        
                        <IconButton aria-label="delete">
                            <DeleteForeverIcon />
                        </IconButton>
                    </CardActions>

                </Card>
            </div>
        )
    }
}