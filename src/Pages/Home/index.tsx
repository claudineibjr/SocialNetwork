// React Imports
import React, {Component} from 'react';

// Styles
import './styles.css'

// Material-UI Components
import Button from '@material-ui/core/Button';

// Components
import CreatePost from '../../Components/CreatePost';
import PostComponent from '../../Components/PostComponent';

// Model
import Post, { PostVisibility } from '../../Model/Post';
import User, { Gender } from '../../Model/User';

// Services

// Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

interface Props {

}

interface State {
    user: User,
    posts: Array<Post>
}

export default class Home extends Component<Props, State>{
    constructor(props: Props){
        super(props);

        const user: User = new User('claudineibjr@hotmail.com', 'Claudinei', Gender.MALE, new Date(1996, 9, 27), 'Brito Junior')
        this.state = {
            user: user,
            posts: []
        }
    }

    handleLogoff = () => {
        
    }

    render(){
        const posts =   this.state.posts.map((post, key) => 
                            <PostComponent post = {post}/>
                        );

        return(
            <div className="homePageContainer">
                <div className="headerContainer">
                    <div className="profileContainer">
                        {this.state.user.getFullName()}
                    </div>

                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLogoff}
                        startIcon={<ExitToAppIcon />}>
                        Logoff
                    </Button>

                </div>

                <CreatePost/>
                
                {posts}
            </div>
        );
    }
}