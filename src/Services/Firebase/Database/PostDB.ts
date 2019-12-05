import {firebaseApp, initializeFirebase} from '../Firebase';

import Post from '../../../Model/Post';
import User, { Gender } from '../../../Model/User';

export class PostDB {
    static async createPost(post: Post): Promise<string> {
        initializeFirebase();

        const reference = await firebaseApp.database().ref('posts').push();
        post.id = reference.key!;
        await firebaseApp.database().ref('posts/' + reference.key).update(post.getUpdatable());
        return new Promise((resolve, reject) => resolve(reference.key!));
    }

    static getPost(postID: string): Promise<Post> {
        initializeFirebase();

        return new Promise<Post>((resolve) => {
            firebaseApp.database().ref('posts/' + postID).once('value', async (dataSnapshot) => {
                const post = await Post.getPost(dataSnapshot.exportVal());
                resolve(post);
            });
        });
    }

    static getAvailablePosts(): Promise<Array<Post>> {
        initializeFirebase();
        
        let posts: Array<Post> = new Array<Post>();

        return new Promise<Array<Post>>((resolve, reject) => {
            /*posts.push(new Post(new User('claudineibjr', 'Cla', Gender.MALE), new Date(), 'A'));
            posts.push(new Post(new User('claudineibjr', 'Cla', Gender.MALE), new Date(), 'B'));
            posts.push(new Post(new User('claudineibjr', 'Cla', Gender.MALE), new Date(), 'C'));
            resolve(posts);*/

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