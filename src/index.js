"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.listen(process.env.PORT || 3000, function () { return console.log('Servidor funcionando...'); });


// Route
app.get('/', (req, res) => {
    res.send('Welcome to my API!');
  }); 
// all customers
app.get('/customers', (req, res) => {
  const sql = 'SELECT * FROM clientes';

  connection.query(sql, (error, results) => {
    if (error) throw error;
    if (results.length > 0) {
      res.json(results);
    } else {
      res.send('Not result');
    }
  });
});