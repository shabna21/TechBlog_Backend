const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://userone:userone@cluster0.tixpa.mongodb.net/BlogApp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const schema = mongoose.Schema;

const BlogSchema = new schema({
    writerid: String,
    title: String,
    writer: String,
    about: String,
    content: String,
    approve: String
});

var Blogdata = mongoose.model('Blogdata',BlogSchema);

module.exports = Blogdata;