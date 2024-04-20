CREATE DATABASE FlightManager;
USE FlightManager;

CREATE TABLE Airplanes (
    id integer PRIMARY KEY AUTO_INCREMENT,
    model varchar(256) NOT NULL,
    capacity integer NOT NULL,
    type varchar(256) NOT NULL
);

CREATE TABLE Flights (
    id integer PRIMARY KEY AUTO_INCREMENT,
    airplaneId integer,
    departureTime datetime,
    arrivalTime datetime,
    destination varchar(256),
    FOREIGN KEY(airplaneId) REFERENCES Airplanes(id)
);


ALTER TABLE FlightManager.Flights
DROP FOREIGN KEY flights_ibfk_1;

ALTER TABLE FlightManager.Flights
ADD CONSTRAINT flights_ibfk_1
FOREIGN KEY (airplaneId)
REFERENCES FlightManager.Airplanes(id)
ON DELETE CASCADE;

Use FlightManager;
Create Table Users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(256) NOT NULL UNIQUE,
password VARCHAR(1024) NOT NULL
);