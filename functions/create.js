const mongoose = require('mongoose');
const { List } = require('../app/listmodel.js');

exports.create = (req, res) =>{

  // Create a new list (using schema)
  const list = new List({
      _id: req.body._id,
      title: req.body.title, 
      poster_path: req.body.poster_path,
      overview: req.body.overview,
      release_date: req.body.release_date,
      vote_average: req.body.vote_average,
      type: req.body.type,
      star_rating: req.body.star_rating
  });

  // Save list in the database
  list.save()
  .then(data => {
      res.send(data);
      console.log("Added to list: \n"+data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "An error occurred while adding this entry to the list."
          });
      });
};