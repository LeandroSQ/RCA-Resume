class PageModel {

	constructor (identifier) {
		this.identifier = identifier;
	}

	onShow () {

	}

	onHide () {

	}

	load () {
		return new Promise ((resolve, reject) => {
			// Mount the url object
			const url = `${window.location.origin}/RCA-Resume/app/src/view/${this.identifier.toLowerCase()}.html`;

			// Query the url for the page html
			let request = new XMLHttpRequest();
			request.open ("GET", url);
			request.onloadend = ((e) => {
				if (request.readyState == 4 && request.status == 200) {
					resolve (request.responseText);
				} else {
					reject ("Erro ao buscar página!");
				}
			}).bind (this);
			request.send ();
		});
	}

}