import React, {useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import firebase from './firebaseConfig';


// TODO: Import home 
// TODO: Add HI3 Tech Logo


const App: React.FC = () => {  // React.FC <= function component
  /* Initialize all states needed */
  const [user, setUser] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [hasAccount, setHasAccount] = useState<boolean>(true);
  // Function to clear input fields in login
  function clearInputs() {
    setEmail('');
    setPassword('');
  }
  // Function to clear error fields in login
  function clearErrors() {
    setError('');
  }
  // Handle the login of the user
  // TODO: Maybe automate email to me for if user not registered?
  function handleLogin() {
    clearErrors();
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(err => { setError(err.message)});  
    // IDK if this is correct but I think of the above as a lambda function in C++???
    // Well I know this is a try catch statement but in a function 
    // but the whole thingamabob with the {}
  }
  // Handle logout for the user
  function handleLogout() {
    firebase.auth().signOut();
  }
  // Listen to see if the authentication state has changed
  function authListener() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        clearInputs();
        setUser(email);  // FIXME: Lets hope this works
      } else 
        setUser('');
    })
  }
  // Not sure what this really does yet
  useEffect(() => {
    handleLogout();
    authListener();
  },[]);

  return (
    <div className="App">
      <Login 
      email = {email}
      setEmail = {setEmail}
      password = {password}
      setPassword = {setPassword}
      handleLogin = {handleLogin}
      hasAccount = {hasAccount}
      setHasAccount = {setHasAccount}
      error = {error}
      />
    </div>
  );
}

export default App;
