import React, { useState, useEffect } from "react";

const useAnyKeyToRender = () => {
  const [, forceRender] = useState();

  useEffect(() => {
    console.log("only called once");
    window.addEventListener("keydown", forceRender);
    return () => {
      console.log("destroyed");
      window.removeEventListener("keydown", forceRender);
    }
  }, []);
};

export default function EffectDestroy() {
  useAnyKeyToRender();

  useEffect(() => {
    console.log("fresh render");
  });

  return <h1>Open the console</h1>;
}
