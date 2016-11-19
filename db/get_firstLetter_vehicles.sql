SELECT * FROM Vehicles
JOIN Users ON Vehicles.ownerId = Users.id
WHERE firstname = $1;
