const closeReq = new XMLHttpRequest();
closeReq.open('GET', '/events/close');
closeReq.send();

var json;
var tbody = document.getElementsByTagName('tbody')[0];
var loadMore = document.getElementById('load_more');
const listReq = new XMLHttpRequest();
listReq.open('GET', '/movieList');
listReq.send();

var C = 0;
function loadRows() {
  let c = C; C += 69;
  for (; c < C; c++) {
    if (c > json.length - 1) {
      loadMore.remove();
      break;
    }

    const tbl = json[c];
    const date = tbl.date.substr(0, 10) + ' ' + tbl.date.substr(11);
    tbody.insertAdjacentHTML('beforeend', '<tr id="' + tbl.id + '"><td><img src="/movie_thumbs/' + tbl.id + '"></td><td><div>' + tbl.title + '</div><div>' + tbl.durationString + '</div></div></td><td><span>' + date.match(/./g).join('</span><span>') + '</span></td><td><a href="/player?movieId=' + tbl.id + '"></a><a href="/videomaker/full/editcheck/?movieId=' + tbl.id + '"></a><a href="/movies/' + tbl.id + '.xml" download="' + tbl.title + '"></a><a onclick="conform(\'Are You Sure That You Want To Delete Movie ' + tbl.id + '? All Of Your Work Will Be Lost During The Process.\')" href="javascript:deleteMovie(\'' + tbl.id + '\',\'dont\')"></a></td></tr>');
  }
}

function deleteMovie(id) {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", `/ajax/deleteMovie/?movieId=${id}`);
  xhttp.send();
  document.getElementById(`${id}`).style.display = "none";
}
	
loadMore.onclick = loadRows;
listReq.onreadystatechange = function (e) {
  if (listReq.readyState != 4) return;
  json = JSON.parse(listReq.responseText);
  loadRows();
}
