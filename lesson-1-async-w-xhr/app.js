(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    // let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    const searchedForText = 'hippos';
	const unsplashRequest = new XMLHttpRequest();

	unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, true);
	unsplashRequest.onload = addImage;
	unsplashRequest.setRequestHeader('Authorization','Client-ID fd8c0935e8c3843b1a04d514d991c7a32c5d1e269ca397ea15c3980e736cef28')

	unsplashRequest.send()

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
    });

    function addImage(){
    	let contentHtml = '';
    	const data = JSON.parse(this.responseText);
    	const firstImage = data.results[0];
    	if(data && data.results && data.results[0]){
    	contentHtml = `<figure>
    		<img src="${firstImage.urls.regular}" alt="${searchedForText}">
    		<figcaption> ${searchedForText} by ${firstImage.user.first_name}</figcaption>
    		</figure>`;

    	responseContainer.insertAdjacentHTML('afterbegin', contentHtml);
		}else {
			contentHtml = `<div class="error-no-image"> No images available</div>`;
		}
    }

    function addArticles () {}
	const articleRequest = new XMLHttpRequest();
	articleRequest.onload = addArticles;
	articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=<3e5738c5aaa843a191f8179185a998e1>`);
	articleRequest.send();

})();
