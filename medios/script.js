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

        const name = document.createElement('span');
        name.textContent = philosopher.nombre;

        const link = document.createElement('a');
        const philosopherNameForUrl = encodeURIComponent(philosopher.nombre.replace(/ /g, '_'));
        link.href = `https://archive.org/search?query=${philosopherNameForUrl}&and%5B%5D=mediatype%3A%22texts%22&and%5B%5D=language%3A%22Spanish%22`;
        link.textContent = 'Buscar textos';
        link.target = '_blank'; // Open in new tab

        philosopherDiv.appendChild(name);
        philosopherDiv.appendChild(link);
        resultsDiv.appendChild(philosopherDiv);
    });
});
