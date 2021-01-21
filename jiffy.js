const API_KEY = '0JctKdaZyHL8uFDTbouZjE8hTGFgLHFV';

const searchInput = document.querySelector('.search-input');
const searchHint = document.querySelector('.search-hint');
const videoElement = document.querySelector('.videos');
const clearElement = document.querySelector('.search-clear');

const randomVideo = (arr) => {
	const randomIndex = Math.floor(Math.random() * arr.length);
	return arr[randomIndex];
};

function createVideo(src) {
	const video = document.createElement('video');
	video.src = src;
	video.autoplay = true;
	video.loop = true;
	video.className = 'video';

	return video;
}

const toggleLoading = (state) => {
	if (state) {
		document.body.classList.add('loading');
	} else {
		document.body.classList.remove('loading');
	}
};

const searchGiphy = (searchInput) => {
	toggleLoading(true);
	fetch(
		`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchInput}&limit=50&offset=0&rating=pg-13&lang=en`
	)
		.then((response) => {
			return response.json();
		})
		.then((json) => {
			const gif = randomVideo(json.data);
			const src = gif.images.original.mp4;
			const video = createVideo(src);
			videoElement.appendChild(video);

			video.addEventListener('loadeddata', (event) => {
				video.classList.add('visible');
				toggleLoading(false);
				document.body.classList.add('has-results');
				searchHint.innerHTML = 'Hit enter to see more ' + input;
			});
		})
		.catch((error) => {
			console.log(error);
		});
};

const search = (event) => {
	const input = searchInput.value;

	if (input.length > 2) {
		document.body.classList.add('show-hint');
		searchHint.innerHTML = 'Hit enter to search ' + input;
	} else {
		document.body.classList.remove('show-hint');
	}

	if (event.key === 'Enter' && input.length > 2) {
		searchGiphy(input);
	}
};

const clearSearch = (event) => {
	document.body.classList.remove('has-results');
	videoElement.innerHTML = '';
	searchHint.innerHTML = '';
	searchInput.value = '';
	searchInput.focus();
};

searchInput.addEventListener('keyup', search);
clearElement.addEventListener('click', clearSearch);
