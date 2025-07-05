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

        // Enlace a Herder Editorial
        const herderLinkDiv = document.createElement('div');
        const herderTitle = document.createElement('h3');
        herderTitle.textContent = 'Herder Editorial';
        const herderLink = document.createElement('a');
        const philosopherNameForHerderUrl = encodeURIComponent(philosopher.nombre.replace(/ /g, '_'));
        herderLink.href = `https://encyclopaedia.herdereditorial.com/wiki/Especial:Buscar?search=${philosopherNameForHerderUrl}&fulltext=Search`;
        herderLink.textContent = 'Buscar en Herder Editorial';
        herderLink.target = '_blank';
        herderLinkDiv.appendChild(herderTitle);
        herderLinkDiv.appendChild(herderLink);

        // Enlace a YouTube
        const youtubeLinkDiv = document.createElement('div');
        const youtubeTitle = document.createElement('h3');
        youtubeTitle.textContent = 'YouTube';
        const youtubeLink = document.createElement('a');
        const philosopherNameForYoutubeUrl = encodeURIComponent(philosopher.nombre.replace(/ /g, '+')); // Usar '+' para espacios en YouTube
        youtubeLink.href = `https://www.youtube.com/results?search_query=${philosopherNameForYoutubeUrl}`;
        youtubeLink.textContent = 'Buscar en YouTube';
        youtubeLink.target = '_blank';
        youtubeLinkDiv.appendChild(youtubeTitle);
        youtubeLinkDiv.appendChild(youtubeLink);

        // Enlace a Filosofia.org
        const filosofiaOrgLinkDiv = document.createElement('div');
        const filosofiaOrgTitle = document.createElement('h3');
        filosofiaOrgTitle.textContent = 'Filosofia.org';
        const filosofiaOrgLink = document.createElement('a');
        const philosopherNameForFilosofiaOrgUrl = encodeURIComponent(philosopher.nombre);
        filosofiaOrgLink.href = `https://www.google.com/search?q=${philosopherNameForFilosofiaOrgUrl}+site:filosofia.org`;
        filosofiaOrgLink.textContent = 'Buscar en Filosofia.org';
        filosofiaOrgLink.target = '_blank';
        filosofiaOrgLinkDiv.appendChild(filosofiaOrgTitle);
        filosofiaOrgLinkDiv.appendChild(filosofiaOrgLink);

        // Enlace a Philosophica.info
        const philosophicaInfoLinkDiv = document.createElement('div');
        const philosophicaInfoTitle = document.createElement('h3');
        philosophicaInfoTitle.textContent = 'Philosophica.info';
        const philosophicaInfoLink = document.createElement('a');
        const philosopherNameForPhilosophicaInfoUrl = encodeURIComponent(philosopher.nombre);
        philosophicaInfoLink.href = `https://www.google.com/search?q=${philosopherNameForPhilosophicaInfoUrl}+site:philosophica.info`;
        philosophicaInfoLink.textContent = 'Buscar en Philosophica.info';
        philosophicaInfoLink.target = '_blank';
        philosophicaInfoLinkDiv.appendChild(philosophicaInfoTitle);
        philosophicaInfoLinkDiv.appendChild(philosophicaInfoLink);

        // Enlace a Stanford Encyclopedia of Philosophy
        const stanfordLinkDiv = document.createElement('div');
        const stanfordTitle = document.createElement('h3');
        stanfordTitle.textContent = 'Stanford Encyclopedia of Philosophy';
        const stanfordLink = document.createElement('a');
        const philosopherNameForStanfordUrl = encodeURIComponent(philosopher.nombre.replace(/ /g, '+'));
        stanfordLink.href = `https://plato.stanford.edu/search/searcher.py?query=${philosopherNameForStanfordUrl}`;
        stanfordLink.textContent = 'Buscar en Stanford Encyclopedia';
        stanfordLink.target = '_blank';
        stanfordLinkDiv.appendChild(stanfordTitle);
        stanfordLinkDiv.appendChild(stanfordLink);

        // Enlace a Britannica
        const britannicaLinkDiv = document.createElement('div');
        const britannicaTitle = document.createElement('h3');
        britannicaTitle.textContent = 'Britannica';
        const britannicaLink = document.createElement('a');
        const philosopherNameForBritannicaUrl = encodeURIComponent(philosopher.nombre.replace(/ /g, '+'));
        britannicaLink.href = `https://www.britannica.com/search?query=${philosopherNameForBritannicaUrl}`;
        britannicaLink.textContent = 'Buscar en Britannica';
        britannicaLink.target = '_blank';
        britannicaLinkDiv.appendChild(britannicaTitle);
        britannicaLinkDiv.appendChild(britannicaLink);

        // Enlace a Biografias y Vidas
        const biografiasYVidasLinkDiv = document.createElement('div');
        const biografiasYVidasTitle = document.createElement('h3');
        biografiasYVidasTitle.textContent = 'Biografías y Vidas';
        const biografiasYVidasLink = document.createElement('a');
        const philosopherNameForBiografiasYVidasUrl = encodeURIComponent(philosopher.nombre);
        biografiasYVidasLink.href = `https://www.biografiasyvidas.com/cgi-bin/search/search.pl?Terms=${philosopherNameForBiografiasYVidasUrl}&Match=1&Realm=title`;
        biografiasYVidasLink.textContent = 'Buscar en Biografías y Vidas';
        biografiasYVidasLink.target = '_blank';
        biografiasYVidasLinkDiv.appendChild(biografiasYVidasTitle);
        biografiasYVidasLinkDiv.appendChild(biografiasYVidasLink);

        // Enlace a Filco.es
        const filcoLinkDiv = document.createElement('div');
        const filcoTitle = document.createElement('h3');
        filcoTitle.textContent = 'Filco.es';
        const filcoLink = document.createElement('a');
        const philosopherNameForFilcoUrl = encodeURIComponent(philosopher.nombre);
        filcoLink.href = `https://filco.es/?s=${philosopherNameForFilcoUrl}`;
        filcoLink.textContent = 'Buscar en Filco.es';
        filcoLink.target = '_blank';
        filcoLinkDiv.appendChild(filcoTitle);
        filcoLinkDiv.appendChild(filcoLink);

        // Enlace a FilosofiaenlaRed.com
        const filosofiaEnLaRedLinkDiv = document.createElement('div');
        const filosofiaEnLaRedTitle = document.createElement('h3');
        filosofiaEnLaRedTitle.textContent = 'Filosofía en la Red';
        const filosofiaEnLaRedLink = document.createElement('a');
        const philosopherNameForFilosofiaEnLaRedUrl = encodeURIComponent(philosopher.nombre);
        filosofiaEnLaRedLink.href = `https://filosofiaenlared.com/?s=${philosopherNameForFilosofiaEnLaRedUrl}`;
        filosofiaEnLaRedLink.textContent = 'Buscar en Filosofía en la Red';
        filosofiaEnLaRedLink.target = '_blank';
        filosofiaEnLaRedLinkDiv.appendChild(filosofiaEnLaRedTitle);
        filosofiaEnLaRedLinkDiv.appendChild(filosofiaEnLaRedLink);

        // Enlace a Revista de Filosofía
        const revistaFilosofiaLinkDiv = document.createElement('div');
        const revistaFilosofiaTitle = document.createElement('h3');
        revistaFilosofiaTitle.textContent = 'Revista de Filosofía';
        const revistaFilosofiaLink = document.createElement('a');
        const philosopherNameForRevistaFilosofiaUrl = encodeURIComponent(philosopher.nombre);
        revistaFilosofiaLink.href = `https://www.revistadefilosofia.org/index.php/ERF/search/search?query=&authors=${philosopherNameForRevistaFilosofiaUrl}&dateFromYear=&dateFromMonth=&dateFromDay=&dateToYear=&dateToMonth=&dateToDay=`;
        revistaFilosofiaLink.textContent = 'Buscar en Revista de Filosofía';
        revistaFilosofiaLink.target = '_blank';
        revistaFilosofiaLinkDiv.appendChild(revistaFilosofiaTitle);
        revistaFilosofiaLinkDiv.appendChild(revistaFilosofiaLink);

        // Enlace a Academia.edu
        const academiaEduLinkDiv = document.createElement('div');
        const academiaEduTitle = document.createElement('h3');
        academiaEduTitle.textContent = 'Academia.edu';
        const academiaEduLink = document.createElement('a');
        const philosopherNameForAcademiaEduUrl = encodeURIComponent(philosopher.nombre);
        academiaEduLink.href = `https://www.academia.edu/search?q=${philosopherNameForAcademiaEduUrl}`;
        academiaEduLink.textContent = 'Buscar en Academia.edu';
        academiaEduLink.target = '_blank';
        academiaEduLinkDiv.appendChild(academiaEduTitle);
        academiaEduLinkDiv.appendChild(academiaEduLink);

        linksContainer.appendChild(archiveLinkDiv);
        linksContainer.appendChild(wikipediaLinkDiv);
        linksContainer.appendChild(webdianoiaLinkDiv);
        linksContainer.appendChild(herderLinkDiv);
        linksContainer.appendChild(youtubeLinkDiv);
        linksContainer.appendChild(filosofiaOrgLinkDiv);
        linksContainer.appendChild(philosophicaInfoLinkDiv);
        linksContainer.appendChild(stanfordLinkDiv);
        linksContainer.appendChild(britannicaLinkDiv);
        linksContainer.appendChild(biografiasYVidasLinkDiv);
        linksContainer.appendChild(filcoLinkDiv);
        linksContainer.appendChild(filosofiaEnLaRedLinkDiv);
        linksContainer.appendChild(revistaFilosofiaLinkDiv);
        linksContainer.appendChild(academiaEduLinkDiv);

        philosopherDiv.appendChild(nameSpan);
        philosopherDiv.appendChild(linksContainer);
        resultsDiv.appendChild(philosopherDiv);
    });
});
