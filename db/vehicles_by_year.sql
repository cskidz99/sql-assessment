SELECT make,model,year,firstname,lastname FROM Vehicles
JOIN Users ON Vehicles.ownerId = Users.id
WHERE YEAR > 2000
ORDER BY YEAR DESC;
