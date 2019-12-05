// React Imports
import React, {Component} from 'react';

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
import Post, { PostVisibility } from '../../Model/Post';
import User, { Gender } from '../../Model/User';

// Services
import {PostDB} from '../../Services/Firebase/Database/PostDB';

// Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { PossibleRoutes } from '../../Routes';
import { UserDB } from '../../Services/Firebase/Database/UserDB';

interface IProps {
    dispatch: any,
    posts?: Array<Post>,
    userAuthenticated?: User,
    history: any
}

interface IState {

}

class Home extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);
    }

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
                                    <PostComponent post = {post}/>
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