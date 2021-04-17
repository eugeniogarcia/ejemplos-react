Para usar `react-router-dom` lo primero es establecer un `Router` bajo el que se gestionará toda la navegación.

```js
import { BrowserRouter as Router } from "react-router-dom";

...

<Router>
  <App />
</Router>,
```

A continuación usaremos `Routes` para recoger aquellos partes del árbol en las que necesitamos gestionar la navegación. Dentro de este componente usaremos `NavLink`, `Link` y `Route`.

Fijemonos tambien como en una de las rutas usamos un parámetro `:id`:

```js
export default function App() {
  return (
    <ColorProvider>
      <AddColorForm />
      <Routes>
        <Route
          path="/"
          element={<ColorList />}
        ></Route>
        <Route
          path=":id"
          element={<ColorDetails />}
        />
      </Routes>
    </ColorProvider>
  );
}
```

Podemos emplear hooks para hacer la navegación programticamente:

```js
    let navigate = useNavigate();

    ...

    navigate(`/${id}`);
```

Podemos usar también hooks para acceder a los parametros de navegación. Aquí podemos obtener _id_:

```js
import { useParams } from "react-router-dom";

export function ColorDetails() {
  let { id } = useParams();
  let { colors } = useColors();

  let foundColor = colors.find(
    color => color.id === id
  );
```
