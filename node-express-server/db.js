const mongoose = require('mongoose');
require('dotenv/config');


mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>console.log('connected'))
    .catch(e=>console.log(e));

module.exports = mongoose;