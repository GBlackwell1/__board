// Trying to create a config file for an android application NOT web app
import firebaseQS from 'firebase/compat/app';
// no authentication needed, possibly no messagingSenderId because no writing

const firebaseConfig = {
    apiKey: "AIzaSyAkPfnFr6MR6G-FW-gGbTAM-4IAdOen6Dw",
    projectId: "quitstart-11364",
    // Skip authDomain
    storage_bucket: "quitstart-11364.appspot.com",
    // Skip messaging sender id
    appId: "1:224296353509:android:601a932566b2e38348de0c"  // FIXME: could be a problem, :android:
    
};

firebaseQS.initializeApp(firebaseConfig);
export default firebaseQS;