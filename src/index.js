// "use strict";
// const mysql = require('mysql');
// const routes = require('./routes')

// const bodyParser = require('body-parser');

// const PORT = process.env.PORT || 3050;

// const app = express();
// var __importDefault = (this && this.__importDefault) || function (mod) {
//     return (mod && mod.__esModule) ? mod : { "default": mod };
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// var express_1 = __importDefault(require("express"));
// var app = express_1.default();

// MySql
// const connection = mysql.createConnection({
//   host: 'mysql.pcoriente.com.mx',
//   user: 'useroriente',
//   password: 'Oriente65',
//   // database: 'node_mysql_ts',
//   database: 'webpcoriente',
// });

// // Check connect
// connection.connect(error => {
//   if (error) throw error;
//   console.log('Database server running!');
// });
// // Route
// app.get('/', (req, res) => {
//     res.send('Welcome to my API!');
  // }); 
// // all customers
// app.get('/clientes', (req, res) => {
//   const sql = 'SELECT * FROM clientes';

//   connection.query(sql, (error, results) => {
//     if (error) throw error;
//     if (results.length > 0) {
//       res.json(results);
//     } else {
//       res.send('Not result');
//     }
//   });
// });
