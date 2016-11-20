UPDATE Vehicles
SET ownerId = NULL
WHERE ownerId = $1 AND id = $2;
