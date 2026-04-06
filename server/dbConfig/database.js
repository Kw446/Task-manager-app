const dotenv = require('dotenv');
dotenv.config();

const config={
    DBconnection: process.env.MONGO_URL

}
module.exports={config};