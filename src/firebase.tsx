import * as firebase from "firebase";


const database = firebase.database().ref();
export const bingoRef = database.child("bingo");
export const wizardRef = database.child("wizard");
export const quixxRef = database.child("quixx");
