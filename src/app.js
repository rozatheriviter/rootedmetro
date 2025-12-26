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

    // Helper to format phone links
    function formatPhone(phoneStr) {
        if (!phoneStr || phoneStr === "None listed") return phoneStr;

        // Regex for standard US numbers and short codes
        // Modified to handle optional parentheses better by checking for boundary OR space OR start of line before `(`
        const combinedPat = /((?:(?:^|\b|\s)(?:1\s*[-.]?)?\(?(\d{3})\)?\s*[-.]?\s*(\d{3})\s*[-.]?\s*(\d{4})\b)|(\b(?:211|311|511|811|911|988)\b))/g;
        
        return phoneStr.replace(combinedPat, (match, p1, p2, p3, p4, p5) => {
            if (p5) {
                 return `<a href="tel:${p5}">${match}</a>`;
            }
            const clean = match.replace(/[^0-9]/g, '');
            return `<a href="tel:${clean}">${match}</a>`;
        });
    }

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

            const countyTag = item.county ? `<span class="card-county">${escapeHTML(item.county)} County</span>` : '';

            card.innerHTML = `
                <div class="card-category">${escapeHTML(item.category)}</div>
                <h2>${escapeHTML(item.name)}</h2>
                ${countyTag}
                <div class="card-details">
                    <p><strong>Address:</strong> ${escapeHTML(item.address)}</p>
                    <p><strong>Phone:</strong> ${formatPhone(escapeHTML(item.phone))}</p>
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

    function filterResources() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCounty = countyFilter.value;
        const selectedCategory = categoryFilter.value;

        const filtered = resources.filter(item => {
            const matchesSearch = (
                (item.name && item.name.toLowerCase().includes(searchTerm)) ||
                (item.services && item.services.toLowerCase().includes(searchTerm)) ||
                (item.category && item.category.toLowerCase().includes(searchTerm))
            );
            const matchesCounty = selectedCounty === 'all' || (item.county && item.county === selectedCounty);
            const matchesCategory = selectedCategory === 'all' || (item.category && item.category === selectedCategory);

            return matchesSearch && matchesCounty && matchesCategory;
        });

        render(filtered);
    }

    // Event Listeners
    searchInput.addEventListener('input', filterResources);
    countyFilter.addEventListener('change', filterResources);
    categoryFilter.addEventListener('change', filterResources);

    // Initial Render
    render(resources);
});
