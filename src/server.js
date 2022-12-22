import express from 'express';
import UserManager from './UserManager.js'

const app = express()


const productos = [
    {
      id: 1,
      nombre: "Mousse de chocolate",
      precio: 2000,
    },
    {
      id: 2,
      nombre: "Marquise",
      precio: 1700,
    },
    {
      id: 3,
      nombre: "Chocotorta",
      precio: 1500,
    },
  ];
  

app.get('/', (req, res) => {
    res.send('<h1 style="color:red;"> Bienvenidos a mi pagina web </h1>')
})

app.get('/usuario/:id', async (req, res) => {
    const { id } = req.params
    const users = userManager.getUsers()
    console.log(users)
    const user = users.find(user => user.id == id)
    console.log(user)

    if(!user) {
        return res.send('User not found')
    }

    res.json(user)

})

app.get('/productos', (req, res) => {
    const { nombre, precio } = req.query
    const producto = productos.find(prod => prod.nombre === nombre || prod.precio == precio)

    if(!producto) {
        return res.send('Producto not found')
    }

    res.json(producto)
})

// app.get('/usuario', (request, response) => {
//     const usuario = {
//         name: 'juan',
//         age: 32,
//         email: 'juan@gmail.com',
//     }
//     response.json(usuario)
// })

// app.get('*', (request, response) => {
//     response.send('error')
// })

app.listen(3000, () => console.log('Listening on port 3000'))