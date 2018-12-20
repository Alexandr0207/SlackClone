import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

let config = {
  apiKey: "AIzaSyC4CsTFfAiK06X210FLWfa_rky_GRfwYUg",
  authDomain: "slackclone-9c023.firebaseapp.com",
  databaseURL: "https://slackclone-9c023.firebaseio.com",
  projectId: "slackclone-9c023",
  storageBucket: "slackclone-9c023.appspot.com",
  messagingSenderId: "738656848744"
};
firebase.initializeApp(config);

export default firebase;