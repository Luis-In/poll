import useStyles from "./AppStyle"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//Components
import Candidatos from './Candidatos/Candidatos'
import Resultados from "./Resultados/Resultados"
// Firebase

function App() {
  const classes = useStyles()
  
  return (
    <Router>
    <div className="App">
        <Candidatos />
        <Resultados />
    </div>
    </Router>
    
  );
}

export default App;
