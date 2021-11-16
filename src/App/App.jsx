import useStyles from "./AppStyle"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useEffect } from "react"
//Components
import Candidatos from './Candidatos/Candidatos'
import Resultados from "./Resultados/Resultados"
import Login from './Login/Login'
import Titulo from "./Titulo/Titulo"
// import listaSocios from "./listaSocios.json";
// firebase
// import {getFirestore, doc, setDoc } from "firebase/firestore";
// import { initializeApp } from "firebase/app";
// import firebaseConfig from './firebaseCon'
// import { async } from "@firebase/util"

// const app = initializeApp(firebaseConfig);
// const db = getFirestore()

function App() {
  // useEffect(() => {
  //   let socios = Object.entries(listaSocios)
  //   console.log(socios)
  //   async function subirLista() {
  //     await setDoc(doc(db, "Votantes", socios[0][0]), {
  //       ...socios[0][1]  
  //     });
  //   }
  //   subirLista()
  //   socios.forEach((socio) => {
  //     await setDoc(doc(db, "Votantes", socio[0]), {
  //       ...socio[1]  
  //     });
  //   })

  // }, [])
  const classes = useStyles()
  return (
    <Router>
      <div className={classes.root}>
        <Switch>
          <Route path="/" exact>
            <Titulo />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/votar" exact>
            <Candidatos />
          </Route>
          <Route path="/resultados" exact>
            <Resultados />
          </Route>
        </Switch> 
      </div>
    </Router>
    
  );
}

export default App;
