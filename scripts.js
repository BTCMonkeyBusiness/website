/* scripts.js */
const pageSize = 100;
const pageCount = 50;
const thumbnails = document.getElementById('thumbnails');
const pageSlider = document.getElementById('pageSlider');
const pageNumber = document.getElementById('pageNumber');
let currentPage = 0;

function renderThumbnails(page) {
    thumbnails.innerHTML = ''; // Ajouter cette ligne pour nettoyer les vignettes existantes
    const startIndex = page * pageSize + 1;
    const endIndex = Math.min(startIndex + pageSize - 1, 5000);
    for (let i = startIndex; i <= endIndex; i++) {

        const column = document.createElement('div');
        column.classList.add('column');
        const img = document.createElement('img');
        img.src = `https://raw.githubusercontent.com/BTCMonkeyBusiness/smb-assets/main/${i}.png`;
        img.addEventListener('click', () => {
         window.open(`https://raw.githubusercontent.com/BTCMonkeyBusiness/smb-assets/main/${i}.png`, '_blank');
        });
        column.appendChild(img);
        const small = document.createElement('p');
        small.classList.add('small');
        small.textContent = `#${i}`;
        column.appendChild(small);
        thumbnails.appendChild(column);
    }
}

function goToPage(page) {
    if (page >= 0 && page < pageCount) { // Modifier la condition pour inclure la valeur 0
        currentPage = page;
        pageNumber.textContent = currentPage;
        renderThumbnails(currentPage);
    }
}

pageSlider.addEventListener('input', () => {
    goToPage(parseInt(pageSlider.value));
});

function loadNextPage() {
    goToPage(currentPage + 1);
}

function loadPreviousPage() {
    goToPage(currentPage - 1);
}

// Supprimer cet événement d'écoute pour désactiver le chargement automatique des images lors du défilement
// window.addEventListener('scroll', () => {
//     if (document.documentElement.scrollTop + window.innerHeight >= document.documentElement.scrollHeight) {
//         loadNextPage();
//     }
// });

renderThumbnails(currentPage);


const urlParams = new URLSearchParams(window.location.search);
const searchQuery = urlParams.get('search');
if (searchQuery !== null) {
    document.getElementById('search').value = searchQuery;
    search();
}

// Gestionnaire d'événements keydown pour l'élément de recherche existant
document.getElementById('search').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        search();
    }
});

function search() {
    const query = document.getElementById('search').value;
    const index = parseInt(query);
    if (isNaN(index)) {
        return;
    }
    if (index > 5000) {
        alert("Veuillez entrer un nombre inférieur ou égal à 5000.");
        return;
    }

    const page = Math.ceil(index / pageSize);
    if (page !== currentPage) {
        thumbnails.innerHTML = '';
        currentPage = page;
        renderThumbnails(currentPage);
    }
    const column = thumbnails.childNodes[index % pageSize];
    if (column) {
        const img = column.firstChild;
        window.open(`https://raw.githubusercontent.com/BTCMonkeyBusiness/smb-assets/main/${index}.png`, '_blank');
    }
}
