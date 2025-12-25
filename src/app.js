document.addEventListener('DOMContentLoaded', () => {
    // masterResources is loaded from data/master_resources.js
    let resources = [];
    if (typeof masterResources !== 'undefined') {
        resources = masterResources;
    } else {
        console.error("Master resources data not loaded.");
        document.getElementById('resource-list').innerHTML = '<p>Error loading data.</p>';
        return;
    }

    const searchInput = document.getElementById('search-input');
    const countyFilter = document.getElementById('county-filter');
    const categoryFilter = document.getElementById('category-filter');
    const resourceList = document.getElementById('resource-list');
    const resultsCount = document.getElementById('results-count');

    // Populate Category Filter
    const categories = new Set(resources.map(item => item.category).filter(c => c).map(c => c.trim()));
    const sortedCategories = Array.from(categories).sort();

    sortedCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    function render(items) {
        resourceList.innerHTML = '';

        if (items.length === 0) {
            resourceList.innerHTML = '<p>No resources found matching your criteria.</p>';
            resultsCount.textContent = 'No resources found';
            return;
        }

        resultsCount.textContent = `Showing ${items.length} resource${items.length !== 1 ? 's' : ''}`;

        const fragment = document.createDocumentFragment();

        items.forEach(item => {
            const card = document.createElement('article');
            card.className = 'card';

            // Safe rendering helper
            const escapeHTML = (str) => {
                if (!str) return '';
                return str.replace(/[&<>'"]/g,
                    tag => ({
                        '&': '&amp;',
                        '<': '&lt;',
                        '>': '&gt;',
                        "'": '&#39;',
                        '"': '&quot;'
                    }[tag]));
            };

            card.innerHTML = `
                <div class="card-category">${escapeHTML(item.category)}</div>
                <h2>${escapeHTML(item.name)}</h2>
                <div class="card-county">${escapeHTML(item.county)} County</div>
                <div class="card-details">
                    <p><strong>Address:</strong> ${escapeHTML(item.address)}</p>
                    <p><strong>Phone:</strong> <a href="tel:${escapeHTML(item.phone).replace(/[^0-9]/g, '')}">${escapeHTML(item.phone)}</a></p>
                    <p><strong>Hours:</strong> ${escapeHTML(item.hours)}</p>
                    <p><strong>Services:</strong> ${escapeHTML(item.services)}</p>
                    ${item.transportation && item.transportation !== 'None listed' ? `<p><strong>Transit:</strong> ${escapeHTML(item.transportation)}</p>` : ''}
                    ${item.notes ? `<p><strong>Notes:</strong> ${escapeHTML(item.notes)}</p>` : ''}
                </div>
            `;
            fragment.appendChild(card);
        });

        resourceList.appendChild(fragment);
    }

    function filterAndSearch() {
        const query = searchInput.value.toLowerCase().trim();
        const selectedCounty = countyFilter.value;
        const selectedCategory = categoryFilter.value;

        const filtered = resources.filter(item => {
            // County Filter
            if (selectedCounty !== 'all' && item.county !== selectedCounty) {
                return false;
            }

            // Category Filter
            if (selectedCategory !== 'all' && item.category !== selectedCategory) {
                return false;
            }

            // Fuzzy Search (Simple Includes for now, could be improved)
            if (query) {
                const searchableText = `${item.name} ${item.category} ${item.services} ${item.notes || ''}`.toLowerCase();
                // Simple word match
                const words = query.split(/\s+/);
                return words.every(word => searchableText.includes(word));
            }

            return true;
        });

        render(filtered);
    }

    // Event Listeners
    searchInput.addEventListener('input', filterAndSearch);
    countyFilter.addEventListener('change', filterAndSearch);
    categoryFilter.addEventListener('change', filterAndSearch);

    // Initial Render
    render(resources);
});
