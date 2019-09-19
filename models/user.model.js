const mongoose = require('mongoose');
const schema = mongoose.Schema({
    name:{
        type:String
    },
    googleid:{
        type:String
    }
});


module.exports = mongoose.model('user',schema);