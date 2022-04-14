import express from 'express'

const server = express()

//first



const data = [
    {
      name: 'Yasmim',
      surname: 'Roza',
      age: 23,
      gender: 'F'
    }
];


//second

server.listen(3000, () => console.log('Hello World!!'))
