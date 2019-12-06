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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// Components
import CreatePost from '../../Components/CreatePost';
import PostComponent from '../../Components/PostComponent';

// Model
import Post, { PostVisibility } from '../../Model/Post';
import User from '../../Model/User';

// Services
import {PostDB} from '../../Services/Firebase/Database/PostDB';
import { UserDB } from '../../Services/Firebase/Database/UserDB';
import {CloudStorage} from '../../Services/Firebase/CloudStorage';

// Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';

enum ViewOption{
    AllPosts,
    Public,
    Private,
    My,
    FromOther
}

interface IProps {
    dispatch: any,
    posts?: Array<Post>,
    userAuthenticated?: User,
    history: any
}

interface IState {
    viewOption: ViewOption,
    posts: Array<Post>,
    userAvatar: any
}

class Home extends Component<IProps, IState> {
    constructor(props: IProps){
        super(props);

        this.state = {
            viewOption: ViewOption.AllPosts,
            posts: new Array<Post>(),
            userAvatar: undefined
        };
    }

    componentDidMount = async() => {
        if ( !(store.getState() as IStore).userAuthenticated ){
            const userID = localStorage.getItem('@SocialNetwork/uid');
            if (userID){
                const user = await UserDB.getUser(userID);
                this.props.dispatch(Actions.login(user));
            }
        }

        const avatar = await this.userAvatar();
        this.setState({userAvatar: avatar});

        this.loadPostsFromDB();
    }

    loadPostsFromDB = async () => {
        const {userAuthenticated} = this.props;

        let posts: Array<Post> = await PostDB.getAvailablePosts(userAuthenticated ? userAuthenticated!.id : '');
        this.props.dispatch(Actions.refreshPosts(posts));
        this.loadPostsAccordingToViewOption();
    }

    handleLogoff = () => {
        localStorage.removeItem('@SocialNetwork/uid');
        this.props.dispatch(Actions.logoff());
        this.props.history.push(PossibleRoutes.LOGIN);
    }

    loadPostsAccordingToViewOption = () => {
        const {posts, userAuthenticated} = this.props;
        const {viewOption} = this.state;
        
        let newPosts: Array<Post> = new Array<Post>();

        switch(viewOption){
            case ViewOption.AllPosts: {
                newPosts = posts!;
                break;
            }

            case ViewOption.My: {
                newPosts = posts!.filter(find => find.userStr === userAuthenticated!.id);
                break;
            }

            case ViewOption.Private: {
                newPosts = posts!.filter(find => find.visibility === PostVisibility.PRIVATE);
                break;
            }

            case ViewOption.Public: {
                newPosts = posts!.filter(find => find.visibility === PostVisibility.PUBLIC);
                break;
            }

            case ViewOption.FromOther: {
                newPosts = posts!.filter(find => find.userStr !== userAuthenticated!.id);
                break;
            }
        }

        this.setState({posts: newPosts});
    }

    setViewOption = (newViewOption: ViewOption) => {
        this.setState({viewOption: newViewOption}, () => this.loadPostsAccordingToViewOption());
    }

    userAvatar = (): Promise<any> => {
        const {userAuthenticated} = this.props;

        return new Promise<any>((resolve) => {
            if (userAuthenticated!.hasImage){
                CloudStorage.downloadUserImage(userAuthenticated!.id).then((pictureURL) => {
                    resolve( (<Avatar alt={userAuthenticated!.getFirstLetter()} src={pictureURL} />) )
                });
            }else{
                resolve( <Avatar aria-label="recipe"> {userAuthenticated!.getFirstLetter()} </Avatar> );
            }
        });
    }

    render(){
        let {userAuthenticated} = this.props;
        const {viewOption, posts, userAvatar} = this.state;

        const componentPosts =  posts.map((post, key) => 
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
                                {userAvatar}
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
                
                <AppBar position="static">
                    <Toolbar>
                        <div className="appToolbar">
                            <div>
                                <Typography variant="h5">
                                    Timeline
                                </Typography>
                            </div>
                        
                            <div className="viewOptions">
                                <FormControlLabel
                                    value="start"
                                    control={<Radio 
                                        onClick = {() => this.setViewOption(ViewOption.AllPosts)}
                                        checked = {viewOption === ViewOption.AllPosts}/>
                                    }
                                    label="All posts"
                                    labelPlacement="start"/>

                                <FormControlLabel
                                    value="start"
                                    control={<Radio 
                                        onClick = {() => this.setViewOption(ViewOption.Public)}
                                        checked = {viewOption === ViewOption.Public}/>
                                    }
                                    label="Public posts"
                                    labelPlacement="start"/>

                                <FormControlLabel
                                    disabled = {userAuthenticated === undefined}
                                    value="start"
                                    control={<Radio 
                                        onClick = {() => this.setViewOption(ViewOption.Private)}
                                        checked = {viewOption === ViewOption.Private}/>
                                    }
                                    label="Private posts"
                                    labelPlacement="start"/>

                                <FormControlLabel
                                    disabled = {userAuthenticated === undefined}
                                    value="start"
                                    control={<Radio 
                                        onClick = {() => this.setViewOption(ViewOption.My)}
                                        checked = {viewOption === ViewOption.My}/>
                                    }
                                    label="My posts"
                                    labelPlacement="start"/>

                                <FormControlLabel
                                    disabled = {userAuthenticated === undefined}
                                    value="start"
                                    control={<Radio 
                                        onClick = {() => this.setViewOption(ViewOption.FromOther)}
                                        checked = {viewOption === ViewOption.FromOther}/>
                                    }
                                    label="From another"
                                    labelPlacement="start"/>

                            </div>

                        </div>

                    </Toolbar>
                </AppBar>

                {componentPosts}
            </div>
        );
    }
}

export default connect((state: IStore) => ({
    posts: state.posts,
    userAuthenticated: state.userAuthenticated}) ) (Home)