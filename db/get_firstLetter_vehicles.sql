SELECT * FROM Vehicles
JOIN Users ON Vehicles.ownerId = Users.id
WHERE firstname iLike $1 ; --|| '%'
