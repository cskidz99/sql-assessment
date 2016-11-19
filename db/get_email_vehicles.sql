SELECT * FROM Vehicles
JOIN Users ON Vehicles.ownerId = Users.id
WHERE email = $1;
