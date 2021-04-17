## Effect

Demuestra el uso de `useEffect`. Con cada renderizado del componente añadimos un efecto secundario, añadir en el log el estado.

Cada vez que se cambia el estado _val_ o el estado _phrase_ se ejecuta el effect. Para evitar esto añadimos el array condicionado.

## EffectCondicionado

Si queremos que cada efecto solo se utilice cuando el estado correspondiente cambia, tenemos que añadir un array indicando que variables tienen que cambiar para que el efecto entre en acción. Si queremos que sea cuando cambie _val_:

```js
    useEffect(() => {
        console.log(`typing "${val}"`);
    }, [val]);
```

Para que sea cuando cambie _phrase_:

```js
    useEffect(() => {
        console.log(`saved phrase: "${phrase}"`);
    }, [phrase]);
```

## EffectDestroy

Cuando en la condición del `useEffect` incluimos el array vacio, lo que sucedera es que el efecto se ejecutara solo una vez, cuando se cree el componente. Esto nos permite usar el efecto como inicialización del componente. Si necesitamos añadir tambien una lógica que haga limpieza cuando el componente se destruya, bastara con que el efecto devuelva el método con la lógica de limpieza. Aquí vemos la inicialización y limpieza combinadas en el efecto:

```js
  useEffect(() => {
    window.addEventListener("keydown", forceRender);
    return () => window.removeEventListener("keydown", forceRender);
  }, []);
```

También es interesante ver el uso que hacemos del estado en este ejemplo. Cada vez que cambiamos el estado se fuerza un rederizado del componente. En este ejemplo usamos esta propiedad pero realmente no nos ineresa guardar nada en el estado. Cuando queramos repintar el componente bastara con llamar a `forceRender`:

```js
const [, forceRender] = useState();
```

También podemos ver en este ejemplo como se ha encapsulado en un _custom hook_ nuestro efecto.