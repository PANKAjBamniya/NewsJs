const apiKey = '0f64434b6d4a46398987359ad21c507b'
// const apiUrl = 'https://newsapi.org/'
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const newsResults = document.getElementById('news-results');

// Fetch News Function
async function fetchNews(query) {
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    console.log(url.query)
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
    }
}


function displayNews(articles) {
    newsResults.innerHTML = ''; // Clear previous results
    if (articles.length === 0) {
        newsResults.innerHTML = '<p>No news found for this topic.</p>';
    } else {
        articles.forEach(article => {
            const newsItem = document.createElement('div');
            newsItem.className = 'news-card';  // New card class for styling

            // Building the news card structure
            newsItem.innerHTML = `
                <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" alt="News Image" class="news-image">
                <div class="news-content">
                    <h3>${article.title}</h3>
                    <p>${article.description || 'No description available'}</p>
                    <a href="${article.url}" target="_blank" class="read-more">Read more</a>
                </div>
            `;
            newsResults.appendChild(newsItem);
        });
    }
}


// Event Listener for Search
searchBtn.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        fetchNews(query);
    }
});
