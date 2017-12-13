(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
	const unsplashRequest = new XMLHttpRequest();
	const articleRequest = new XMLHttpRequest();


    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        unsplashReq();
        nyctimesReq();
    });
    function unsplashReq(){
    	unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`, true);
		unsplashRequest.onload = addImage;
		unsplashRequest.setRequestHeader('Authorization','Client-ID fd8c0935e8c3843b1a04d514d991c7a32c5d1e269ca397ea15c3980e736cef28');
		unsplashRequest.onerror = (err) => {};
		unsplashRequest.send();
    }
    function nyctimesReq(){
	    articleRequest.onload = addArticles;
		articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=3e5738c5aaa843a191f8179185a998e1`);
		articleRequest.onload = addArticles;
		articleRequest.onerror = (err) => {};
		articleRequest.send();
    }

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

	function addArticles () {
		let contentHtml = '';
		const data = JSON.parse(this.responseText);
		console.log(data.response.docs[0]);
		if(data && data.response.docs && data.response.docs.length > 1){
			contentHtml = '<ul>' + data.response.docs.map(article => `<li class="article">
			<h2><a href="${article.web_url}">${article.headline.main}</a></h2>
			<p>${article.snippet}</p>
			</li>`).join('') + '</ul>';
		}else{
			contentHtml = `<div class="error-no-image"> No articles available</div>`;
		}
		responseContainer.insertAdjacentHTML('beforeend', contentHtml);
	}

})();
