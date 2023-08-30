import express from 'express';
import { handleDeleteOperator, handleGetOperator, handleGetOperators, handlePostOperator, handlePutOperator } from './services/apiHandler';

const mysql = require('mysql');

export const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password", /* TODO obviously to change, and not to be stored in a file stored in git */
  database: "sita_exercise",
  multipleStatements: true
});

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password", /* TODO obviously to change, and not to be stored in a file stored in git */
  database: "sita_exercise",
  connectionLimit: 100
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const app = express()
app.use(express.json());
const port = 3000

/* TODO API documentation --> Swagger ? */
app.get('/operators', (req, res) => {
    handleGetOperators(res)
});

/* TODO API documentation --> Swagger ? */
app.get('/operators/:id', (req, res) => {
    handleGetOperator(req.params.id, res)
});

/* TODO API documentation --> Swagger ? */
app.post('/operators', (req, res) => {
    handlePostOperator(req.body, res)
});

/* TODO API documentation --> Swagger ? */
app.put('/operators/:id', (req, res) => {
    handlePutOperator(req.params.id, req.body, res)
});

/* TODO API documentation --> Swagger ? */
app.delete('/operators/:id', (req, res) => {
    handleDeleteOperator(req.params.id, res)
});

  
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});