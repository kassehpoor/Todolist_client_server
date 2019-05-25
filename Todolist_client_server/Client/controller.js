var controller = (function () {
	var _todos = [];
	var _filter = 0; // 0:all   1:active   2:complete
	
	init();

	return {
		addTodo: addTodo,
		toggleComplete: toggleComplete,
		removeAllTodos: removeAllTodos,
		remove: remove,
		setFilter: setFilter,
		download :download,
		upload : upload,
		filterTodos :filterTodos,
	};

	function addTodo(value) {
		_todos.push({ title: value, complete: false });
		render();
	}

	function toggleComplete(todo) {
		todo.complete = !todo.complete;
		render();
	}

	function remove(todo) {
		_todos.splice(_todos.indexOf(todo), 1);
		render();
	}

	function removeAllTodos() {
		_todos = [];
		render();
	}

	function setFilter(value) {
		_filter = value;
		render();
	}

	function download() {
		connection.download(function (data) {
			if (!data) return alert('there is nothing on the server to replace client data.');
			var confirmResult = confirm('data on the local storage will be repaced!, are you sure to continue?');
			if (!confirmResult) return;
			db.setModel(JSON.parse(data));
			init();
		}, function (err) {
			alert(err);
		});
	}

	function upload() {
		connection.upload();
		
	}

	function filterTodos(value) {
		_filter = value || 0;
		render();
	}


	// ================================================================

	function init() {
		var model = db.getModel() || { todos: [], filter: 0 };
		_todos = model.todos;
		_filter = model.filter;
		render();
	}

	function render() {
		db.setModel({ todos: _todos, filter: _filter });
		view.render(getFilteredTodos());
	}

	function getFilteredTodos() {
		//filter ----> 0:all   1:active   2:complete
		if (!_filter) {
			return _todos;
		}
		return _todos.filter(function (t) {
			return (_filter === 1) ? !t.complete : t.complete;
		});
	}
 
})();