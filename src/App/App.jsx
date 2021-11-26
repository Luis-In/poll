import useStyles from "./AppStyle"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//Components
import Candidatos from './Candidatos/Candidatos'
import Resultados from "./Resultados/Resultados"
import Login from './Login/Login'
import Titulo from "./Titulo/Titulo"
//Firebase
// import { initializeApp } from "firebase/app";
// import firebaseConfig from './firebaseCon'
// import listaSocios from "./listaSocios.json";
// import {getFirestore, doc, setDoc } from "firebase/firestore";
// initializeApp(firebaseConfig);
// const db = getFirestore()

function App() {
  // useEffect(() => {
  //   let socios = Object.entries(listaSocios)
  //   console.log(socios)
  //   async function subirLista() {
  //     socios.forEach(async (socio) => {
  //       await setDoc(doc(db, "Socios", socio[0]), {
  //         ...socio[1]  
  //       });
  //     })
  //   }
  //   subirLista()

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
            <Login/>
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
