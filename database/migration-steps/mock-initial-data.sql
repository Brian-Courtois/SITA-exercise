INSERT INTO adress ( streetNumber, streetName, cityName, postalCode, country) VALUES 
    (123, 'Main Street', 'Cityville', 12345, 'United States'),
    (456, 'Broadway Avenue', 'Townsville', 67890, 'Canada'),
    (789, 'High Street', 'Villagetown', 54321, 'United Kingdom');

INSERT INTO operators (name, description, adress_id) VALUES
    ('Operator 1', 'First operator - small aircrafts', 3),
    ('Operator 2', 'Second operator - big aircrafts', 2);

INSERT INTO operatorsVehicleTypes (operator_id, vehicleType_id) VALUES 
    (1, 1),
    (1, 2), #first operator uses A220 and A320
    (2, 4),
    (2, 5),
    (2, 6); #second operator uses A340, A350 and A380
