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