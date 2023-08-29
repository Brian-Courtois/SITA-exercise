import { con } from "..";

export async function getAllOperatorsFromDatabase(res: any): Promise<string> {
    return con.query("SELECT * FROM operators", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.status(200).send(result)
    });
}