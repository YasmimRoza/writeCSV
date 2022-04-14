import express from 'express'

const server = express()

// third
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

const data = [
    {
      name: 'Yasmim',
      surname: 'Roza',
      age: 23,
      gender: 'F'
    }
  ];


fs.createReadStream('data.csv')
    .pipe(csv.parse())
    .on('error', (error) => console.error(error))
    .on('data', (row) => console.log(row))
    .on('end', function () {
        writeToCSVFile(data)
    })

function writeToCSVFile(users: any) {
   const filename = 'test.csv';
   fs.writeFile(filename, extractAsCSV(users), err => {
   if (err) {
    console.log('Error writing to csv file', err);
   } else {
    console.log(`saved as ${filename}`);
   }
   });
}
      
function extractAsCSV(users: any) {
    const header = ["Username, Password, Roles"];
    const rows = users.map((data: { name: any; surname: any; age: any; gender: any ;roles: any }) =>
      `${data.name}, ${data.surname}, ,${data.gender}, ${data.roles}`
     );
    return header.concat(rows).join("\n");
}
// last

server.listen(3000, () => console.log('Hello World!!'))
