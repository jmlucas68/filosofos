const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');
let philosophers = [];

fetch('../filosofos.json')
    .then(response => response.json())
    .then(data => {
        philosophers = data;
    });

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    resultsDiv.innerHTML = '';

    if (searchTerm.length === 0) {
        return;
    }

    const filteredPhilosophers = philosophers.filter(p => p.nombre.toLowerCase().includes(searchTerm));

    filteredPhilosophers.forEach(philosopher => {
        const philosopherDiv = document.createElement('div');
        philosopherDiv.classList.add('philosopher');

        const nameSpan = document.createElement('span');
        nameSpan.textContent = philosopher.nombre;

        const linksContainer = document.createElement('div');
        linksContainer.classList.add('links-container');

        // Enlace a Archive.org
        const archiveLinkDiv = document.createElement('div');
        const archiveTitle = document.createElement('h3');
        archiveTitle.textContent = 'Obras del autor';
        const archiveLink = document.createElement('a');
        const philosopherNameForArchiveUrl = encodeURIComponent(philosopher.nombre.replace(/ /g, '_'));
        archiveLink.href = `https://archive.org/search?query=${philosopherNameForArchiveUrl}&and%5B%5D=mediatype%3A%22texts%22&and%5B%5D=language%3A%22Spanish%22`;
        archiveLink.textContent = 'Buscar en Archive.org';
        archiveLink.target = '_blank';
        archiveLinkDiv.appendChild(archiveTitle);
        archiveLinkDiv.appendChild(archiveLink);

        // Enlace a Wikipedia
        const wikipediaLinkDiv = document.createElement('div');
        const wikipediaTitle = document.createElement('h3');
        wikipediaTitle.textContent = 'Wikipedia';
        const wikipediaLink = document.createElement('a');
        const philosopherNameForWikipediaUrl = encodeURIComponent(philosopher.nombre.replace(/ /g, '_'));
        wikipediaLink.href = `https://es.wikipedia.org/wiki/${philosopherNameForWikipediaUrl}`;
        wikipediaLink.textContent = 'Ver en Wikipedia';
        wikipediaLink.target = '_blank';
        wikipediaLinkDiv.appendChild(wikipediaTitle);
        wikipediaLinkDiv.appendChild(wikipediaLink);

        // Enlace a Webdianoia
        const webdianoiaLinkDiv = document.createElement('div');
        const webdianoiaTitle = document.createElement('h3');
        webdianoiaTitle.textContent = 'Webdianoia';
        const webdianoiaLink = document.createElement('a');
        const philosopherNameForWebdianoiaUrl = encodeURIComponent(philosopher.nombre.replace(/ /g, '_'));
        webdianoiaLink.href = `https://www.webdianoia.com/buscar/search.php?query=${philosopherNameForWebdianoiaUrl}&search=1`;
        webdianoiaLink.textContent = 'Buscar en Webdianoia';
        webdianoiaLink.target = '_blank';
        webdianoiaLinkDiv.appendChild(webdianoiaTitle);
        webdianoiaLinkDiv.appendChild(webdianoiaLink);

        linksContainer.appendChild(archiveLinkDiv);
        linksContainer.appendChild(wikipediaLinkDiv);
        linksContainer.appendChild(webdianoiaLinkDiv);

        philosopherDiv.appendChild(nameSpan);
        philosopherDiv.appendChild(linksContainer);
        resultsDiv.appendChild(philosopherDiv);
    });
});
