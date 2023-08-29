import { con } from "..";

export async function getAllOperatorsFromDatabase(res: any): Promise<string> {
    return con.query("SELECT * FROM operators", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.status(200).json(result)
    });
}

export async function getOperatorFromDatabase(id: string,res: any): Promise<string> {
    return con.query(
    `SELECT
        operators.name,
        operators.description,
        adress.streetNumber,
        adress.streetName,
        adress.cityName,
        adress.postalCode,
        adress.country
    FROM operators
    INNER JOIN adress
    ON adress.id = operators.adress_id
    WHERE operators.id = '` + id + `';

    SELECT vehicleTypes.name
    FROM vehicleTypes
    INNER JOIN operatorsVehicleTypes
    ON vehicleTypes.id = operatorsVehicleTypes.vehicleType_id
    WHERE operatorsVehicleTypes.operator_id = '` + id + `'; `,
        
        function (err, result, fields) {
        if (err) throw err;
        console.log(result[0]);
        console.log(result[1]);
        if(result[0].length === 0) {
            res.status(404).send('Unknown operator id')
        } else {
            res.status(200).json(result)
        } 
    });
}