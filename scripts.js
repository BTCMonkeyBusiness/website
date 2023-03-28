/* scripts.js */
const pageSize = 100;
const pageCount = 100;
const thumbnails = document.getElementById('thumbnails');
let currentPage = 1;

function renderThumbnails(page) {
    const startIndex = (page - 1) * pageSize + 1;
    const endIndex = Math.min(startIndex + pageSize - 1, 10000);
    for (let i = startIndex; i <= endIndex; i++) {
        const column = document.createElement('div');
        column.classList.add('column');
        const img = document.createElement('img');
        img.src = `https://raw.githubusercontent.com/BTCMonkeyBusiness/smb-assets/main/${i}.png`;
        img.addEventListener('click', () => {
            const popup = window.open(`https://raw.githubusercontent.com/BTCMonkeyBusiness/smb-assets/main/${i}.png`, 'popup', 'width=500,height=500,top=50,left=50');
            const botPopup = window.open('https://ordinalsbot.com/', 'botPopup', `width=500,height=500,top=50,left=${window.innerWidth - 550}`);
            popup.focus();
        });
        column.appendChild(img);
        const small = document.createElement('p');
        small.classList.add('small');
        small.textContent = `#${i}`;
        column.appendChild(small);
        thumbnails.appendChild(column);
    }
}

function loadNextPage() {
    if (currentPage < pageCount) {
        currentPage++;
        renderThumbnails(currentPage);
    }
}

window.addEventListener('scroll', () => {
    if (document.documentElement.scrollTop + window.innerHeight >= document.documentElement.scrollHeight) {
        loadNextPage();
    }
});

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
    const page = Math.ceil(index / pageSize);
    if (page !== currentPage) {
        thumbnails.innerHTML = '';
        currentPage = page;
        renderThumbnails(currentPage);
    }
    const column = thumbnails.childNodes[index % pageSize];
    if (column) {
        const img = column.firstChild;
        const popup = window.open(`https://raw.githubusercontent.com/BTCMonkeyBusiness/smb-assets/main/${index}.png`, 'popup', 'width=500,height=500,top=50,left=50');
        const botPopup = window.open('https://ordinalsbot.com/', 'botPopup', `width=500,height=500,top=50,left=${window.innerWidth - 550}`);
        popup.focus();
    }
}