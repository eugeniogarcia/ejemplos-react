import './App.css';
import StartRating from './StarRating'

function App() {
  return (
    <div className="App">
      <header className="App-header">
          Componente para puntuar
      </header>
      <body className="App-body">
        <StartRating style={{ backgroundColor: "lightblue" }} onDoubleClick={e => alert("double click")}/>
      </body>
    </div>
  );
}

export default App;
