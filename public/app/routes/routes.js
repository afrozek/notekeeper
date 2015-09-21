angular.module('app',[])


.controller('mainCtrl',function($scope,$http){
	$scope.test = "test";


	//fetch notes
	$scope.notes = $http.get('/api/notes/')
		.then(function(res){
			$scope.notes = res.data;
			console.log($scope.notes);
		});

	$scope.getLatest = function(){
		$scope.notes = $http.get('/api/notes/')
		.then(function(res){
			$scope.notes = res.data;
			console.log($scope.notes);
		});
	}


	//insert new note
	$scope.add_item = function(){
		$http.post('/api/notes/newNote',{note_name:$scope.form.name,text:$scope.form.text})
			.then(function(){
				console.log("note added");

				//clear form
				$scope.form = {};

				//refresh list
				$scope.getLatest();
			})
	}

	//delete note
	$scope.remove_item = function(note){
		console.log(note.note_name);
		$http.delete('/api/notes/deleteNote/' + note.note_name)
			.then(function(){
				console.log("note removed");

				//refresh list
				$scope.getLatest();

			})
	}

});
	
