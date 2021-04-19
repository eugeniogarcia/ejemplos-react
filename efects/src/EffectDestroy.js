import React, { useState, useEffect } from "react";

const useAnyKeyToRender = () => {
  const [, forceRender] = useState();

  useEffect(() => {
    console.log("Se llamara solo una vez");
    window.addEventListener("keydown", forceRender);
    return () => {
      console.log("Se destruye el componente");
      window.removeEventListener("keydown", forceRender);
    }
  }, []);
};

export default function EffectDestroy() {
  useAnyKeyToRender();

  useEffect(() => {
    console.log("Se hace una rederización");
  });

  return <h1>useEffect como inicializador de un componente</h1>;
}
