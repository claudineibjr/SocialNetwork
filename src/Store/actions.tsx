import { IAction } from ".";
import User from "../Model/User";

export enum ACTIONS {
    SET_AUTHENTICATED
}

export function setAuthenticated(userAuthenticated: User): IAction {
    return {
        type: ACTIONS.SET_AUTHENTICATED,
        userAuthenticated: userAuthenticated
    }
}