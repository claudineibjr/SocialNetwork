import {firebaseApp, initializeFirebase} from '../Firebase';

import User from '../../../Model/User';
import { resolve } from 'dns';

export class UserDB {
    static async createUser(user: User): Promise<void> {
        initializeFirebase();

        await firebaseApp.database().ref('users/' + user.id).update(user.getUpdatable());
    }

    static getUser(userID: string): Promise<User> {
        initializeFirebase();

        return new Promise((resolve, reject) => {
            firebaseApp.database().ref('users/' + userID).once('value', (dataSnapshot) => {
                const user: User = User.getUser(dataSnapshot.exportVal());
                resolve(user);
            });
        })
    }
}