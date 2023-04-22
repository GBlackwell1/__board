import firebase from 'firebase/compat/app'; // <- This is a new thing, keep in mind
import 'firebase/compat/auth';  // And by new thing i mean /compat directory

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCRmtIEbCb4c8mkQSJd7KvUpw8c-Z7QiE",
  authDomain: "fir-visualisation.firebaseapp.com",
  projectId: "fir-visualisation",
  storageBucket: "fir-visualisation.appspot.com",
  messagingSenderId: "401301997185",
  appId: "1:401301997185:web:af400d94072bd94d3daf80",
  measurementId: "G-XWBDDG2VTH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);  // <- this is hecka weird too but okay go off ig
export default firebase;