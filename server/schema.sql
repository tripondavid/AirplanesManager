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
