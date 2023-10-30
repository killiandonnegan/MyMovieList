
module.exports = (app) => {

    const lists = require('./listcontrollers.js'); 


    //create a new list entry
    app.post('/lists', lists.create);

    //get list
    app.get('/lists', lists.findAll);

    //check if title is in list
    app.get('/lists/:_id', lists.findOne);
    
    //delete title
    app.delete('/lists/:_id', lists.delete);

    app.put('/lists/:_id', lists.update);





    var path = require('path');

    app.get('/', function(req,res) { res.sendFile(path.join(__dirname, '../', 'index.html')); } ); //initially serve homepage

    app.get('/server.js', function(req,res) { res.sendFile(path.join(__dirname, '../', 'server.js')); } ); //this file
    app.get('/style.css', function(req,res) { res.sendFile(path.join(__dirname, '../', 'style.css')); } ); //stylesheet
    app.get('/scripts.js', function(req,res) { res.sendFile(path.join(__dirname, '../', 'scripts.js')); } ); //scripts 

    app.get('/assets/logo.png', function(req,res) { res.sendFile(path.join(__dirname, '../', '/assets/logo.png')); } ); //logo

    app.get('/index.html', function(req,res) { res.sendFile(path.join(__dirname, '../', 'index.html')); } ); //homepage
    app.get('/search.html', function(req,res) { res.sendFile(path.join(__dirname, '../', 'search.html')); } ); //search page
    app.get('/watchlist.html', function(req,res) { res.sendFile(path.join(__dirname, '../', 'watchlist.html')); } ); //watchlist page

    app.get('/assets/poster.jpg', function(req,res) { res.sendFile(path.join(__dirname, '../', '/assets/poster.jpg')); } ); //poster



  };
  
  