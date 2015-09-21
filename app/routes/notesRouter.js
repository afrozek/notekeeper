//dependencies
var Note = require('../models/note.js');


//api
module.exports = function(app,express){


var notesRouter = express.Router();

//get all notes
notesRouter.get('/',function(req,res){
	Note.find(function(err,notes){
		if(err)res.send(err);
		res.json(notes);	
	})
})

//get a single note
notesRouter.get('/getNote/:noteName',function(req,res){
	var noteName = req.params.noteName;

	Note.findOne({note_name:noteName},function(err,note){
		if(err)res.send(err);
		res.json(note);
	});
})//end get

//update a single note by name
notesRouter.put('/updateNote/:noteName',function(req,res){
	var noteName = req.params.noteName;
	var noteText = req.body.text;

	Note.findOne({note_name:noteName},function(err,note){
		//if(err) res.send(err);
		
			if(noteText)note.text=noteText;
			note.save(function(err){
				if(err) res.send(err);
			 res.json(note);
			});
	});
})//end put

//create a new note
notesRouter.post('/newNote',function(req,res){

	//new note object
	var newNote = new Note();

	//assign post data to variables
	newNote.note_name = req.body.note_name;
	newNote.text = req.body.text;

	//save to mongo
	newNote.save(function(err){
		if(err) {
			console.log(err);
			if(err.code == 11000) {
				console.log(err)
				return res.json({message:"note name already exists"});
			}
			else {
				return res.send(err);
			}
		}
		else res.json({message: "note saved", note: newNote});
	});

})//end post route

notesRouter.delete('/deleteNote/:name',function(req,res){
	noteName = req.params.name;
	Note.remove({note_name:noteName},function(err){
		if(err) res.send(err);
		res.json({"message":"removed"});
	})
})


return notesRouter;

}