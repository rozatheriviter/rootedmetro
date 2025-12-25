document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Data
    // masterResources is loaded globally from data/master_resources.js
    if (typeof masterResources === 'undefined') {
        console.error("Master Data not loaded.");
        document.getElementById('resource-list').innerHTML = "<p>Error loading data.</p>";
        return;
    }

    const resources = masterResources;
    let filteredResources = [...resources];

    // 2. DOM Elements
    const listContainer = document.getElementById('resource-list');
    const searchInput = document.getElementById('search-input');
    const countyFilter = document.getElementById('county-filter');
    const categoryFilter = document.getElementById('category-filter');
    const resultsCount = document.getElementById('results-count');

    // 3. Populate Category Filter
    const categories = new Set(resources.map(r => r.category).filter(c => c && c !== "Uncategorized"));
    const sortedCategories = Array.from(categories).sort();

    sortedCategories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });

    // 4. Render Function
    function render() {
        listContainer.innerHTML = '';

        if (filteredResources.length === 0) {
            listContainer.innerHTML = '<p class="no-results">No resources found matching your criteria.</p>';
            resultsCount.textContent = 'Showing 0 resources';
            return;
        }

        resultsCount.textContent = `Showing ${filteredResources.length} resource${filteredResources.length !== 1 ? 's' : ''}`;

        const fragment = document.createDocumentFragment();

        filteredResources.forEach(res => {
            const card = document.createElement('article');
            card.className = 'resource-card';

            // Safe HTML injection? Data is local static but still good to sanitize if possible.
            // Using textContent for safety where possible.

            // Header
            const catBadge = document.createElement('span');
            catBadge.className = 'category-badge';
            catBadge.textContent = res.category;

            const title = document.createElement('h2');
            title.textContent = res.name;

            card.appendChild(catBadge);
            card.appendChild(title);

            // Info Rows
            const fields = [
                { label: 'Phone', value: res.phone },
                { label: 'Address', value: res.address },
                { label: 'Hours', value: res.hours },
                { label: 'County', value: res.county }
            ];

            fields.forEach(field => {
                if (field.value && field.value !== "None listed") {
                    const row = document.createElement('div');
                    row.className = 'info-row';
                    row.innerHTML = `<strong>${field.label}:</strong> ${escapeHtml(field.value)}`;
                    card.appendChild(row);
                }
            });

            // Details/Services
            if (res.services && res.services !== "None listed") {
                const details = document.createElement('div');
                details.className = 'details';
                details.innerHTML = `<strong>Services:</strong> <div class="services-list">${escapeHtml(res.services)}</div>`;
                card.appendChild(details);
            }

            if (res.notes && res.notes.trim() !== "") {
                const notes = document.createElement('div');
                notes.className = 'details'; // reuse style
                notes.innerHTML = `<strong>Notes:</strong> ${escapeHtml(res.notes)}`;
                card.appendChild(notes);
            }

            if (res.transportation && res.transportation !== "None listed" && res.transportation !== "") {
                 const trans = document.createElement('div');
                 trans.className = 'info-row';
                 trans.style.marginTop = '0.5rem';
                 trans.innerHTML = `<strong>Transport:</strong> ${escapeHtml(res.transportation)}`;
                 card.appendChild(trans);
            }

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
                    <p><strong>Phone:</strong> <a href="tel:${escapeHTML(item.phone).replace(/[^0-9]/g, '')}">${escapeHTML(item.phone)}</a></p>
                    <p><strong>Hours:</strong> ${escapeHTML(item.hours)}</p>
                    <p><strong>Services:</strong> ${escapeHTML(item.services)}</p>
                    ${item.transportation && item.transportation !== 'None listed' ? `<p><strong>Transit:</strong> ${escapeHTML(item.transportation)}</p>` : ''}
                    ${item.notes ? `<p><strong>Notes:</strong> ${escapeHTML(item.notes)}</p>` : ''}
                </div>
            `;
            fragment.appendChild(card);
        });

        listContainer.appendChild(fragment);
    }

    // Helper to prevent XSS (though data is trusted, best practice)
    function escapeHtml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    // 5. Filter Logic
    function filterData() {
        const query = searchInput.value.toLowerCase();
        const selectedCounty = countyFilter.value;
        const selectedCategory = categoryFilter.value;

        filteredResources = resources.filter(item => {
            // Text Match
            const textMatch = (
                (item.name && item.name.toLowerCase().includes(query)) ||
                (item.services && item.services.toLowerCase().includes(query)) ||
                (item.category && item.category.toLowerCase().includes(query))
            );

            // County Match
            const countyMatch = selectedCounty === 'all' || (item.county && item.county === selectedCounty);

            // Category Match
            const categoryMatch = selectedCategory === 'all' || (item.category && item.category === selectedCategory);

            return textMatch && countyMatch && categoryMatch;
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

        render();
    }

    // 6. Event Listeners
    searchInput.addEventListener('input', filterData);
    countyFilter.addEventListener('change', filterData);
    categoryFilter.addEventListener('change', filterData);
    // Event Listeners
    searchInput.addEventListener('input', filterResources);
    countyFilter.addEventListener('change', filterResources);
    categoryFilter.addEventListener('change', filterResources);

    // Initial Render
    render();
});
