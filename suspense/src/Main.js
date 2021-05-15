import React,{Suspense} from "react";
import ErrorBoundary from "./ErrorBoundary";
import GridLoader from "react-spinners/GridLoader";
import { ReposGraphQL, ReposGraphQLSusp} from "./GraphQL";
import "./Main.css"

const hayError=false;
const LanzaError = ({ simulaError, ...props }) => {
  if (simulaError){
    throw new Error("Algo ha ido mal");
  }
  return"";
};

const SiteLayout = ({ children, menu = c => null }) => {
  return (
    <div className="site-container">
      <div>{menu}</div>
      <div>{children}</div>
    </div>
  );
};

const Menu = () => {
  return (
    <ErrorBoundary>
      <p style={{ color: "white" }}>TODO: Build Menu</p>
      <LanzaError simulaError={hayError}/>
    </ErrorBoundary>
  )
};

const Callout = ({ children }) => {
  return (
  <ErrorBoundary>
    <div className="callout">{children}</div>
      <LanzaError simulaError={hayError}/>
  </ErrorBoundary>)
};
   
export default function Main() {
  return (
    <SiteLayout menu={<Menu />}>
      <Callout>Bienvenidos a mi Página</Callout>
      <ErrorBoundary>
        <div class="row">
          <div class="column">
            <Suspense fallback={<GridLoader />}>
              <ReposGraphQLSusp />
            </Suspense>
          </div>
          <div class="column">
            <ReposGraphQL />
          </div>
        </div>

        <LanzaError simulaError={hayError} />
      </ErrorBoundary>
    </SiteLayout>
  );
}
