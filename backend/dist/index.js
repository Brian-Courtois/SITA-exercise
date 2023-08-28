"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apiHandler_1 = require("./services/apiHandler");
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/operators', (req, res) => {
    res.status(200).send((0, apiHandler_1.handleGetOperator)());
});
/* app.get('/operators/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(`GET /operators/${id}`);
    const operator = operators.find(op => op.id === id);
    if (operator) {
        res.json(operator);
    } else {
        res.status(404).json({ message: 'Operator not found' });
    }
});

app.post('/operators', (req: Request, res: Response) => {
    console.log('POST /operators');
    const newOperator: IOperator = req.body;
    operators.push(newOperator);
    res.status(201).json(newOperator);
});

app.put('/operators/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(`PUT /operators/${id}`);
    const updatedOperator: IOperator = req.body;
    const index = operators.findIndex(op => op.id === id);
    if (index !== -1) {
        operators[index] = updatedOperator;
        res.json(updatedOperator);
    } else {
        res.status(404).json({ message: 'Operator not found' });
    }
});

app.delete('/operators/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(`DELETE /operators/${id}`);
    const index = operators.findIndex(op => op.id === id);
    if (index !== -1) {
        operators.splice(index, 1);
        res.json({ message: 'Operator deleted' });
    } else {
        res.status(404).json({ message: 'Operator not found' });
    }
}); */
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map