const List = require('../models/list.model');

module.exports.handler = async (event, context) => {
  try {
    const updatedList = await List.findByIdAndUpdate(
      event.queryStringParameters.id,
      {
        star_rating: event.body.star_rating,
      },
      { new: true }
    );

    if (!updatedList) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: `Title not found with id ${event.queryStringParameters.id}`,
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(updatedList),
    };
  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Could not update title with id ${event.queryStringParameters.id}`,
      }),
    };
  }
};
