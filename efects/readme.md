## Effect

Demuestra el uso de `useEffect`. Con cada renderizado del componente añadimos un efecto secundario, añadir en el log el estado.

Cada vez que se cambia el estado _val_ o el estado _phrase_ se ejecuta el effect. Para evitar esto añadimos el array condicionado.

## EffectCondicionado1

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

## EffectCondicionado2

En javascript solo son comparables los tipos nativos, string, int, etc. Cuando el estado es objeto custom, o un array, si lo usamos como condición para el `useEffect`, para que un valor se considere no modificado, es necesario que la instancia sea la misma. Por ejemplo:

```js
    //Cada renderización instancia un nuevo Array
    const words = children.split(" ");

    useEffect(() => {
        console.log("fresh render");
    }, [words]);
```

Aqui _words_ es un array. Si, como en este ejemplo, el se provoca una renderización del componente - en este ejemplo se fuerza con la función `forceRender`, que realmente no cambia el contenido del estado -, aunque los valores de _words_ no cambien, como se esta creando una nueva instancia en cada renderización, se ejecutara el `useEffect`. Para evitar esto podemos sacar la declaración de la variable de la función, pero esto puede no ser siempre posible, como en este caso - que se precisa usar el _props_ _children_, podemos usar el hook __useMemo__.

## EffectCondicionado3

Con useMemo tenemos la posibilidad de cachear un valor. Si llamamos a useMemo dos veces con el mismo _valor_, la segunda vez se obtiene la misma respuesta, pero desde la cache. El valor se especifica con el segundo argumento, el dependency array, en este caso, _children_:

```js
    const words = useMemo(() => children.split(" "), [children]);

    useEffect(() => {
        console.log("fresh render");
    }, [words]);
```

## EffectLayout

Con `useLayoutEffect` podemos definir un efecto que se invoca antes de que se pinte el componente y después de que se haya creado. Tendremos acceso a las propiedades del componente, y la posibilidad de "tocarlas" antes de que el componente sea visible. Como siempre, podemos definir un Array condicional. En este ejemplo usamos `useLayoutEffect` a modo de inicialización, capturando el tamaño de la ventana antes de que se pinte, y subscribiendonos al evento de redimensión de la ventana:

```js
    useLayoutEffect(() => {
        window.addEventListener("resize", resize);
        //Tomamos el tamaño antes de que se pinte la ventana
        resize();
        console.log("useLayoutEffect!!");
        return () => window.removeEventListener("resize", resize);
    }, []);
```

Si `useLayoutEffect` devuelve una función, esta función será invocada cuando el componente se destruya.