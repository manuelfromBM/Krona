const numeros = {a:1, b:2, c:3}

const {a, ...resto_numeros} = numeros

console.log(resto_numeros)

const nuevo = {...resto_numeros, d:4};

console.log(nuevo)