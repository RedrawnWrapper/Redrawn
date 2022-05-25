const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let movieId = params.videoId;
let thumbnail = params.thmburl;
switch (thumbnail) {
  case "movieThumbnail": {
    const meta = document.createElement("meta");
    meta.setAttribute('content', `http://localhost:4343/movie_thumbs/${movieId}.png`);
    meta.setAttribute('property', 'og:image');
    document.getElementById("headelem").appendChild(meta);
    break;
  }
}
