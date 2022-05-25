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
    tbody.insertAdjacentHTML('beforeend', '<tr id="' + tbl.id + '"><td><img src="/movie_thumbs/' + tbl.id + '"></td><td><div>' + tbl.title + '</div><div>' + tbl.durationString + '</div></div></td><td><span>' + date.match(/./g).join('</span><span>') + '</span></td><td><a href="/player?movieId=' + tbl.id + '"></a><a href="/videomaker/full/editcheck/?movieId=' + tbl.id + '"></a><a href="/movies/' + tbl.id + '.xml" download="' + tbl.title + '"></a><a onclick="alert(\'Movie ' + tbl.id + ' Will Actually Be Deleted Once The Owner Of This Website Has Looked At It.\')" href="javascript:deleteMovie(\'' + tbl.id + '\',\'dont\')"></a></td></tr>');
  }
}

function deleteMovie(id, dont) {
  if (dont) {
    // Fake Deleting A Movie
    document.getElementById(`${id}`).style.display = "none";
    // Send A Message To A LVM Site Owner
    console.log(`Someone Needs Your Approval To Delete Movie ${id}. You Have To Take A Look At It First To Make Sure That It's Not Bad. If So, You Can Confront The Person Who Tried To Delete Movie ${id}.`);
  } else {
    // peform some real delete movie action
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", `/ajax/deleteMovie/?movieId=${id}`);
    xhttp.send();
    document.getElementById(`${id}`).style.display = "none";
  }
}
	
loadMore.onclick = loadRows;
listReq.onreadystatechange = function (e) {
  if (listReq.readyState != 4) return;
  json = JSON.parse(listReq.responseText);
  loadRows();
}
