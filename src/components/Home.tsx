import React from "react";
import firebaseAL from "../firebaseConfig/firebaseConfigAL";
import firebaseALNO from "../firebaseConfig/firebaseConfigALNO";
// Import stuff
import { getDatabase, ref, onValue, get} from "firebase/database";
import initializeApp from "firebase/app"



type Props = {
  handleLogout: () => void;

}

const Home: React.FC<Props> = ({handleLogout}) => {
  const db = getDatabase(firebaseAL);
  return ( 
      <>
        <h1>{firebaseAL.name}</h1>
      </>
  );
}

export default Home;