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

    static getAvailablePosts(): Promise<Array<Post>> {
        initializeFirebase();
        
        return new Promise<Array<Post>>((resolve, reject) => {
            firebaseApp.database().ref('posts/').orderByChild('date').once('value', 
                (dataSnapshot) => {
                    this.getPostsFromDataSnapshot(dataSnapshot).then((values) => {
                        resolve(values);
                    });
            });
        });
    }

    static getPostsFromDataSnapshot(dataSnapshot: firebase.database.DataSnapshot): Promise<Array<Post>>{
        return new Promise<Array<Post>>((resolve, reject) => {
            let promisesPosts: Array<Promise<Post>> = new Array<Promise<Post>>();

            dataSnapshot.forEach((childSnapshot) => {
                promisesPosts.push(new Promise<Post>((resolve, reject) => {
                    Post.getPost(childSnapshot.exportVal()).then((post) =>{
                        resolve(post);
                    });
                }));
            });
            
            Promise.all(promisesPosts).then((values) => {
                resolve(values);
            });
        });
    }

    static deletePost(postID: string) : Promise<void> {
        initializeFirebase();

        return new Promise<void>((resolve) => {
            firebaseApp.database().ref('posts/' + postID).remove().then(() => {
                resolve();
            });
        });
    }

    static updatePost(post: Post) : Promise<void> {
        initializeFirebase();

        return new Promise<void>(async (resolve) => {
            await firebaseApp.database().ref('posts/' + post.id).update(post.getUpdatable())
            resolve();
        });
    }

}