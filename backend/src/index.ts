import express from 'express';
import { handleDeleteOperator, handleGetOperator, handleGetOperators, handlePostOperator, handlePutOperator } from './services/apiHandler';
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
  });/* TODO remove */

app.get('/operators', (req, res) => {
    const result = handleGetOperators()
    res.status(200).send(result)
});

app.get('/operators/:id', (req, res) => {
    const id = req.params.id
    const result = handleGetOperator(id)
    res.status(200).send(result)
    /* TODO 404 status for operator not found */
});

app.post('/operators', (req, res) => {
    console.log('POST /operators');
    const result = handlePostOperator(req.body)
    if( result === 201) {
        res.status(201).send("Operator created!");
    } else {
        res.status(500).send("SOmething wrong happened")
    }
});

app.put('/operators/:id', (req, res) => {
    const id = req.params.id
    const result = handlePutOperator(id, req.body)
    if(result === 200) {
        res.status(200).send("Operator modified!");
    } else {
        res.status(500).send("SOmething wrong happened")
    }/* TODO 404 status for operator not found */
});

app.delete('/operators/:id', (req, res) => {
    const id = req.params.id;
    const result = handleDeleteOperator(id)
    if(result === 200) {
        res.status(200).send("Operator deleted!");
    } else {
        res.status(500).send("SOmething wrong happened")
    }/* TODO 404 status for operator not found */
});

  
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});