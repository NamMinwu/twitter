import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyBLxIil33acaUASe-y_FR66n2MxiXx9VNs",
  authDomain: "twitter-596cd.firebaseapp.com",
  projectId: "twitter-596cd",
  storageBucket: "twitter-596cd.appspot.com",
  messagingSenderId: "1004321409732",
  appId: "1:1004321409732:web:1710eca8fa85b0528fd791",
};

firebase.initializeApp(firebaseConfig);

export const authService = firebase.auth();

export const firebaseInstance = firebase;

export const dbService = firebase.firestore();

export const storageService = firebase.storage();
