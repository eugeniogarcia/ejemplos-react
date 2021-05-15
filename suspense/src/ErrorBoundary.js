import React, { Component } from "react";

function ErrorScreen({ error }) {
  return (
    <div className="error">
      <h3>Lo sentimos, ... algo ha ido mal</h3>
      <p>No es posible procesar su petición en este momento.</p>
      <p>ERROR: {error.message}</p>
    </div>
  );
}

//El error boundary se define como un stateful component
export default class ErrorBoundary extends Component {
  //Definimos el estado
  state = { error: null };

  //Este método se invoca dentro del life cycle, cuando se produce un error
  static getDerivedStateFromError(error) {
    //Simplemente añadimos al estado el error tal cual lo recibimos. Lo estructura en un field llamado error
    return { error };
  }

  render() {
    //Extrae el error del estado
    const { error } = this.state;
    //Extra de props los children y un método llamado fallback
    const { children, fallback } = this.props;

    //Si hay un error muestra el fallback
    if (error && !fallback) return <ErrorScreen error={error} />;
    if (error) return <fallback error={error} />;
    return children;
  }
}
