const { List } = require('./listmodel.js'); 


//POST Request - add title
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


//GET Request - get all titles in list
exports.findAll = (req, res) => {
    List.find()
    .then(lists => {
        res.send(lists);
        console.log("Found the following in the list: \n");
        console.log(lists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving entries in list."
        });
    });
};

exports.findOne = (req, res) => {
    List.findById(req.params._id)
    .then(lists => {
        res.send(lists);
        console.log("Found the following in the list: \n");
        console.log(lists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "An error occurred while retrieving entries in list."
        });
    });
};



//DELETE Request - delete title by id
exports.delete = (req, res) => {
    console.log(req.params._id);
    List.findByIdAndDelete(req.params._id)
        .then(list => {
            if(!list) { //if title is not found in list
                return res.status(404).send({
                    message: "Title not found id" + req.params._id
                });
            }
            res.send({message: "Title removed." +req.params._id}); //if title is in list
        })
        .catch(err => {
            if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Title not found with id: " + req.params._id
                });
            }
            return res.status(500).send({
                message: "Could not delete title with id:  " + req.params._id
            });
        });
};


exports.update = (req, res) => {
    List.findByIdAndUpdate(req.params._id, {
        star_rating: req.body.star_rating
    },
        { new: true }) // "new: true" return updated object
    .then(list => {
        if(!list) {
            return res.status(404).send({
            });
        }
        res.send(list);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
            });
        }
        return res.status(500).send({
        });
    });
};