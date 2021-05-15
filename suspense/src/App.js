import React, { useState, Suspense, lazy } from "react";
import Agreement from "./Agreement";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import ErrorBoundary from "./ErrorBoundary"

//Cardamos bajo demanda un componente
const Main = lazy(() => import("./Main"));

export default function App() {
  const [agree, setAgree] = useState(false);

  if (!agree) return <Agreement onAgree={() => setAgree(true)} />;

  //Mientras se hace la carga bajo demanda del componente Main, se muestra ClimbingBoxLoader
  return (
    <ErrorBoundary>
      <Suspense fallback={<ClimbingBoxLoader />}>
        <Main />
      </Suspense>
    </ErrorBoundary>
  );
}
