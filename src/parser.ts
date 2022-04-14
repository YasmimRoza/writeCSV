import express from 'express'

const server = express()

// second

import fs from 'fs'
import csv from 'csv-parser'
import randomWords from 'random-words'

const users: any = []

function generateUsername(firstname: any, surname: any){
    return `${firstname[0]}-${surname}`.toLowerCase();
}

fs.createReadStream('input.csv')
  .pipe(csv())
  .on('data', function (row) {
    const username = generateUsername(row.Firstname, row.Surname);
    const password = randomWords(3).join("-");
    
    const user = {
        username,
        firstname: row.Firstname,
        surname: row.Surname,
        roles: row.Roles,
        password
    }
    users.push(user)
  })
  .on('end', function () {
    writeToCSVFile(users)
  })

function writeToCSVFile(users: any) {
    const filename = 'output.csv';
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
    const rows = users.map((user: { username: any; password: any; roles: any }) =>
       `${user.username}, ${user.password}, ${user.roles}`
    );
    return header.concat(rows).join("\n");
}

// last

server.listen(3000, () => console.log('Hello World!!'))
