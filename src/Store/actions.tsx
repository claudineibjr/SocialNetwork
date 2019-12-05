import store, { IAction, IStore } from ".";
import User from "../Model/User";
import Post from "../Model/Post";

export enum ACTIONS {
    LOGIN,
    LOGOFF,
    CREATE_POST,
    REFRESH_POSTS,
    DELETE_POST,
    UPDATE_POST
}

export function login(userAuthenticated: User): IAction {
    return {
        type: ACTIONS.LOGIN,
        userAuthenticated: userAuthenticated
    }
}

export function logoff(): IAction {
    return {
        type: ACTIONS.LOGOFF
    }
}

export function createPost(post: Post): IAction {
    let posts: Array<Post> = (store.getState() as IStore).posts!;
    posts.push(post);

    return {
        type: ACTIONS.CREATE_POST,
        posts: posts
    }
}

export function refreshPosts(posts: Array<Post>): IAction {
    return {
        type: ACTIONS.REFRESH_POSTS,
        posts: posts
    }
}

export function deletePost(post: Post): IAction {
    let posts: Array<Post> = (store.getState() as IStore).posts!;
    const postToDeleteIndex: number = posts.indexOf(post);
    posts.splice(postToDeleteIndex, 1);

    return {
        type: ACTIONS.DELETE_POST,
        posts: posts
    }
}

export function updatePost(post: Post): IAction {
    let posts: Array<Post> = (store.getState() as IStore).posts!;
    const postToDeleteIndex: number = posts.indexOf(post);
    posts[postToDeleteIndex] = post;

    return {
        type: ACTIONS.UPDATE_POST,
        posts: posts
    }
}