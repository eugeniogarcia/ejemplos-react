Las error boundaries permiten gestionar errores generados en una parte del árbol de componentes. Las error boundaries solo se pueden implementar por medio de un steful component, esto es, con una clase.

La clave en la definición de una error boundary es el método `getDerivedStateFromError`. Este método se invoca antes de hacer el rendering, y cuando se produce un error. Lo que el método devuelva se informa en el estado del componente, y podrá usarse para hacer su renderizado.

```js
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
```

También se demuestra como cargar componentes bajo demanda. Podemos ver en `App.js`::

```js
//Cardamos bajo demanda un componente
const Main = lazy(() => import("./Main"));
```

Finalmente, se demuestra el uso del componente __suspense__. El componente es un wrapper que nos permite mostrar un failback mientras sus hijos se cargan. 

En este ejemplo mostramos el componente `Main` cuando el usuario acepta los terminos y condiciones, y el componente `Agreement` en caso contrario. El componente `Main` se carga solo cuando se necesita, no en la carga inicial:

```js
export default function App() {
  const [agree, setAgree] = useState(false);

  if (!agree) return <Agreement onAgree={() => setAgree(true)} />;

  //Mientras se hace la carga bajo demanda del componente Main, se muestra ClimbingBoxLoader
  return (
    <Suspense fallback={<ClimbingBoxLoader />}>
      <Main />
    </Suspense>
  );
}
```

Podemos anidar el componente _Suspense_ con una _ErrorBoundary_ de modo que una vez que se hayan renderizado los hijos de Suspense, en caso de que se produzca un error, sea gestionado.

# Suspense

Hay dos formas de recuperar datos para ser presentados en un componente:
- Hacer el renderizado, y con un `useEffect` invocar a los servicios que necesitamos invocar. Esta técnica la hemos usado en el los proyectos `recupera_datos`. Aquí podemos verlo en acción en el componente `ReposGraphQL`

Tenemos un estado en el que guardar los datos que recuperemos:
```js
export function ReposGraphQL({ usuario = "eugeniogarcia" }) {
    const [userData, setUserData] = useState();
```

En el `useEffect` invocamos al servicio para recuperar los datos. Cuando la promise se resuelva actualizaremos el estado con los datos recuperados:

```js
    useEffect(() => {
        recuperaInfo(usuario)
            .then(setUserData)
            .catch(console.error);
    }, [usuario]);
```

Al hacer el renderizado contemplamos dos escenarios. Cuando tenemos datos en el estado y cuando no:

```js
    if (!userData) return <p>Cargando Datos...</p>;
    return (
        <>
            <UserDetails {...userData} />
            <p>{userData.repositories.totalCount} - repos</p>
            <List
                data={userData.repositories.nodes}
                renderItem={repo => <span>{repo.name}</span>}
            />
        </>
    );
}
```

- El otro enfoque es usar `Suspense`. La técnica que usamos en este caso the interrumpir el proceso de renderización haciendo el `throw` de una `Promise`. `Suspense` interceptara la petición de modo que cuando la Promise se resuelva se continuará con el rendering. La técnica que usaremos en este caso es la siguiente. Típicamente anidaremos el componente que queramos renderizar dentro de un `Suspense`, y típicamente, dentro de un `ErrorBoundary`:

```js
      <ErrorBoundary>
        <div class="row">
          <div class="column">
            <Suspense fallback={<GridLoader />}>
              <ReposGraphQLSusp />
```

En el componente
  1. Definimos el recurso
  2. Obtenemos los datos a partir del recurso
  3. Renderizamos los datos

```js
//Define el recurso
var recurso;

export function ReposGraphQLSusp({ usuario = "eugeniogarcia" }) {

    //Cremos el recurso
    if (!recurso) recurso = wrapPromise(recuperaInfo(usuario));
    //Obtenemos los datos
    const userData = recurso.read()

    //Renderizamos los datos
    return (
        <>
            <UserDetails {...userData} />
            <p>{userData.repositories.totalCount} - repos</p>
            <List
                data={userData.repositories.nodes}
                renderItem={repo => <span>{repo.name}</span>}
            />
        </>
    );
}
```

Obtener los datos significa:
  1. Crear una `Promise`
  2. Hacer un `throw` de la Promise. Esto interrumpira el rendering, `Suspense` tomará el control y renderizará el `fallback`
  3. Cuando la Promise se resuelva, hacer un `throw` del error en caso de que se produzca, o devolver los datos
  4. Si se `throw` el error será interceptada por la `ErrorBoundary`, y si los datos, se __continuará__ con el renderizado

Hemos definido un recurso, que define en un closure la `Promise`:

```js
//Aplica alrededor de la promise
export function wrapPromise(promise) {
    //... administra el estado. Pendiente de resolver la promise, o resuelta. Cuando resuelta, se puede resolver con un error o con los datos 
    let status = "pending";
    let result;
    let suspender = promise.then(
        (r) => {
            status = "success";
            result = r;
        },
        (e) => {
            status = "error";
            result = e;
            console.log(result);

        }
    );
    //Retornamos un método que gestiona las tres posibilidades, hacer un throw de la Promise, un throw del error, o los datos
    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return result;
            }
        },
    };
}
```

## Lazy download

Con suspend también se gestiona el lazy download. Si tenemos un componente como `Main` que lo cargamos bajo demanda:

```js
const Main = lazy(() => import("./Main"));
```

Con suspense mostraremos un fallback mientras se descarga `Main`:

```js
  return (
    <ErrorBoundary>
      <Suspense fallback={<ClimbingBoxLoader />}>
        <Main />
      </Suspense>
    </ErrorBoundary>
  );`
```
