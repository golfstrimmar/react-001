import Rebase from 're-base';
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAM9-R-mmjCeTjw4RP0Sx8NeC3X7B4Xc94",
  authDomain: "very-hot-burgers-31824.firebaseapp.com",
  databaseURL: "https://very-hot-burgers-31824-default-rtdb.europe-west1.firebasedatabase.app",
});

const base = Rebase.createClass(firebaseApp.database());
export{firebaseApp};
export default base;