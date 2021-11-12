import useStyles from "./AppStyle"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//Components
import Candidatos from './Candidatos/Candidatos'
import Resultados from "./Resultados/Resultados"
import Login from './Login/Login'
import Titulo from "./Titulo/Titulo"

function App() {
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
        </Switch> 
        <Resultados />
      </div>
    </Router>
    
  );
}

export default App;
