import { con } from "..";

export function getAllOperatorsFromDatabase(): string | never {
    let toReturn: string
    con.connect((err) => {
        if (err) {
            throw err;
        } else {
            console.log("Connected to database!");
            con.query("SELECT * FROM operators", function (err, result, fields) {
                if (err) throw err;
                console.log(result);
                toReturn = result
            });
        }
    })
    return toReturn
}