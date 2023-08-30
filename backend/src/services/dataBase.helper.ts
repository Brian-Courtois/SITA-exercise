import { con, pool } from "..";
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
        if(result[0].length === 0) {
            res.status(404).send('Unknown operator id')
        } else {
            res.status(200).json(result)
        } 
    });
}

export async function postOperatorToDatabase(newOperator: IOperator, res: any): Promise<void> {
    try {
        // Query the database for the first query
        const firstQueryResult = await queryDatabase(`
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
        `) as any;
        const newOperatorId = firstQueryResult[firstQueryResult.length - 1][0]['LAST_INSERT_ID()']
    
        // Use the result of the first query for the second query
        await addVehicleTypesToOperatorInDatabase(newOperator, newOperatorId)
    
        res.status(200).json({ message: 'Success: added operator with id: ' + newOperatorId});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

export async function deleteOperatorFromDatabase(id: string, res: any): Promise<void> {
    /* TODO I did not took the time to properly clean the adress table */
    return con.query(
        `DELETE FROM operatorsVehicleTypes
        WHERE operator_id = '` + id + `';
    
        DELETE FROM operators
        WHERE id = '` + id + `'; `,
            
            function (err, result, fields) {
            if (err) throw err;
            if(result[0].length === 0) {
                res.status(404).send('Unknown operator id')
            } else {
                res.status(200).send('Operator with id: ' + id + ' deleted successfully')
            }})
}

async function addVehicleTypesToOperatorInDatabase(newOperator: IOperator, newOperatorId: string): Promise<void> {
    try {
        const promises = [];
    
        // Loop through the array
        newOperator.supportedVehicleTypes.forEach((vehicleType) => {
              const query = `INSERT INTO operatorsVehicleTypes (operator_id, vehicleType_id) VALUES
              (
                  '` + newOperatorId + `',
                  '` + vehicleType + `'
              );`;
              const promise = performQueryInPool(query);
              promises.push(promise);
            }) 
    
        // Wait for all queries to finish
        await Promise.all(promises);
    
        // Send a 200 OK response
      } catch (error) {
        // Handle errors here
        console.error('Error:', error);
        throw error;
      }
    }

function queryDatabase(query) {
    return new Promise((resolve, reject) => {
        con.query(query, (error, results) => {
        if (error) {
            reject(error);
        } else {
            resolve(results);
        }
        });
    });
}

function performQueryInPool(query) {
    return new Promise((resolve, reject) => {
      pool.query(query, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
}