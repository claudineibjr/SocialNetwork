import store, { IAction, IStore } from ".";
import User from "../Model/User";
import Post from "../Model/Post";

export enum ACTIONS {
    LOGIN,
    LOGOFF,
    CREATE_POST,
    REFRESH_POSTS
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