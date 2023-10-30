const { List } = require('../app/listmodel.js');

exports.deleteTitleById = (req, res) => {
    const titleId = req.params._id;
  
    List.findByIdAndDelete(titleId)
      .then((title) => {
        if (!title) {
          return res.status(404).send({
            message: `Title not found with id ${titleId}.`,
          });
        }
  
        res.send({
          message: `Title with id ${titleId} has been deleted successfully.`,
        });
      })
      .catch((err) => {
        if (err.kind === "ObjectId" || err.name === "NotFound") {
          return res.status(404).send({
            message: `Title not found with id ${titleId}.`,
          });
        }
  
        return res.status(500).send({
          message: `Could not delete title with id ${titleId}.`,
          error: err.message,
        });
      });
  };
  