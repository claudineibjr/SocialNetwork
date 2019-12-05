import firebase from 'firebase';
import ConfidentialInfo from './ConfidentialInfo';

export function initializeFirebase(){
    for (let iCount = 0; iCount < firebase.apps.length; iCount++){
        if (firebase.apps[iCount].name === '[DEFAULT]')
            return;
    }
    firebase.initializeApp(ConfidentialInfo.firebaseConfig);
}

export const firebaseApp = firebase;