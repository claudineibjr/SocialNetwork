// React Imports
import React from 'react';

// Styles
import './styles.css'

// Material-UI Components

// Components
import CreatePost from '../../Components/CreatePost';
import PostComponent from '../../Components/PostComponent';

// Model

// Services

// Icons

export default function Home(){
    return (
        <div className="homePageContainer">
            <CreatePost/>

            <PostComponent/>
            <PostComponent/>
            <PostComponent/>
            <PostComponent/>
            <PostComponent/>
            <PostComponent/>
            <PostComponent/>
            <PostComponent/>
            <PostComponent/>
            <PostComponent/>
            <PostComponent/>
            <PostComponent/>
        </div>
    );
}