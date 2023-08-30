import { IOperator } from "../data-models/operator";
import { deleteOperatorFromDatabase, getAllOperatorsFromDatabase, getOperatorFromDatabase, postOperatorToDatabase } from "./dataBase.helper";


/* TODO make it so that all functions here returns the same type */
export async function handleGetOperators(res: any): Promise<string> {
    console.log('GET /operators')
    return getAllOperatorsFromDatabase(res)
}

export async function handleGetOperator(id: string, res: any): Promise<string> {
    /* TODO sanitize id */
    console.log(`GET /operator/${id}`)
    return getOperatorFromDatabase(id, res)
}

export function handlePostOperator(body: unknown, res: any): void {
    /* TODO Here sanitize body we need to make sure that the user is sending an operator */
    console.log('POST /operators with value: ')
    console.log(body)
    const newOperator: IOperator = body as IOperator;
    postOperatorToDatabase(newOperator, res)
}

export function handlePutOperator(id: string, body: unknown, res: any): void {
    /* TODO sanitize id */
    /* TODO Here sanitize body we need to make sure that the user is sending an operator */
    console.log(`PUT /operators/${id}`)
    res.status(500).send("Not yet implemented")
}

export function handleDeleteOperator(id: string, res: any): Promise<void> {
    /* TODO sanitize id */
    console.log(`DELETE /operators/${id}`)
    return deleteOperatorFromDatabase(id, res)
}