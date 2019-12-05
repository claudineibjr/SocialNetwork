import { createStore } from 'redux';
import { ACTIONS } from './actions';

import User from '../Model/User';
import Post from '../Model/Post';

export interface IStore {
    userAuthenticated?: User,
    posts?: Array<Post>
}

export interface IAction extends IStore{
    type: string | number;
}

const INITIAL_STATE: IStore = {
    userAuthenticated: undefined,
    posts: new Array<Post>()
}

function reducer(state: any = INITIAL_STATE, action: IAction){
    switch(action.type){
        case (ACTIONS.LOGIN):{
            return {
                ...state,
                userAuthenticated: action.userAuthenticated
            }
        }
        
        case (ACTIONS.LOGOFF):{
            return{
                ...state,
                userAuthenticated: undefined
            }
        }

        case ACTIONS.CREATE_POST : case ACTIONS.REFRESH_POSTS: {
            return {
                ...state,
                posts: action.posts
            }
        }

        default:
            return state;
    }
}

const store = createStore(reducer);

export default store;