// React Imports
import React, {Component} from 'react';
import { PossibleRoutes } from '../../Routes';

// Redux
import { connect } from 'react-redux';
import store, { IStore } from '../../Store/index';
import * as Actions from '../../Store/actions';

// Styles
import './styles.css'

// Material-UI Components
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

// Components
import CreatePost from '../../Components/CreatePost';
import PostComponent from '../../Components/PostComponent';

// Model
import Post from '../../Model/Post';
import User from '../../Model/User';

// Services
import {PostDB} from '../../Services/Firebase/Database/PostDB';
import { UserDB } from '../../Services/Firebase/Database/UserDB';

// Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

interface IProps {
    dispatch: any,
    posts?: Array<Post>,
    userAuthenticated?: User,
    history: any
}

interface IState {

}

class Home extends Component<IProps, IState> {
    componentWillMount = async() => {
        if ( !(store.getState() as IStore).userAuthenticated ){
            const userID = localStorage.getItem('@SocialNetwork/uid');
            if (userID){
                const user = await UserDB.getUser(userID);
                this.props.dispatch(Actions.login(user));
            }
        }
    }

    componentDidMount = () => {
        this.loadPostsFromDB();
    }

    loadPostsFromDB = async () => {
        let posts: Array<Post> = await PostDB.getAvailablePosts();
        this.props.dispatch(Actions.refreshPosts(posts));
    }

    handleLogoff = () => {
        localStorage.removeItem('@SocialNetwork/uid');
        this.props.dispatch(Actions.logoff());
        this.props.history.push(PossibleRoutes.LOGIN);
    }

    render(){
        let {posts, userAuthenticated} = this.props;

        const componentPosts =  posts!.map((post, key) => 
                                    <PostComponent
                                        key = {post.id}
                                        post = {post}/>
                                );

        return(
            <div className="homePageContainer">

                {userAuthenticated &&
                    <div className="onlyAuthenticated">
                        <div className="headerContainer">
                            <div className="profileContainer">
                                <Avatar aria-label="recipe"> C </Avatar>
                                <div className="profileName">
                                    {userAuthenticated!.getFullName()}
                                </div>
                            </div>

                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={this.handleLogoff}
                                startIcon={<ExitToAppIcon />}>
                                Logoff
                            </Button>

                        </div>

                        <CreatePost/>
                    </div>
                }
                
                {componentPosts}
            </div>
        );
    }
}

export default connect((state: IStore) => ({
    posts: state.posts,
    userAuthenticated: state.userAuthenticated}) ) (Home)