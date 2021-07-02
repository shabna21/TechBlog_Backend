const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@cluster0.tixpa.mongodb.net/BlogApp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const schema = mongoose.Schema;

const AdminSchema = new schema({
    name: String,
    email:String,
    password: String
});

var Admindata = mongoose.model('Admindata',AdminSchema);

module.exports = Admindata;