import { createStore } from 'redux';
import { ACTIONS } from './actions';

import User from '../Model/User';

export interface IStore {
    userAuthenticated?: User
}

export interface IAction extends IStore{
    type: string | number;
}

const INITIAL_STATE: IStore = {
    userAuthenticated: undefined
}

function reducer(state: any = INITIAL_STATE, action: IAction){
    if (action.type === ACTIONS.SET_AUTHENTICATED){
        return {
            ...state,
            userAuthenticated: action.userAuthenticated
        }
    }

    return state;
}

const store = createStore(reducer);

export default store;