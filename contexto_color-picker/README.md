# Highlights

## Contexto

### Definir

Definimos el contexto en _ColorProvider_.

Se crea el contexto:

```js
const ColorContext = createContext();
```

Se define el proveedor de contexto. Los componentes que se creen bajo este contexto tendrán acceso a tres métodos y a un dato:

```js
    return (
        <ColorContext.Provider value={{ colors, addColor, removeColor, rateColor }}>
            {children}
        </ColorContext.Provider>
    );
```

El dato se guarda en el estado de proveedor:

```js
    const [colors, setColors] = useState(colorData);
```

Y los métodos permiten manejar el estado:
- Añadir un valor en el estado
- Quitar un valor del estado
- Actualizar el rating de un valor guardado en el estado

```js
    const addColor = (title, color) =>
        setColors([
            ...colors,
            {
                id: v4(),
                rating: 0,
                title,
                color
            }
        ]);

    const removeColor = id => setColors(colors.filter(color => color.id !== id));

    const rateColor = (id, rating) =>
        setColors(
            colors.map(color => (color.id === id ? { ...color, rating } : color))
        );

```

Finalmente vamos a exponer también un helper que pueda ser usado desde los componentes para acceder al contexto:

```js
//hook para utilizar el contexto
export const useColors = () => useContext(ColorContext);
```

### Usar el proveedor de contexto

En _index_ usamos el proveedor de contexto, de modo que la _App_ estará bajo la influencia del contexto

```js
import ColorProvider from "./ColorProvider";
import App from "./App";

render(
  <ColorProvider>
    <App />
  </ColorProvider>,
  document.getElementById("root")
);
```

### Consumir el contexto
#### AddColorForm.js

Accede al método `addColor` definido en el contexto:

```js
import { useColors } from "./ColorProvider";
import { css } from "emotion";

export default function AddColorForm() {
    const { addColor } = useColors();
```

#### ColorList.js

Accede al contexto para acceder a los datos:

```js
import { useColors } from "./ColorProvider";

export default function ColorList() {
    const { colors } = useColors();

    if (!colors.length) return <div>No Colors Listed. (Add a Color)</div>;

    return (
        <div className={css`display: flex; flex-wrap: wrap;`}>
            {colors.map(color => (
                <Color key={color.id} {...color} />
            ))}
        </div>
```

#### Color.js

También accede al contexto, pero esta vez para acceder a los métodos que permiten eliminar un color o actualizar el rating:

```js
import { useColors } from "./ColorProvider";

export default function Color({ id, title, color, rating }) {
    const { rateColor, removeColor } = useColors();
```

### Custom hook

En el formulario que tenemos en _AddColorForm.js_, usamos un patron que consiste en:
- Guardar el valor de cada campo en un estado
- A cada control asignar como valor el valor del estado, y al handler un método que actualice el estado
- Finalmente, al submitir el formulario queremos "limpiar" el valor de los campos

Vamos a crear un custom hook para encapsular esta lógica y así tener que "escribir" menos. El custom hook (_hooks.js_):

```js
export const useInput = initialValue => {
    const [value, setValue] = useState(initialValue);
    return [
        { value, onChange: e => setValue(e.target.value) },
        () => setValue(initialValue)
    ];
};
```

Creamos un estado, y el hook devuelve un array con el objeto que tendremos que incluir como propiedad en los controles del formulario, y un método que nos permitirá en el submit del formulario resetear el estado.

Para usarlo:

- Creamos el hook con el valor inicial:

```js
export default function AddColorForm() {
    const [titleProps, resetTitle] = useInput("");
```

- Añadimos a las propiedades del control el contenido de nuestro custom hook:

```js
<input {...titleProps}
```

- Usamos el handler de nuestro custom hook:

```js
const submit = e => {
        e.preventDefault();
        addColor(titleProps.value, colorProps.value);
        resetTitle();
        resetColor();
    };
```

