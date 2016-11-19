SELECT count(model) FROM Vehicles
WHERE ownerId = $1;
