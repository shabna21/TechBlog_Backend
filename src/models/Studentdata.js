const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@cluster0.tixpa.mongodb.net/BlogApp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const schema = mongoose.Schema;

const StudentSchema = new schema({
    name: String,
    email:String,
    password: String
});

var Studentdata = mongoose.model('Studentdata',StudentSchema);

module.exports = Studentdata;