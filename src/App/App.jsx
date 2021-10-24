import useStyles from "./AppStyle"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//Components
import Candidatos from './Candidatos/Candidatos'


function App() {
  const classes = useStyles()
  
  return (
    <Router>
    <div className="App">
        <Candidatos />
        <Switch>
          <Route path="/candidatos">
            <Candidatos />
          </Route>
        </Switch>
    </div>
    </Router>
    
  );
}

export default App;
