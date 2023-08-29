-- Inserting a new address
INSERT INTO adress (streetNumber, streetName, cityName, postalCode, country)
VALUES (123, 'New Street', 'New City', 12345, 'New Country');

-- Getting the ID of the newly inserted address
SET @newAddressId = LAST_INSERT_ID();

-- Inserting a new operator with the new address
INSERT INTO operators (name, description, adress_id)
VALUES ('New Operator', 'Description of New Operator', @newAddressId);

SET @newOperatorId = LAST_INSERT_ID();

INSERT INTO operatorsVehicleTypes (operator_id, vehicleType_id)
VALUES (newOperator_id, vehicle_id)