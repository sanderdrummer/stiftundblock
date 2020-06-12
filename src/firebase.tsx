import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBuPLRmYKHALdmBh2eLo_R4bTX0TPFxDdk",
  authDomain: "stift-und-block.firebaseapp.com",
  databaseURL: "https://stift-und-block.firebaseio.com",
  projectId: "stift-und-block",
  storageBucket: "stift-und-block.appspot.com",
  messagingSenderId: "822446116090",
  appId: "1:822446116090:web:437507b535935bec210d43",
};

firebase.initializeApp(firebaseConfig);
const databaseRef = firebase.database().ref();
export const bingoRef = databaseRef.child("bingo");
export const wizardRef = databaseRef.child("wizard");
export const quixxRef = databaseRef.child("quixx");
