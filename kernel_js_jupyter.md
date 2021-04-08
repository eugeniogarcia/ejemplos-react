# Instalación

Vamos a añadir un [kernel](https://github.com/yunabe/tslab) de javascript a jupyter. Primero tenemos que instalar el software:

```ps
npm install tslab -g
```

Podemos comprobar que se ha instalado usando el cli:

```ps
tslab --version

tslab 1.0.15
```

A continuación podemos instalar el kernel:

```ps
tslab install
```

Podemos comprobar que el kernel se ha instalado:

```ps
jupyter kernelspec list

Available kernels:
  jslab      C:\Users\Eugenio\AppData\Roaming\jupyter\kernels\jslab
  tslab      C:\Users\Eugenio\AppData\Roaming\jupyter\kernels\tslab
  python3    C:\Users\Eugenio\Anaconda3\share\jupyter\kernels\python3
  ```