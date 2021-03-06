(function () {
	'use strict';
	function Index () {
		this.toggleNav();
		this.arrowNavigation();
		this.mobileVhFix();
		if(document.querySelector('.home')){
			this.menuLinksScroll();
			this.getReference();
		}
		if(document.getElementById('section4')){
			this.caseSection();
			this.offerListiner();
		}
	}
	Index.prototype.getReference = function () {
		fetch("http://excelninja.se/server/fetchCase.php")
			.then(response => response.json())
			.then(cases => {
				var referenceArray = [];
				cases.map(function(data){
					if (data.reference !== ''){
						referenceArray.push(data.reference)
					}
				})
				this.loopReference(referenceArray)
			});
	}
	Index.prototype.printReference = function (reference) {
		var referenceCompany = document.querySelector('.referenceCompany');
		var split = reference.split(" -- ");
		var content =  `
						<div>,,</div>
						<div>
							<span>${split[0]}</span>
							${split[1] === undefined ? '' : '<span>' + split[1] + '</span>'}
						</div>
						<div>,,</div>
						`;
		referenceCompany.innerHTML = content;
	}
	Index.prototype.loopReference = function (reference) {
		var index = 1;
		this.printReference(reference[0])
		var interval = setInterval(() => {
			//this.printReference(reference[index++])
			reference.forEach( e => {
				index === reference.length ? index = 0 : null;
			})   
		}, 10000)
	}
	Index.prototype.menuLinksScroll = function () {
		var links = document.querySelectorAll('.scroll');
		for (var i = 0; i < links.length; i++) { 
			links[i].addEventListener('click',function(event){
				event.preventDefault();
				var btn = document.getElementById('slide-nav-btn');
				var slideNav = document.getElementById('slide-nav');
				btn.classList.remove('slide-nav-btn-active');
				slideNav.classList.remove('slide-nav-active');
				var hash = this.hash;
				setTimeout(function(){
					var element = document.querySelector(hash)
					element.scrollIntoView({
						behavior: 'smooth'
					});
				}, 400);
			});
		}
	}
	Index.prototype.offerListiner = function () {
		var that = this;
		var buttons = document.querySelectorAll('.offerButton');
		for (var i = 0; i < buttons.length; i++) { 
			buttons[i].addEventListener('click',function(){
					that.singleOffer(this.dataset.id);
			});
		}
	}
	Index.prototype.singleOffer = function (offerId) {
		// http://excelninja.se/offersPage.html //http://localhost:8888/offersPage.html 
		fetch('http://excelninja.se/offersPage.html').then(response => {
			return response.text()
			})
			.then(function(html) {
				var parser = new DOMParser();
				var doc = parser.parseFromString(html, 'text/html');
				var docArticle = doc.querySelector('#offerspageCard'+offerId);
				var offers = document.querySelector('.offers');

				var offerWrapper = document.createElement('div');
				offerWrapper.className = 'offersPageWrapper';

				var closeButton = document.createElement('button');
				closeButton.setAttribute('role','button');
				closeButton.className = 'offersPageClose';
				closeButton.innerText= 'Stäng';

				docArticle.prepend(closeButton);
				offerWrapper.appendChild(docArticle);
				offers.appendChild(offerWrapper);

				window.addEventListener('click', close, false);
				function close(event){
					var offersPageWrapper = document.querySelector('.offersPageWrapper');
					var offersPageClose = document.querySelector('.offersPageClose');
					if(event.target === offersPageWrapper || event.target === offersPageClose){
						window.removeEventListener('click', close, false)
						offers.removeChild(offers.lastChild)
					}
				}
			})
			.catch(function(err) {console.log('Failed to fetch page: ', err);});
	}
	Index.prototype.mobileVhFix = function () {
		var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		document.getElementById('section1').style['min-height'] = height + 'px';
		document.querySelector('.slide-nav').style['min-height'] = height + 'px';
		var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
		window.addEventListener('resize', function(){
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
	};
	Index.prototype.toggleNav = function () {
		var btn = document.getElementById('slide-nav-btn');
		var slideNav = document.getElementById('slide-nav');
		var slideNavActive = "slide-nav-active";

		btn.addEventListener('click', function () {
			btn.classList.toggle('slide-nav-btn-active');
			slideNav.classList.toggle(slideNavActive);
		});
	}
	Index.prototype.arrowNavigation = function () {
		var that = this;
		window.addEventListener("keydown", function (event) {
			if (event.defaultPrevented) {
				return; // Do nothing if the event was already processed
			}
			var sectionNumber = that.getCurrentUrl();
			switch (event.key) {
				case "Down": // IE specific value
				case "ArrowDown":
					that.changeHash(1 + +sectionNumber)
				break;
	
				case "Up": // IE specific value
				case "ArrowUp":
					if(sectionNumber === '1'){
						return;
					}else{
					that.changeHash(+sectionNumber - 1);
					}
				break;
	
				default:
					return; // Quit when this doesn't handle the key event.
			}
		
			// Cancel the default action to avoid it being handled twice
			event.preventDefault();
		}, true);
	}

	Index.prototype.getCurrentUrl = function () {
		var getUrl = window.location.href;
		var splitUrl = getUrl.split('http://excelninja.se/#section')
		var urlNumber = splitUrl[1]
		if(urlNumber === undefined){
			urlNumber = 1
		}
		return urlNumber;
	}

	Index.prototype.changeHash = function (input) {
		var next = document.getElementById('section'+input);
		var id = 'section'+input  
		next.scrollIntoView({
			behavior: 'smooth'
		});
		setTimeout(function(){
			window.location.hash = id;
		}, 500);
	}
	Index.prototype.caseSection = function () {
		fetch("http://excelninja.se/server/fetchCase.php")
			.then(response => response.json())
			.then(cases => {
				var section4 = document.getElementById('section4');
				var caseSection = document.createElement('section');
				caseSection.className = 'caseSection';
				caseSection.id = 'section5';
				var content = '<h2>TIDIGARE UPPDRAG</h2><div class="caseCarousel">';
				cases.map(function(data){
					content += `<form action="singleCase.html" class="caseCard" data-id="${data.id}">
									<div>
										<h3 class="caseCardCategory">${data.company}</h3>
										<div>
											<h4 class="caseCardHeading">${data.title}</h4>
											<p class="caseCardProblem">${data.problem}</p>
										</div>
										<label for="id" hidden>Id:</label>
										<input type="text" name="id" value="${data.id}" hidden/>
									</div>
									<button class="caseCardButton"><span>Läs mer om Case</span></button>
								</form>`
				})
				content += '</div>';

				caseSection.innerHTML = content;
				section4.parentNode.insertBefore(caseSection, section4.nextSibling);
				caseSliderMedia();
				this.redirectListener();
			});
	}

	Index.prototype.redirectListener = function () {
		var buttons = document.querySelectorAll('.caseCard');
		for (var i = 0; i < buttons.length; i++) { 
			buttons[i].addEventListener('click',function(){
				// http://excelninja.se/singleCase.html?id="  http://localhost:8888/singleCase.html?id=
				window.location.href="http://excelninja.se/singleCase.html?id="+this.dataset.id;
			});
		}
	}

	function caseSliderMedia () {
		const ml = window.matchMedia("(max-height: 500px) and (max-width: 900px)");
		const tl = window.matchMedia("(max-height: 800px) and (max-width: 1050px) and (min-width: 760px) and (min-height:600px)");

		if (ml.matches) {
			caseSlider(2);
		}
		else if (tl.matches) {
			caseSlider(5);
		}
		else{
			caseSlider(3);
		}
	}

	function caseSlider (amount) {
		if(amount === 3){
			var slider = tns({
				container: '.caseCarousel',
				items: 3,
				controls: false,
				nav: false,
				autoplayButtonOutput: false,
				axis: 'vertical',
				touch: false,
				autoplay: true,
				speed: 2000,
				autoplayTimeout: 10000,
				responsive: {
					330:{
						items: 4
					},
					760:{
						items: 6
					},
					1200:{
						items: 3
					}
				}
			});
		}
		else{
			var slider = tns({
				container: '.caseCarousel',
				items: amount,
				controls: false,
				nav: false,
				autoplayButtonOutput: false,
				axis: 'vertical',
				touch: false,
				speed: 2000,
				autoplayTimeout: 10000,
				autoplay: true
			});
		}
		window.addEventListener('resize', destroy, false)
		function destroy(){
			slider.destroy()
			window.removeEventListener('resize', destroy, false)
			caseSliderMedia();
		}
		return
	}
	new Index();
})();

(function () {
	'use strict';
	function Admin () {
		this.adminBody = document.querySelector('.adminProfile');
		this.adminPanel();
		this.clickHandler = makeHandler('click', (e) => {
			var flyoutElement = document.querySelector('.caseForm'),
				targetElement = e.target;  // clicked element
			do {
				if (targetElement == flyoutElement) {
					return;
				}
				targetElement = targetElement.parentNode;
			} while (targetElement);
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
		var content = '<div class="searchCases"><input type="text" name="searchCases" id="searchCases" required/><label for="searchCases">Search:</label></div><div class="cases">';
		cases.map(function(data){
			content += `<div class="case">
							<div class="id">${data.id}</div>
							<div class="title">${data.title}</div>
							<div class="company">${data.company}</div>
							<button class="updateButton" data-id="${data.id}">Uppdatera</button>
							<button class="deleteButton" data-id="${data.id}">Radera</button>
						</div>`
		})
		content += '</div><button class="newCaseButton" type="button">Skapa case</button><a href="logout.php">Logout</a>';
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
				fetch('http://excelninja.se/server/fetchCaseWithId.php', {
					method: 'POST',
					mode: 'cors',
					body: JSON.stringify({
						id: this.dataset.id
					}) 
					})
					.then(response => response.json())
					.then(data => {
						that.printCaseForm(data)
					})
			});
		}
		var newCaseButton = document.querySelector('.newCaseButton')
		newCaseButton.addEventListener('click',()=>{
			that.printCaseForm();
		})
	}
	Admin.prototype.printCaseForm = function (data) {
		var that = this;
		var wrapper = document.createElement('div');
		wrapper.className = 'caseFormWrapper';
		var content = document.createElement('form');
		content.className = 'caseForm';
		content.innerHTML = `${data ? '<div><label for="id" style="display:none;" hidden>Id:</label><input type="text" id="id" name="id" value="' + data[0].id +  '" hidden/></div>' : '<div></div>' }
							<div>
								<label for="title">Titel:</label>
								<input type="text" id="title" name="title" ${data ? 'value="' + data[0].title + '" ' : ''}/>
							</div>
							<div>
								<label for="company">Företag: </label>
								<input type="text" id="company" name="company" ${data ? 'value="' + data[0].company + '" ' : ''}/>
							</div>
							<div>
								<label for="priority">Prio: </label>
								<input type="text" id="priority" name="priority" ${data ? 'value="' + data[0].priority + '" ' : ''}/>
							</div>
							<div>
								<label for="problem">Problem: </label>
								<textarea id="problem" name="problem">${data ? data[0].problem : ''}</textarea>
							</div>
							<div>
								<label for="implementation">Utförande: </label>
								<textarea id="implementation" name="implementation">${data ? data[0].implementation : ''}</textarea>
							</div>
							<div>
								<label for="results">Resultat: </label>
								<textarea id="results" name="results">${data ? data[0].results : ''}</textarea>
							</div>
							<div>
								<label for="reference">Referens: </label>
								<textarea id="reference" name="reference">${data ? data[0].reference : ''}</textarea>
							</div>
							<button>${data ? 'Uppdatera' : 'Skapa case'}</button>`;
		wrapper.appendChild(content)
		document.querySelector('.adminProfile').appendChild(wrapper);
		document.querySelector('.caseForm').addEventListener('submit', function handle (e) {
			e.preventDefault()
			const formData = new FormData(e.target);
			var object = {};
			formData.forEach(function(value, key){
				object[key] = value;
			});
			that.clickHandler.unlisten(document)
			if(data){
				that.updateCase(object);
			}else{
				that.createCase(object);
			}
		});
		setTimeout(function (){that.clickHandler.listen(document)}, 10);
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
			})
			.catch(error => {
				console.log(error);
			});
			var select = document.querySelector('.adminProfile');
			select.removeChild(select.lastChild);
	}

	Admin.prototype.createCase = function (object) {
		fetch(`http://excelninja.se/server/createCase.php`, {
			method: "POST",
			mode: "cors",
			body: JSON.stringify({
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
			})
			.catch(error => {
			  console.log(error);
			});
			var select = document.querySelector('.adminProfile');
			select.removeChild(select.lastChild);
	}
	Admin.prototype.deleteCase = function (id) {
		fetch("http://excelninja.se/server/deleteCase.php", {
			method: "POST",
			mode: "cors",
			body: JSON.stringify({
					id: id
				})
			})
			.then(response => response.json())
			.then(fetched => {
			})
			.catch(error => {
				console.log(error);
			});
	}

	function makeHandler(type, handler) {
		return {
			listen(elt)   { elt.addEventListener   (type, handler); },
			unlisten(elt) { elt.removeEventListener(type, handler); }
		};
	}
	new Admin();
})();

(function () {
	'use strict';
	function SingleCase () {
		this.getSingleCaseId();
	}

	SingleCase.prototype.getSingleCaseId = function () {
		var string = window.location.href;
		var getit = new Array();
		getit=string.split('?id=');
		if(getit[1] == undefined) return;
		this.printSingleCase(getit[1]);
	};
	SingleCase.prototype.printSingleCase = function (input) {
		fetch('http://excelninja.se/server/fetchCaseWithId.php', {
			method: 'POST',
			mode: 'cors',
			body: JSON.stringify({
				id: input
			}) 
			})
			.then(response => response.json())
			.then(data => {
				var content = `
					<div class="singleCaseWrapper">
						<a href="/">Tillbaka</a>
						<h1>${data[0].title}</h1>
						<div>
							<div class="imageWrapper"><img src="Assets/warning.png" alt="Problem icon"></div>
							<div class="contentWrapper">
								<h2>KUNDENS​ <span>UTMANING</span></h2>
								<p>${data[0].problem}</p>
							</div>
						</div>
						<div>
							<div class="imageWrapper"><img src="Assets/plan.png" alt="Utförande icon"></div>
							<div class="contentWrapper">
								<h2>VÄGEN​ <span>FRAMÅT</span></h2>
								<p>${data[0].implementation}</p>
							</div>
						</div>
						<div>
							<div class="imageWrapper"><img src="Assets/target.png" alt="Resultat icon"></div>
							<div class="contentWrapper">
								<h2>UPPNÅTT​ <span>RESULTAT</span></h2>
								<p>${data[0].results}</p>
							</div>
						</div>
					</div>`;
					document.querySelector('.singleCase').innerHTML = content;
			})
	};
	if (document.querySelector('.singleCase')){
		new SingleCase();
	}
})();