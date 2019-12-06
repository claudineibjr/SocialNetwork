import {firebaseApp, initializeFirebase} from '../Firebase';

import Post, { PostVisibility } from '../../../Model/Post';

export class PostDB {
    static async createPost(post: Post): Promise<string> {
        initializeFirebase();

        const reference = await firebaseApp.database().ref('posts').push();
        post.id = reference.key!;
        await firebaseApp.database().ref('posts/' + reference.key).update(post.getUpdatable());
        return new Promise((resolve, reject) => resolve(reference.key!));
    }

    private static getBaseQuery(): firebase.database.Query {
        return firebaseApp.database().ref('posts/').orderByChild('inverseDate');
    }

    /*static getPosts(queryPost: QueryPosts, userID: string): Promise<Array<Post>>{
        initializeFirebase();

        return new Promise<Array<Post>>((resolve, reject) => {
            let firebaseQuery: firebase.database.Query;
            
            switch(queryPost){
                case QueryPosts.AllPosts:{
                    firebaseQuery = this.getBaseQuery();
                    break;
                }

                case QueryPosts.Public: {
                    firebaseQuery = this.getBaseQuery().orderByChild('visibility').equalTo(PostVisibility.PUBLIC);
                    break;
                }

                case QueryPosts.Private: {
                    firebaseQuery = this.getBaseQuery().orderByChild('visibility').equalTo(PostVisibility.PRIVATE);
                    break;
                }

                case QueryPosts.My: {
                    firebaseQuery = this.getBaseQuery().orderByChild('id').equalTo(userID);
                    break;
                }
            }
        });
    }*/

    static getAvailablePosts(userID: string): Promise<Array<Post>> {
        initializeFirebase();

        return new Promise<Array<Post>>((resolve, reject) => {
            this.getBaseQuery().once('value', 
                (dataSnapshot) => {
                    this.getPostsFromDataSnapshot(dataSnapshot, userID).then((values) => {
                        resolve(values);
                    });
            });
        });
    }

    static getPostsFromDataSnapshot(dataSnapshot: firebase.database.DataSnapshot, userID: string): Promise<Array<Post>>{
        return new Promise<Array<Post>>((resolve, reject) => {
            let promisesPosts: Array<Promise<Post>> = new Array<Promise<Post>>();

            dataSnapshot.forEach((childSnapshot) => {
                const publicPost: boolean = childSnapshot.exportVal().visibility === PostVisibility.PUBLIC;
                const ownPost: boolean = childSnapshot.exportVal().user === userID;
                if (publicPost || ownPost ){
                    promisesPosts.push(new Promise<Post>((resolve, reject) => {
                        Post.getPost(childSnapshot.exportVal()).then((post) =>{
                            resolve(post);
                        });
                    }));
                }
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