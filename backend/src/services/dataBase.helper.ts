import { con } from "..";
import { IOperator } from "../data-models/operator";

export async function getAllOperatorsFromDatabase(res: any): Promise<string> {
    return con.query("SELECT * FROM operators", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.status(200).json(result)
    });
}

export async function getOperatorFromDatabase(id: string, res: any): Promise<string> {
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

export async function postOperatorToDatabase(newOperator: IOperator, res: any): Promise<string> {
    return con.query(`
    -- Inserting a new address
    INSERT INTO adress (streetNumber, streetName, cityName, postalCode, country)
    VALUES (` + newOperator.adress.streetNumber + `,
            '`+ newOperator.adress.streetName +`',
            '`+ newOperator.adress.cityName +`',
            ` + newOperator.adress.postalCode + `,
            '`+ newOperator.adress.country +`'
    );
    
    -- Getting the ID of the newly inserted address
    SET @newAddressId = LAST_INSERT_ID();
    
    -- Inserting a new operator with the new address
    INSERT INTO operators (name, description, adress_id)
    VALUES ('`+ newOperator.name +`',
            '`+ newOperator.description +`',
            @newAddressId);
            
    SELECT LAST_INSERT_ID();
    `
    ,
     function (err, result, fields) {
        if (err) throw err;
        const newOperatorId = result[3]
        console.log('newOperatorId= ' + newOperatorId)
        
        addVehicleTypesToOperator(newOperator, newOperatorId).then(() => res.status(200).json(result))
    })
}

function addVehicleTypesToOperator(newOperator: IOperator, newOperatorId: string): Promise<string> {
    return new Promise((resolve, reject) => {

        for (let vehicleType in newOperator.supportedVehicleTypes) {
            con.query(`INSERT INTO operatorsVehicleTypes (operator_id, vehicleType_id) VALUES
            (
                '` + newOperatorId + `',
                '` + vehicleType + `'
            );`,
            (err, results, fields) => {
            if (err) reject(err)
          })
        }
  
      // resolve promise after loop completes
      resolve('success');
      })
    }