const express = require("express");
const Contenedor = require("./contenedorProductos.js");


// crear el servidor
const app = express();
const listaProductos = new Contenedor("./productos.txt");
//configurar las rutas

app.get("/productoRandom", async(requests, response) => {
    const resultadoIdRandom = await listaProductos.getByIdRandom();
    //console.log("holaaa" + resultadoIdRandom)

    console.log(resultadoIdRandom)
    response.status(200).json({
        data: resultadoIdRandom
    })

    //response.send(resultadoIdRandom)

})


app.get("/productos", async(req, res) => {
    const productos = await listaProductos.getAll();
    res.status(200).json(
            productos
        )
        //res.send(`Hola Andres`)
})

// levantar el servidor

app.listen(8080, () => {
    console.log("server listening")
});