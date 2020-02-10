// Define all the pages (Ordened)
const pageList = [
	"intro",
	"page1",
	"about",
	"page2", 
	"end"
];

let pathDefinitions = { };
pageList.forEach(page => {
    let k = `js/controller/${page}.js`;
    pathDefinitions[page] = `js/controller/${page}.js`;
});
require.config({
    baseUrl: `https://leandrosq.github.io/`,
    paths: pathDefinitions
});
// 

requirejs (pageList,/* pageList.map(x => `js/controller/${x}.js` */), function () {
	// Global definitions
	window.pages = [... arguments];
	window.currentPageIndex = -1;
	window.lastPage = null
	window.systemInitialized = false;

	/*** This global function load a page and unloads the current one ***/
	window.loadPage = (page) => {
		if (window.lastPage) {
			window.lastPage.onHide ()
				.then (() => {
					window.lastPage = null;
					window.loadPage (page);
				})
				.catch (error => { 
					console.trace (error);
					console.error (error);
					alert (error);
				});

			return;
		}

		page.load ()
			.then (html => {
				let wrapper = document.querySelector("#wrapper");
				wrapper.innerHTML = "";
				wrapper.innerHTML = html;
				page.onShow ();
				window.lastPage = page;
			})
			.catch (error => {
				console.trace (error);
				console.error (error);
				alert (error);
			});
	}
	
	/*** This global function just loads the next page ***/
	window.nextPage = () => {
		loadPage(getNextPage ());
	};

	/*** This function peek the next page ***/
	function getNextPage () {
		return pages[++currentPageIndex];
	}

	/*** This cross-browser function requests fullscreen mode in the entire page ***/
	function requestFullscreen () {
		let rootElement = document.documentElement;

		if (rootElement.requestFullscreen) { // Default w3c
			rootElement.requestFullscreen();
		} else if (rootElement.mozRequestFullScreen) { // Firefox
			rootElement.mozRequestFullScreen();
		} else if (rootElement.webkitRequestFullscreen) { // Webkit browsers (Chrome, Safari and Opera)
			rootElement.webkitRequestFullscreen();
		} else if (rootElement.msRequestFullscreen) { // Internet explorer and Microsoft Edge
			rootElement.msRequestFullscreen();
		}
	}

	/*** Event listener when the page is ready to start the pages ***/
	function onInit () {
		// Checking for only run once this function
		if (!systemInitialized) {
			systemInitialized = true;

			requestFullscreen ();
			window.nextPage ();			

		} else { return; }
	}

	/*** Event listener listens for the spacebar key and call the @onInit method ***/
	window.onkeyup = (e) => {
		if (e.keyCode == 32) { // Spacebar is released
			onInit ();
		}
	}

	
	/* window.onload = requestFullscreen;
	document.body.onload = requestFullscreen;
	setTimeout(requestFullscreen, 100); */
	window.onload = onInit;
	document.body.onload = onInit;
	setTimeout(onInit, 100);
});

