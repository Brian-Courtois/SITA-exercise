CREATE DATABASE sita_exercise;

USE sita_exercise;

CREATE TABLE vehicleTypes
(
  id              INT unsigned NOT NULL AUTO_INCREMENT,
  name            VARCHAR(150) NOT NULL,
  PRIMARY KEY     (id)
);

INSERT INTO vehicleTypes (name) VALUES
  ( 'A220' ),
  ( 'A320' ),
  ( 'A330' ),
  ( 'A340' ),
  ( 'A350' ),
  ( 'A380' );

CREATE TABLE adress (
    id             INT unsigned NOT NULL AUTO_INCREMENT,
    streetNumber   INT unsigned NOT NULL,
    streetName     VARCHAR(150) NOT NULL,
    cityName       VARCHAR(150) NOT NULL,
    postalCode     INT unsigned NOT NULL,
    country        VARCHAR(150) NOT NULL,
    PRIMARY KEY    (id)
);

CREATE TABLE operators (
    id             INT unsigned NOT NULL AUTO_INCREMENT,
    name           VARCHAR(150) NOT NULL,
    description    VARCHAR(150),
    adress_id      INT unsigned NOT NULL,
    PRIMARY KEY    (id),
    FOREIGN KEY    (adress_id)
        REFERENCES adress(id)
);

CREATE TABLE operatorsVehicleTypes (
    operator_id     INT unsigned NOT NULL,
    vehicleType_id  INT unsigned NOT NULL,
    FOREIGN KEY    (operator_id)
        REFERENCES operators(id),
    FOREIGN KEY    (vehicleType_id)
        REFERENCES vehicleTypes(id)
);