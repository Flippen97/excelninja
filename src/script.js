var scrollLinks = document.getElementsByClassName('scroll')
function toggleNav () {
	'use strict';
	var btn = document.getElementById('slide-nav-btn');
	var slideNav = document.getElementById('slide-nav');
	var slideNavActive = "slide-nav-active";

	btn.addEventListener('click', function () {
		btn.classList.toggle('slide-nav-btn-active');
		slideNav.classList.toggle(slideNavActive);
	});
}

function hreflinks() {
	button.addEventListener,('click', function(e){
		e.preventDefault;
		this.hash;
		var element = document.getElementById('this.hash')
		element.scrollIntoView({
			behavior: 'smooth'
		});
		/**
		 *
		setTimeout(function(){
		window.location.hash = id;
		}, 500);
		 */
	})
}

function changeHash(input){
	var next = document.getElementById('section'+input);
	var id = 'section'+input  
	next.scrollIntoView({
		behavior: 'smooth'
	});
	setTimeout(function(){
		window.location.hash = id;
	}, 500);
	
}

function getCurrentUrl(){
	var getUrl = window.location.href;
	var splitUrl = getUrl.split('index.html#section')
	var urlNumber = splitUrl[1]
	if(urlNumber === undefined){
		urlNumber = 1
	}
	return urlNumber;
}

function eventlistener(){
	window.addEventListener("keydown", function (event) {
		if (event.defaultPrevented) {
			return; // Do nothing if the event was already processed
		}
		var sectionNumber = getCurrentUrl();
		switch (event.key) {
			case "Down": // IE specific value
			case "ArrowDown":
				changeHash(1 + +sectionNumber)
			break;

			case "Up": // IE specific value
			case "ArrowUp":
				if(sectionNumber === '1'){
					return;
				}else{
				changeHash(+sectionNumber - 1);
				}
			break;

			default:
				return; // Quit when this doesn't handle the key event.
		}
	
		// Cancel the default action to avoid it being handled twice
		event.preventDefault();
	}, true);
}

function changeHashScroll(direction){
	var sectionNumber = getCurrentUrl();
		console.log(sectionNumber)
		if (direction === "down"){
			var number = 1 + +sectionNumber;
			setTimeout(function(){
				window.location.hash = 'section' + number;
			}, 1500);
		}
		else{
			if(sectionNumber === '1'){
				return;
			}else{
				var number = +sectionNumber - 1;
				setTimeout(function(){
					window.location.hash = 'section' + number;
				}, 1500);
			}
		}
}

toggleNav();
eventlistener()

function mobileVhFix(){
	var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
	document.getElementById('section1').style['min-height'] = height + 'px';
	document.querySelector('.slide-nav').style['min-height'] = height + 'px';
	var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
	window.addEventListener('resize', function(event){
		var width2 = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
		if(width != width2){
			setTimeout(function(){
				height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
				document.getElementById('section1').style['min-height'] = height + 'px';
				document.querySelector('.slide-nav').style['min-height'] = height + 'px';
				width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
			}, 500);
		}
	});
}

mobileVhFix();
/*
function fetchCases(){
	
}

 
function adminPanel(){
	var cases = null;
	if (document.querySelector('.adminProfile')){
		// console.log(document.querySelector('.adminProfile'));
		fetch("http://excelninja.se/server/fetchCase.php")
			.then(response => response.json())
			.then(data => {
				console.log(data);
				cases = data;
				// data.map(function(datas) {cases.push(datas)});
			});
		cases.map(function(data){
			console.log(data.id)
		})
	}
} 
adminPanel();
*/
(function () {
	'use strict';
	function Admin () {
		this.adminBody = document.querySelector('.adminProfile');
		this.adminPanel();
		this.clickHandler = makeHandler('click', (evt) => {
			var flyoutElement = document.querySelector('.updateCase'),
				targetElement = evt.target;  // clicked element
		
			do {
				if (targetElement == flyoutElement) {
					console.log('remove');
					return;
				}
				targetElement = targetElement.parentNode;
			} while (targetElement);
			console.log('do nothing')
			this.clickHandler.unlisten(document)
			var select = document.querySelector('.adminProfile');
			select.removeChild(select.lastChild);
		});
	}

	Admin.prototype.adminPanel = function () {
		if (document.querySelector('.adminProfile')){
			this.fetchCases();
		}
	};

	Admin.prototype.fetchCases = function () {
		fetch("http://excelninja.se/server/fetchCase.php")
			.then(response => response.json())
			.then(cases => {
				this.printCases(cases);
			});
	};

	Admin.prototype.printCases = function (cases) {
		var that = this
		var content = '<div class="cases"><input type="text" id="searchCases" placeholder="search case...">';
		cases.map(function(data){
			console.log(data.title)
			content += `<div class="case">
							<div class="id">${data.id}</div>
							<div class="title">${data.title}</div>
							<div class="company">${data.company}</div>
							<button class="updateButton" data-id="${data.id}">Uppdatera</button>
							<button class="deleteButton" data-id="${data.id}">Radera</button>
						</div>`
		})
		content += '<button class="createCase">Skapa case</button><a href="logout.php">Logout</a></div>';
		that.adminBody.innerHTML += content;
		this.addingEventListener();
	};

	Admin.prototype.addingEventListener = function () {
		var that = this;
		const deleteButton = document.getElementsByClassName('deleteButton')
		for (var i = 0; i < deleteButton.length; i++) { 
			deleteButton[i].addEventListener('click',function(){
				var r = confirm("Är du säker du vill radera?");
				if (r == true) {
					that.deleteCase(this.dataset.id);
				}
			});
		}

		const updateButton = document.getElementsByClassName('updateButton') 
		for (var i = 0; i < updateButton.length; i++) { 
			updateButton[i].addEventListener('click',function(){
				console.log(this.dataset.id)
				fetch('http://excelninja.se/server/fetchCaseWithId.php', {
					method: 'POST',
					mode: 'cors',
					body: JSON.stringify({
						id: this.dataset.id
					}) 
					})
					.then(response => response.json())
					.then(data => {
						console.log(data[0].title)
						that.printUpdateCase(data)
					})
			});
		}
		var createCase = document.querySelector('.createCase')
		createCase.addEventListener('click',()=>{
			
		})
	}

	Admin.prototype.printUpdateCase = function (data) {
		var that = this;
		var content = document.createElement('form');
		content.className = 'updateCase';
		content.innerHTML = `	<label for="id" hidden>Id:</label>
								<input type="text" id="id" name="id" value="${data[0].id}" hidden/>

								<label for="title">Titel:</label>
								<input type="text" id="title" name="title" value="${data[0].title}" />

								<label for="company">Företag: </label>
								<input type="text" id="company" name="company" value="${data[0].company}" />

								<label for="problem">Problem: </label>
								<textarea id="problem" name="problem">${data[0].problem}</textarea>

								<label for="implementation">Utförande: </label>
								<textarea id="implementation" name="implementation">${data[0].implementation}</textarea>

								<label for="results">Resultat: </label>
								<textarea id="results" name="results">${data[0].results}</textarea>

								<label for="reference">Referens: </label>
								<textarea id="reference" name="reference">${data[0].reference}</textarea>

								<label for="priority">Prio: </label>
								<input type="text" id="priority" name="priority" value="${data[0].priority}" />

								<button>Uppdatera</button>`;

		document.querySelector('.adminProfile').appendChild(content);
		document.querySelector('.updateCase').addEventListener('submit', function handle (e) {
			e.preventDefault()
			const formData = new FormData(e.target);
			var object = {};
			formData.forEach(function(value, key){
				object[key] = value;
			});
			console.log(object)
			that.clickHandler.unlisten(document)
			that.updateCase(object);
		});
		that.clickHandler.listen(document);
	}

	Admin.prototype.updateCase = function (object) {
		fetch("http://excelninja.se/server/updateCase.php", {
			method: "POST",
			mode: "cors",
			body: JSON.stringify({
			id: object.id,
			title: object.title,
			company: object.company,
			problem: object.problem,
			implementation: object.implementation,
			results: object.results,
			reference: object.reference,
			priority: object.priority,
			})
		})
			.then(response => response.json())
			.then(fetched => {
				console.log(fetched);
			})
			.catch(error => {
				console.log(error);
			});
			var select = document.querySelector('.adminProfile');
  			select.removeChild(select.lastChild);
	}

	Admin.prototype.deleteCase = function (id) {
		console.log('delteCase is active'+id);
		/*
		fetch("http://excelninja.se/server/deleteCase.php", {
			method: "POST",
			mode: "cors",
			body: JSON.stringify({
					id: id
				})
			})
			.then(response => response.json())
			.then(fetched => {
				console.log(fetched);
			})
			.catch(error => {
				console.log(error);
			});
			*/
	}

	function makeHandler(type, handler) {
		return {
			listen(elt)   { elt.addEventListener   (type, handler); },
			unlisten(elt) { elt.removeEventListener(type, handler); }
		};
	}

	new Admin();
})();