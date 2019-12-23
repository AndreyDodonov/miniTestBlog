const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
   title: {
       type: String,
       required: true
   },
   text: {
       type: String,
       required: true
   },
    date: {
       type: Date,
       default: Date.now
    }
});

// модель posts в базе данных по схеме postSchema
module.exports = mongoose.model('posts', postSchema);

