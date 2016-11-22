var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);

    db.user_create_seed(function(){
      console.log("User Table Init");
    });
    db.vehicle_create_seed(function(err,vehicles){
      console.log("Vehicle Table Init")
    });

    app.get('/api/users', function(req,res,next){
      db.all_users(function(err, users){
        // console.log(err, users);
        res.send(users);
      })
    });
    app.get('/api/vehicles', function(req,res,next){
        db.all_vehicles(function(err, vehicles){
          // console.log(err, vehicles);
          res.send(vehicles);
        })
    });
    app.post('/api/users', function(req,res,next){
      var user = req.body;
      db.create_user([user.firstname,user.lastname,user.email],function(err, users){
        // console.log(err, users);
        res.send(users);
      })
    });
    app.post('/api/vehicles', function(req,res,next){
      var vehicle = req.body;
      db.create_vehicle([vehicle.make,vehicle.model,vehicle.year,Number(vehicle.ownerId)],function(err, vehicles){
        // console.log(err, vehicles);
        res.send(vehicles);
      })
    });
    app.get('/api/user/:userId/vehiclecount', function(req,res,next){
      db.count_user_vehicles([Number(req.params.userId)],function(err, vehicles){
        // console.log(err, vehicles);
        res.send(vehicles[0]);
      })
    });
    app.get('/api/user/:userId/vehicle', function(req,res,next){
      db.get_user_vehicles([Number(req.params.userId)],function(err, vehicles){
        // console.log(err, vehicles);
        res.send(vehicles);
      })
    });
    app.get('/api/vehicle', function(req,res,next){
      if(req.query.UserEmail){
        // console.log(req.query.UserEmail);
        db.get_email_vehicles([req.query.UserEmail],function(err,vehicles){
          // console.log(err, vehicles);
          res.send(vehicles);
        })
      } else if (req.query.userFirstStart){
        // console.log(req.query.userFirstStart);
        db.get_firstLetter_vehicles([req.query.userFirstStart+'%'],function(err,vehicles){
          // console.log(err,vehicles);
          res.send(vehicles);
        })
      } else {
        res.send('Error');
      }
    });
    app.get('/api/newervehiclesbyyear', function(req,res,next){
      db.vehicles_by_year(function(err, vehicles){
        // console.log(err, vehicles);
        res.send(vehicles);
      })
    });
    app.put('/api/vehicle/:vehicleId/user/:userId', function(req,res,next){
      db.update_owner([Number(req.params.vehicleId),Number(req.params.userId)],function(err, vehicle){
        // console.log(err, vehicle);
        res.send(vehicle);
      })
    });
    app.delete('/api/user/:userId/vehicle/:vehicleId', function(req,res,next){
      db.delete_vehicle_owner([Number(req.params.userId),Number(req.params.vehicleId)],function(err, vehicle){
        // console.log(err, vehicle);
        res.send('Ownership removed');
      })
    });
    app.delete('/api/vehicle/:vehicleId', function(req,res,next){
      db.delete_vehicle([Number(req.params.vehicleId)],function(err, vehicle){
        // console.log(err, vehicle);
        res.send('Vehicle deleted');
      })
    });
})

app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;
