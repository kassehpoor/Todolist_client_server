var view = (function () {
	var todoInput = document.getElementById("todoText");
	var addButton = document.getElementById("addButton");

	var todoListEl = document.getElementById('todoList');
	var appPage = document.getElementById('app');
	var loginPage = document.getElementById('login-page');
	var btnSignin = document.getElementById('btnSignin');
	var spnUserDisplayName = document.getElementById('spnUserDisplayName');
	var usernameInput = document.getElementById('userLogin');
	var passwordInput = document.getElementById('passLogin');
	var btnSignout = document.getElementById('btnSignout');
	var DownloadButton = document.getElementById('DownloadButton');
	var UplodButton = document.getElementById('UplodButton');
	var btnSignup = document.getElementById('btnSignup');
	var signupPage = document.getElementById('signup-page');

	var fisrtnameSignup = document.getElementById('fisrtnameSignup');
	var lastnameSignup = document.getElementById('lastnameSignup');
	var usernameSignup = document.getElementById('usernameSignup');
	var passwordSignup = document.getElementById('passwordSignup');
			
	init();
	
	addButton.onclick = add;
	todoInput.onkeypress = function (e){
		if (e.key === 'Enter') {
			add();
		}
	};

	return {
		render: render,
		add: add,
		deleteAll: deleteAll,
		filter: filter,
		download: download,
		upload: upload,
		login: login,
		showApp: showApp,
		showLoginPage: showLoginPage,
		logoff: logoff,
		cancelLogin: cancelLogin,
		showRegisterPage: showRegisterPage,
		register: register,
		cancelRegister: cancelRegister,
	};

	
	function render(todos) {
		todoListEl.innerHTML = '';
		todos.forEach(function (todo) {
			todoListEl.appendChild(createLi(todo));
		});
	}

	function filter(value) {
		controller.filterTodos(value);
	}

	function add() {
		var value = todoInput.value;
		if (!value) return;
		controller.addTodo(value);
		todoInput.value = '';
	}

	function deleteAll() {
		controller.removeAllTodos();
	}
	function download() {
		controller.download();
	}

	function upload() {
		controller.upload();
	}

	function login() {
		var username = usernameInput.value;
		var password = passwordInput.value;
		if (!username || !password) return;

		controller.login(username, password);
		usernameInput.value = '';
		passwordInput.value = '';
	}
	
	function register() {
		var fisrtname = fisrtnameSignup.value;
		var lastname = lastnameSignup.value;
		var username = usernameSignup.value;
		var password = passwordSignup.value;
		if (!fisrtname || !lastname || !username || !password) return;

		controller.register(fisrtname, lastname, username, password);
		fisrtnameSignup.value = '';
		lastnameSignup.value = '';
		usernameSignup.value = '';
		passwordSignup.value = '';
	}

	function showLoginPage() {
		appPage.style.display = 'none';
		spnUserDisplayName.style.display = 'none';
		loginPage.style.display = 'block';
		btnSignin.style.display = 'none';
		btnSignout.style.display = 'none';
		btnSignup.style.display = 'block';
	}

	function showRegisterPage() {
		appPage.style.display = 'none';
		spnUserDisplayName.style.display = 'none';
		signupPage.style.display = 'block';
		btnSignin.style.display = 'none';
		btnSignout.style.display = 'none';
		btnSignup.style.display = 'none';
	}

	function showApp(user) {
		loginPage.style.display = 'none';
		signupPage.style.display = 'none';
		appPage.style.display = 'block';
		spnUserDisplayName.style.display = 'inline-block';

		if (user && user.id) {
			btnSignup.style.display = 'none';
			btnSignin.style.display = 'none';
			btnSignout.style.display = 'inline-block';
			spnUserDisplayName.textContent = user.firstName + ' ' + user.lastName;
			DownloadButton.style.display = 'inline-block';
			UplodButton.style.display = 'inline-block';
		} else {
			btnSignup.style.display = 'block';
			btnSignin.style.display = 'block';
			btnSignout.style.display = 'none';
			spnUserDisplayName.textContent = 'anonymous user';
			DownloadButton.style.display = 'none';
			UplodButton.style.display = 'none';
		}

	};

	function logoff() {
		controller.logoff();
	}

	function cancelLogin() {
		showApp();
	}

	function cancelRegister() {
		showApp();
	 }

	// ====================================================================

	function init() {

	}

	function createLi(todo) {
		var li = document.createElement('li');
		li.className = 'li';
		var titleSpan = document.createElement('span');

		titleSpan.textContent = todo.title;
		titleSpan.className = todo.complete ? 'complete' : 'active';
		li.appendChild(titleSpan);
		li.appendChild(createButtons(todo));

		return li;
	}

	function createButtons(todo) {
		var buttonsContainer = document.createElement('div');
		var btnComplete = document.createElement('button');
		var btnRemove = document.createElement('button');
		btnComplete.setAttribute("class", "togbtn");
		btnRemove.setAttribute("class", "delbtn");


		btnComplete.textContent = todo.complete ? 'Activate' : 'Complete';
		btnRemove.textContent = 'X';

		buttonsContainer.appendChild(btnComplete);
		buttonsContainer.appendChild(btnRemove);

		btnComplete.onclick = function () { controller.toggleComplete(todo) };
		btnRemove.onclick = function () { controller.remove(todo) };

		return buttonsContainer;
	}

}());
