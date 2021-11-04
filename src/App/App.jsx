import useStyles from "./AppStyle"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//Components
import Candidatos from './Candidatos/Candidatos'
import Resultados from "./Resultados/Resultados"
import Login from './Login/Login'
import { useEffect } from "react"
// Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAO0JE7KwGEAtvJsiB603Lcd9kPVuq95g",
  authDomain: "web-hosting-chimi.firebaseapp.com",
  databaseURL: "https://web-hosting-chimi-default-rtdb.firebaseio.com",
  projectId: "web-hosting-chimi",
  storageBucket: "web-hosting-chimi.appspot.com",
  messagingSenderId: "40648514015",
  appId: "1:40648514015:web:b75949cb87475fe3d78c6a",
  measurementId: "G-RMPX1GXCYW"
};
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore() 

function App() {
  const classes = useStyles()
  useEffect(() => {
    async function data() {
      const querySnapshot = await getDocs(collection(db, "Votantes"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    }
    data()
  })
  
  return (
    <Router>
    <div className={classes.root}>
      <Switch>
        <Route path="/">
          <Login />
        </Route>
        <Route path="/votar">
          <Candidatos />
        </Route>
      </Switch> 
      <Resultados />
    </div>
    </Router>
    
  );
}

export default App;
