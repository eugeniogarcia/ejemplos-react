import { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import Effect from "./Effect"
import EffectDestroy from "./EffectDestroy"
import EffectCondicionado from "./EffectCondicionado1"
import EffectCondicionadoProblema from "./EffectCondicionado2"
import EffectCondicionadoSolucion from "./EffectCondicionado3"
import EffectCondicionadoSolucionBis from "./EffectCondicionado4"
import EffectLayout from "./EffectLayout"

export default function App() {
  return (
    <Fragment>
      <Router>
        <ul>
          <li><Link to="">Inicio</Link></li>
          <li><Link to="condicionado">Effect condicionado</Link></li>
          <li><Link to="destroy">Effect como inicializador del componente</Link></li>
          <li><Link to="condProblema">Usar un Objeto en la condición (problema)</Link></li>
          <li><Link to="condSolucion">Usar un Objeto en la condición (solución)</Link></li>
          <li><Link to="condSolucion2">Usar un Objeto en la condición (solución 2)</Link></li>
          <li><Link to="posicion">Usar useEffectLayout para medir la dimensión de la ventana</Link></li>
        </ul>
        <Switch>
          <Route exact path="/"><Effect/></Route>
          <Route path="/condicionado"><EffectCondicionado /></Route>
          <Route path="/destroy"><EffectDestroy /></Route>
          <Route path="/condProblema"><EffectCondicionadoProblema /></Route>
          <Route path="/condSolucion"><EffectCondicionadoSolucion /></Route>
          <Route path="/condSolucion2"><EffectCondicionadoSolucionBis /></Route>
          <Route path="/posicion"><EffectLayout /></Route>
        </Switch>
      </Router>
    </Fragment>);
}