import {firebaseApp} from './Firebase';
import {initializeFirebase} from './Firebase';

export class FirebaseAuth {

    static createUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
        initializeFirebase();
    
        return new Promise((resolve, reject) => {
            firebaseApp.auth().createUserWithEmailAndPassword(email, password).then((info) => {
                resolve(info);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    
    static loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
        initializeFirebase();
    
        return new Promise((resolve, reject) => {
            firebaseApp.auth().signInWithEmailAndPassword(email, password).then((info) => {
                resolve(info);
            }).catch((error) => {
                reject(error);
            });
        });
    }
    
    static async resetPassword(email: string): Promise<void> {
        initializeFirebase();

        await firebaseApp.auth().sendPasswordResetEmail(email);
    }
}