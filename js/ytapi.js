const API_KEY = 'AIzaSyCvuXIU_9EXVd8IYXQnBR3y7g-W1yBnfD4'; // Ganti dengan API key Anda
let nextPageToken = '';

// Inisialisasi histori pencarian
function initializeHistory() {
    if (!localStorage.getItem('searchHistory')) {
        localStorage.setItem('searchHistory', JSON.stringify([]));
    }
}

// Tambahkan query pencarian ke histori
function addToHistory(query) {
    const searchHistory = getSearchHistory();
    if (!searchHistory.includes(query)) {
        searchHistory.push(query);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
}

// Ambil histori pencarian dari localStorage
function getSearchHistory() {
    return JSON.parse(localStorage.getItem('searchHistory')) || [];
}

// Tampilkan histori pencarian
function displaySearchHistory() {
    const historyContainer = document.getElementById('searchHistory');
    historyContainer.innerHTML = '';

    const searchHistory = getSearchHistory();
    searchHistory.forEach(query => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.textContent = query;
        historyItem.addEventListener('click', () => {
            document.getElementById('search-input').value = query;
            searchVideos();
        });
        historyContainer.appendChild(historyItem);
    });
}

// Fungsi untuk melakukan pencarian YouTube
async function searchVideos(pageToken = '') {
    const query = document.getElementById('search-input').value;
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&maxResults=10&pageToken=${pageToken}&key=${API_KEY}`);
    
    const data = await response.json();
    const videoIds = data.items.map(item => item.id.videoId).join(',');
    const videoDetailsResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoIds}&key=${API_KEY}`);
    const videoDetailsData = await videoDetailsResponse.json();
    
    // Simpan hasil pencarian dan kata pencarian di local storage
    localStorage.setItem('searchResults', JSON.stringify({ query, results: videoDetailsData }));
    addToHistory(query); // Tambahkan pencarian ke histori

    renderVideos(videoDetailsData);
    nextPageToken = data.nextPageToken;
}

async function getTrendingVideos(pageToken = '') {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=ID&maxResults=15&pageToken=${pageToken}&key=${API_KEY}`);
    const data = await response.json();
    
    // Simpan hasil trending di local storage
    localStorage.setItem('trendingVideos', JSON.stringify(data));

    renderVideos(data);
    nextPageToken = data.nextPageToken;
}

async function nextPage() {
    if (document.getElementById('search-input').value) {
        searchVideos(nextPageToken);
    } else {
        getTrendingVideos(nextPageToken);
    }
}

function renderVideos(data) {
    const videoList = document.getElementById('video-list');
    videoList.innerHTML = '';
    const fragment = document.createDocumentFragment();

    data.items.forEach(item => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('post');
        const tags = item.snippet.tags ? item.snippet.tags.slice(0, 4) : [];
        const tagsHtml = tags.map(tag => `<a class="tag" href="https://www.youtube.com/results?search_query=${tag}" target="_blank"> ${tag}</a> `).join('');

        let description = item.snippet.description.length > 280
            ? item.snippet.description.substring(0, 275) + '...'
            : item.snippet.description;

        // Mengganti URL dengan link
        description = description.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank"><i class="material-icons">link</i>Link</a>');

        // Menyembunyikan karakter yang tidak diinginkan
        description = description.replace(/(___+|---+|===+|~~~+|▬+|#+)/g, '');

        videoItem.innerHTML = `
            <div class="post-header">
                <div class="avatar">
                    <span>${item.snippet.channelTitle.charAt(0).toUpperCase()}</span>
                    <div class="avatar-badge">✔</div>
                </div>
                <div>
                    <a class="username" href="https://www.youtube.com/channel/${item.snippet.channelId}" target="_blank">${item.snippet.channelTitle}</a>
                    <div class="published-date">Published: ${new Date(item.snippet.publishedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                </div>
            </div>          
            <img
                class="video-thumbnail"
                src="${item.snippet.thumbnails.medium.url}"
                srcset="${item.snippet.thumbnails.default.url} 320w,
                        ${item.snippet.thumbnails.medium.url} 640w,
                        ${item.snippet.thumbnails.high.url} 1280w"
                sizes="(max-width: 320px) 280px,
                       (max-width: 640px) 600px,
                       1280px"
                alt="${item.snippet.title}"
                loading="lazy"
            />
            <div class="video-title">${item.snippet.title}</div>
            ${description ? `<div class="description" style="white-space: normal;">${description}</div>` : ''}
            ${tags.length > 0 ? `<div class="tags">${tagsHtml}</div>` : ''}   
            <div class="video-details">
                <span class="views"><i class="material-icons">visibility</i>${formatNumber(item.statistics.viewCount)}</span>
                <span><i class="material-icons">thumb_up</i>${formatNumber(item.statistics.likeCount)}</span>
                <span class="comments"><i class="material-icons">comment</i>${formatNumber(item.statistics.commentCount)}</span> 
                <a class="watch-button" href="https://m.youtube.com/watch?v=${item.id}" target="_blank"><i class="material-icons">play_circle</i>Watch</a>
                <button class="download-button" onclick="showWarning('${item.id}')"><i class="material-icons">download</i>Unofficial and unauthorized download!.</button>
            </div>
            <button class="copy-link" onclick="copyToClipboard('https://www.youtube.com/watch?v=${item.id}')"><i class="material-icons">link</i></button>
        `;
        fragment.appendChild(videoItem);
    });

    videoList.appendChild(fragment);

    // Show the next page button if there are more results
    document.querySelector('.button').style.display = nextPageToken ? 'block' : 'none';
}

function formatNumber(number) {
    if (number >= 1000000000) {
        return (number / 1000000000).toFixed(1) + 'b';
    } else if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + 'm';
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'k';
    } else {
        return number;
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('Link disalin ke clipboard!');
    }).catch(err => {
        console.error('Gagal menyalin link: ', err);
    });
}

function showWarning(videoId) {
    const userConfirmed = confirm("Mengunduh video YouTube melanggar persyaratan layanan YouTube. Silakan gunakan tombol Tonton untuk melihat video di YouTube. Jika Anda masih ingin melanjutkan, klik OK untuk mengunjungi SaveFrom.net.");
    if (userConfirmed) {
        window.open(`https://en.savefrom.net/1-Youtube-video-downloader-4#url=https://www.youtube.com/watch?v=${videoId}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi histori pencarian
    initializeHistory();
    displaySearchHistory();

    // Cek apakah ada hasil pencarian atau trending yang disimpan di local storage
    const searchResults = localStorage.getItem('searchResults');
    const trendingVideos = localStorage.getItem('trendingVideos');
    
    if (searchResults) {
        const { query, results } = JSON.parse(searchResults);
        document.getElementById('search-input').value = query; // Menampilkan kembali kata pencarian
        renderVideos(results);
    } else if (trendingVideos) {
        renderVideos(JSON.parse(trendingVideos));
    } else {
        getTrendingVideos();
    }
});

