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
    switch(action.type){
        case (ACTIONS.LOGIN):{
            return {
                ...state,
                userAuthenticated: action.userAuthenticated
            }}
        case (ACTIONS.LOGOFF):{
            return{
                ...state,
                userAuthenticated: undefined
            }
        }

        default:
            return state;
    }
    
    if (action.type === ACTIONS.LOGIN){
        return {
            ...state,
            userAuthenticated: action.userAuthenticated
        }
    }

    return state;
}

const store = createStore(reducer);

export default store;