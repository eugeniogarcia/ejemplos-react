# Instalación

Instalamos esta librería que tiene cientos de [iconos](https://react-icons.github.io/react-icons/):

```ps
npm i react-icons
```

# Highlights

- Esta función crea un array con valores:

```js
const creaArray = length => [...Array(length)];
```

- Especificamos en el componente los estilos que se aplicarán en el _<div>_; permitimos que se pasen propiedades genéricas con _...props_. Observese que en la función extraemos todas las propiedades salvo _total_ y _style_ al _...props_, y que luego ese _...props_ se aplica en el _<div>_:

```js
export default function StarRating({ total = 5, style={},...props}) {

...

<div style={{ padding: "5px", ...style }} {...props}>
```

