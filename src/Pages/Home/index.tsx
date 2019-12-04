// React Imports
import React, {Component} from 'react';

// Styles
import './styles.css'

// Material-UI Components

// Components
import CreatePost from '../../Components/CreatePost';
import PostComponent from '../../Components/PostComponent';

// Model
import Post, { PostVisibility } from '../../Model/Post';
import User, { Gender } from '../../Model/User';

// Services

// Icons

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
            posts: [
                new Post(user, new Date(), 'Hello World', PostVisibility.PUBLIC),
                new Post(user, new Date(), 'Hoje estou estudando React', PostVisibility.PUBLIC),
                new Post(user, new Date(), 'Isso aqui ninguém deveria ficar sabendo', PostVisibility.PRIVATE),
            ]
        }
    }

    render(){
        console.log(this.state.posts);
        const posts =   this.state.posts.map((post, key) => 
                            <PostComponent post = {post}/>
                        );

        return(
            <div className="homePageContainer">
                <CreatePost/>
                
                {posts}
            </div>
        );
    }
}