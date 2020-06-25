import * as firebase from 'firebase';
import * as c from "./constants"

// Initialize Firebase

//TODO: ADD OWN FIREBASE CREDS
const config = {
  apiKey: "[ENTER API KEY]",
  authDomain: "[ENTER DOMAIN]",
  databaseURL: "[ENTER DB URL]",
  projectId: "[ENTER ID]",
  storageBucket: "[ENTER BUCKET URL]",
  messagingSenderId: "[ENTER ID NUMBER]"
};

firebase.initializeApp(config);

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
