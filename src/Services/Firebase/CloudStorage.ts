import {firebaseApp} from './Firebase';
import {initializeFirebase} from './Firebase';
import { resolve } from 'dns';

export class CloudStorage {

    private static uploadImage(id: string, imageFile: File): Promise<void> {
        initializeFirebase();

        const postImageReference = firebaseApp.storage().ref().child(id);
        return new Promise<void>((resolve) => {
            postImageReference.put(imageFile).then(() => {
                resolve()
            });
        });
    }

    static uploadUserImage(userID: string, imageFile: File): Promise<void> {
        return this.uploadImage('users/' + userID, imageFile);
    }

    static uploadPostImage(postID: string, imageFile: File): Promise<void> {
        return this.uploadImage('posts/' + postID, imageFile);
    }

    private static downloadImage(id: string): Promise<string> {
        initializeFirebase();

        const imageReference = firebaseApp.storage().ref().child(id);
        return new Promise<string>((resolve) => {
            imageReference.getDownloadURL().then((URL) => {
                resolve(URL);
            });
        })
    }

    static downloadUserImage(userID: string): Promise<string> {
        return this.downloadImage('users/' + userID);
    }

    static downloadPostImage(postID: string): Promise<string> {
        return this.downloadImage('posts/' + postID);
    }

    private static deleteImage(id: string): Promise<void> {
        initializeFirebase();

        const imageReference = firebaseApp.storage().ref().child(id);
        return new Promise<void>((resolve) => {
            imageReference.delete().then(() => {
                resolve();
            });
        });
    }

    static deletePostImage(postID: string): Promise<void> {
        return this.deleteImage('posts/' + postID);
    }
}