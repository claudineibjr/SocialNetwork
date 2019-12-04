import { IAction } from ".";
import User from "../Model/User";

export enum ACTIONS {
    LOGIN,
    LOGOFF
}

export function login(userAuthenticated: User): IAction {
    return {
        type: ACTIONS.LOGIN,
        userAuthenticated: userAuthenticated
    }
}

export function logoff(): IAction {
    return{
        type: ACTIONS.LOGOFF
    }
}