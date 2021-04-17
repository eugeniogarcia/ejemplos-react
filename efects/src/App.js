import React, { useState, useEffect } from "react";
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import Effect1 from "./EffectDestroy"

const useAnyKeyToRender = () => {
  const [, forceRender] = useState();

  useEffect(() => {
    window.addEventListener("keydown", forceRender);
    return () => window.removeEventListener("keydown", forceRender);
  }, []);
};

export default function App() {
  useAnyKeyToRender();

  useEffect(() => {
    console.log("fresh render");
  });

  return 
  (<Router history = {browserHistory}>
      <Route path = "/" component = {App}>
         <IndexRoute component = {Home} />
         <Route path = "home" component = {Home} />
         <Route path = "about" component = {About} />
         <Route path = "contact" component = {Contact} />
      </Route>
   </Router>);
}
