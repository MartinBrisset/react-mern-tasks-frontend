import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/auth/Login";
import NuevaCuenta from "./components/auth/NuevaCuenta";
import Proyectos from "./components/proyects/Proyectos";
import ProyectoState from "./context/proyectos/proyectoSate";


function App() {
  return (
    <ProyectoState>
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/nueva-cuenta' component={NuevaCuenta} />
          <Route exact path='/proyectos' component={Proyectos} />
        </Switch> 
      </Router>
    </ProyectoState>
  );
}

export default App;
