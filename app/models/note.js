var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
	note_name:{type: String, required: true, index: {unique: true}},
	text:String
});



module.exports = mongoose.model('Note', NoteSchema);