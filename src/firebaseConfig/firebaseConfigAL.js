import firebase from "firebase/compat/app";
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyBJNo2rP0u5TAV2nHqvDMo2XpjwBhK0zuw",
    authDomain: "allure-chatbot.firebaseapp.com",
    databaseURL: "https://allure-chatbot-default-rtdb.firebaseio.com",
    projectId: "allure-chatbot",
    storageBucket: "allure-chatbot.appspot.com",
    messagingSenderId: "114600761213",
    appId: "1:114600761213:web:995f39d583c986878c9e14",
    measurementId: "G-HEKL49QFNN"
};


  var firebaseAL = firebase.initializeApp(firebaseConfig, 'allure-chatbot');

export default firebaseAL;
  
  