const fs = require("fs");

class Contenedor {
    constructor(nameFile) {
        this.nameFile = nameFile;

    }

    save = async(product) => {
        try {
            //leer si el archivo existe
            if (fs.existsSync(this.nameFile)) {
                const contenido = await fs.promises.readFile(this.nameFile, "utf8");
                if (contenido) {
                    const productos = JSON.parse(contenido);
                    // verificar si el p ya existe
                    const newProducto = {
                        id: productos.length + 1,
                        ...product
                    }
                    productos.push(newProducto);
                    await fs.promises.writeFile(this.nameFile, JSON.stringify(productos, null, 2))
                } else {
                    const newProducto = {
                            id: 1,
                            ...product
                        }
                        //creamos el archivo
                    await fs.promises.writeFile(this.nameFile, JSON.stringify([newProducto], null, 2));
                }
            } else {
                const newProducto = {
                        id: 1,
                        ...product
                    }
                    //creamos el archivo
                await fs.promises.writeFile(this.nameFile, JSON.stringify([newProducto], null, 2));
            }
        } catch (error) {
            console.log(error);
        }

    }

    getById = async(id) => {
        try {
            if (fs.existsSync(this.nameFile)) {
                const contenido = await fs.promises.readFile(this.nameFile, "utf8");
                if (contenido) {
                    const productos = JSON.parse(contenido);
                    const producto = productos.find(item => item.id === id);
                    return producto
                } else {
                    return "El archivo esta vacio"
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    getAll = async() => {
        const contenido = await fs.promises.readFile(this.nameFile, "utf8");
        const productos = JSON.parse(contenido);
        return productos
    }

    /////////////

    getByIdRandom = async() => {
        const productos = await listaProductos.getAll();
        const rango = productos.length;
        //console.log(rango)
        const idRandom = parseInt(Math.random() * rango + 1)
            //console.log(idRandom)
        const productoRandom = await listaProductos.getById(idRandom);
        //const productoRandom = JSON.parse(resultadoId);
        //console.log(resultadoId)
        console.log("paso por aca")
        return productoRandom
    }



    ////////////
    deleteById = async(id) => {
        const contenido = await fs.promises.readFile(this.nameFile, "utf8");
        const productos = JSON.parse(contenido);
        const productosSinId = productos.filter(item => item.id !== id);
        console.log(productosSinId)
        await fs.promises.writeFile(this.nameFile, JSON.stringify([], null, 2));
        await fs.promises.writeFile(this.nameFile, JSON.stringify(productosSinId, null, 2));
        return productosSinId

    }

    deleteAll = async() => {
        await fs.promises.writeFile(this.nameFile, JSON.stringify([], null, 2));
    }
}


const listaProductos = new Contenedor("./productos.txt")

//console.log(listaProductos)


const producto1 = {
    title: "Camisa",
    price: "300",
    thumbnail: "www.google.com"
}


const producto2 = {
    title: "Remera",
    price: "400",
    thumbnail: "www.google.com"
}
const producto3 = {
    title: "pantalon",
    price: "500",
    thumbnail: "www.google.com"
}

const crearProducto = async() => {
    //await listaProductos.save(producto1);
    //await listaProductos.save(producto2);
    //await listaProductos.save(producto3);
    //const resultadoId = await listaProductos.getById(2);
    //console.log(resultadoId)
    /*
    const productos = await listaProductos.getAll();
    const rango = productos.length;
    console.log(rango)
    idRandom = parseInt(Math.random() * rango + 1)
    console.log(idRandom)
    const resultadoId = await listaProductos.getById(idRandom);
    console.log(resultadoId)
    */
    //const productosDelete = await listaProductos.deleteById(1);
    //console.log(productosDelete)
    //const resultadoIdRandom = await listaProductos.getByIdRandom();
    //console.log(resultadoIdRandom)
}

crearProducto();

module.exports = Contenedor;