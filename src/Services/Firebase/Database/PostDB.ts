import {firebaseApp, initializeFirebase} from '../Firebase';

import Post from '../../../Model/Post';

export class PostDB {
    static async createPost(post: Post): Promise<string> {
        initializeFirebase();

        const reference = await firebaseApp.database().ref('posts').push();
        post.id = reference.key!;
        await firebaseApp.database().ref('posts/' + reference.key).update(post.getUpdatable());
        return new Promise((resolve, reject) => resolve(reference.key!));
    }

    /*static getPost(userID: string): Promise<User> {
        initializeFirebase();

        return new Promise((resolve, reject) => {
            firebaseApp.database().ref('users/' + userID).once('value', (dataSnapshot) => {
                const user: User = User.getUser(dataSnapshot.exportVal());
                resolve(user);
            });
        })
    }*/
}