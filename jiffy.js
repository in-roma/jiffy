function createVideo(src) {
	const video = document.createElement('video');
	video.src = src;
	video.autoplay = true;
	video.loop = true;
	video.className = 'video';

	return video;
}

fetch(
	'https://api.giphy.com/v1/gifs/search?api_key=0JctKdaZyHL8uFDTbouZjE8hTGFgLHFV&q=love&limit=50&offset=0&rating=pg-13&lang=en'
)
	.then((response) => {
		return response.json();
	})
	.then((json) => {
		const gif = json.data[0];
		const src = gif.images.original.mp4;
		const video = createVideo(src);

		const videoE1 = document.querySelector('.videos');
		videoE1.appendChild(video);
	})
	.catch((error) => {
		console.log(error);
	});
