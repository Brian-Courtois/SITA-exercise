import { IOperator } from "../data-models/operator";
import { getAllOperatorsFromDatabase } from "./dataBase.helper";

export async function handleGetOperators(res: any): Promise<string> {
    console.log('GET /operators')
    return getAllOperatorsFromDatabase(res)
}

export function handleGetOperator(id: string): string {
    /* TODO sanitize id */
    console.log(`GET /operators/${id}`)
    return "Sorry cannot find specific operator with id" + id
    /* const operator = operators.find(op => op.id === id);
    if (operator) {
        res.json(operator);
    } else {
        res.status(404).json({ message: 'Operator not found' });
    } */
}

export function handlePostOperator(body: unknown): number {
    console.log('POST /operators')
    const newOperator: IOperator = body as IOperator; /* TODO Here sanitize body we need to make sure that the user is sending an operator */
    return 200
}

export function handlePutOperator(id: string, body: unknown): number {
    /* TODO sanitize id */
    console.log(`PUT /operators/${id}`)
    const modifiedOperator: IOperator = body as IOperator; /* TODO Here sanitize body we need to make sure that the user is sending an operator */
    return 200
    /* const index = operators.findIndex(op => op.id === id);
    if (index !== -1) {
        operators[index] = updatedOperator;
        res.json(updatedOperator);
    } else {
        res.status(404).json({ message: 'Operator not found' });
    } */
}

export function handleDeleteOperator(id: string): number {
    /* TODO sanitize id */
    console.log(`DELETE /operators/${id}`)
    return 200
    /* const index = operators.findIndex(op => op.id === id);
    if (index !== -1) {
        operators.splice(index, 1);
        res.json({ message: 'Operator deleted' });
    } else {
        res.status(404).json({ message: 'Operator not found' });
    } */
}