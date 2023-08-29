SELECT
    operators.name,
    operators.description,
    adress.streetNumber,
    adress.streetName,
    adress.cityName,
    adress.postalCode,
    adress.country,
    operatorsVehicleTypes.vehicleType_id
FROM operators
INNER JOIN adress
ON adress.id = operators.adress_id
WHERE operators.id = 1;


SELECT vehicleTypes.name
FROM vehicleTypes
INNER JOIN operatorsVehicleTypes
ON vehicleTypes.id = operatorsVehicleTypes.vehicleType_id
WHERE operatorsVehicleTypes.operator_id = 1;