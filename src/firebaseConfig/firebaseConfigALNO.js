// allure-no-indicator
import firebaseALNO from "firebase/compat/app";
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyBJNo2rP0u5TAV2nHqvDMo2XpjwBhK0zuw",
    // authDomain: "allure-chatbot.firebaseapp.com",
    databaseURL: "https://allure-chatbot-default-rtdb.firebaseio.com",
    projectId: "allure-chatbot",
    storageBucket: "allure-chatbot.appspot.com",
    messagingSenderId: "114600761213",
    appId: "1:114600761213:web:bcbcac36221ad5ac8c9e14",
    measurementId: "G-ZHLS4Z71LZ"
};


  var firebaseALNO = firebase.initializeApp(firebaseConfig, 'allure-no-indicator');

export default firebaseALNO;

  