
const mongoose = require('mongoose');

const ListSchema = mongoose.Schema({
    _id: Number,  //TMDB id of movie/series
    title: String,  //title of movie/series
    poster_path: String,    //path to poster of movie/series
    overview: String,   //overview of movie/series
    release_date: String,   //release date of movie/series
    vote_average: String,   //average rating of movie/series
    type: String,    //'movie' or 'tv'
    star_rating: String
});


//module.exports = mongoose.model('List', ListSchema);
module.exports = {
    List: mongoose.model('List', ListSchema)
};


