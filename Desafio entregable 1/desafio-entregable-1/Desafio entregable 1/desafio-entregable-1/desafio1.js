class ProductManager {
    #precioBaseDeGanancia = 3.10;
  
    constructor() {
      this.productos = [];
    }
  
    getProductos() {
      return this.productos;
    }
  
    agregarProducto(nombre, descripcion, precio, imagen, codigo, stock) {
      let producto = {
        nombre,
        descripcion,
        precio: precio * this.#precioBaseDeGanancia,
        imagen,
        codigo,
        stock: [],

      };
  
      if (this.productos.length === 0) {
        producto["id"] = 1;
      } else {
        producto["id"] = this.productos[this.productos.length - 1]["id"] + 1;
      }
  
      this.productos.push(producto);
    }
  
    agregarStock(idProducto, idDisponible) {
      let response;
      for (let i = 0; i < this.productos.length; i++) {
        if (this.productos[i].id === idProducto) {
          if (this.productos[i].stock.includes(idDisponible)) {
            response = "Hay stock disponible";
            break;
          }
  
          this.productos[i].stock.push(idDisponible);
          response = "No hay stock disponible";
          break;
        }
      }
      return response;
    }
  }


  
  const fs = require('fs')

class ManagerUsuarios {
  constructor(){
    if(fs.existsSync('./Usuarios.json')){
      this.usuarios = JSON.parse(fs.readFileSync('./Usuarios.json', 'utf-8'))
    } else {
      this.usuarios = []
    }
  }
  async crearUsuario(nombre, descripcion, precio, stock){
    const usuario = {
      nombre,
      descripcion,
      precio,
      stock,
      fecha: new Date().toLocaleString()
    }

    this.usuarios.push(usuario)

    await fs.promises.writeFile('./Usuarios.json', JSON.stringify(this.usuarios, null, '\t'))
    
    console.log('Usuario Creado')
  }

  async consultarUsuarios(){
    return  JSON.parse(await fs.promises.readFile('./Usuarios.json')) 
  }

  async eliminarUsuario(nombre) {
    let user = this.usuarios.findIndex(usuario => usuario.nombre === nombre)
    console.log(user)
    
    user = this.usuarios
    await fs.promises.writeFile('./Usuarios.json', JSON.stringify(this.usuarios, null, '\t'))
    return 

  }
}

const usuarioManager = new ManagerUsuarios()

usuarioManager.crearUsuario({
  nombre: 'juan',
  descripcion: 'tortas',
  precio: 1500,
  stock: 'disponible'
})

usuarioManager.consultarUsuarios()
  .then(data => console.log(data))

usuarioManager.eliminarUsuario('juan')
  .then(resultado => console.log(resultado))