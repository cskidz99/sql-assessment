var app = require('./index');
// var db = app.get('db');

  module.exports = {
    getAllUsers: function(req,res,next){
      db.all_users(function(err, users){
        console.log(err, users);
        res.send(users);
      })
    },


  }
