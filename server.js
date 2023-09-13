require('dotenv').config()
const express = require('express')
const app = express()

const todos = [
    {id: 1, title: 'Learn HTML'},
    {id: 2, title: 'Learn CSS'},
    {id: 3, title: 'Learn Javascript'}
]

app.get('/',(req,res) => {
    res.send({msg: 'Welcome to Express Server'})
})

app.get('/todo',(req,res) => {
    res.send(todos)
})

// แปลง code นี้ให้หาจาก id ถ้าไม่มีให้ msg : "have no data" ,status เป็น404
app.get('/todos/:id',(req,res)=>{
    //######## ทำเอง #########
    // let keyId = todos.findIndex(obj => obj.id == [req.params.id])
    // if (todos[keyId]) {
    //     res.send(todos[keyId])
    // } else {
    //     res.status(404).send({msg: 'data not found'})
    // }

    //######## วิธีพี่เจียง #########
    const {id} = req.params
    console.log(id)
    let output = todos.filter(el => el.id === +id)
    if (output.length <=0)
        return res.status(404).json({msg: `Have no data with id=${id}`})
    res.json(output)
})

app.use((req,res) => {
    res.status(404).send({msg: 'resource not found'})
})

let port = process.env.PORT || 8000

app.listen(port,() => {
    console.log('Server on port :', port)
})