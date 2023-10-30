const { List } = require('../app/listmodel.js');

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