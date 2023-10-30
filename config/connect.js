require('dotenv').config(); // Load environment variables from .env file
module.exports = {
    database: {
        url: process.env.url
    }
}