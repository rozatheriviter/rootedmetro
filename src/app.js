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
    const categoryPillsContainer = document.getElementById('category-pills');
    const resourceList = document.getElementById('resource-list');
    const resultsCount = document.getElementById('results-count');

    // State
    let state = {
        search: '',
        county: 'all',
        category: 'all'
    };

    // Populate Category Pills
    const categories = new Set(resources.map(item => item.category).filter(c => c).map(c => c.trim()));
    const sortedCategories = Array.from(categories).sort();

    sortedCategories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'pill-btn';
        btn.dataset.value = category;
        btn.textContent = category;
        btn.setAttribute('aria-checked', 'false');
        btn.setAttribute('role', 'radio');

        btn.addEventListener('click', () => {
            // Update UI state
            document.querySelectorAll('.pill-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-checked', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-checked', 'true');

            // Update Filter State
            state.category = category;
            filterResources();
        });

        categoryPillsContainer.appendChild(btn);
    });

    // Add click listener to the "All Categories" button
    const allCategoriesBtn = categoryPillsContainer.querySelector('[data-value="all"]');
    if (allCategoriesBtn) {
        allCategoriesBtn.addEventListener('click', () => {
             document.querySelectorAll('.pill-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-checked', 'false');
            });
            allCategoriesBtn.classList.add('active');
            allCategoriesBtn.setAttribute('aria-checked', 'true');
            state.category = 'all';
            filterResources();
        });
    }


    // Icons
    const ICONS = {
        map: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>`,
        phone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
        clock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
        info: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
    };

    // Helper to format phone links
    function formatPhone(phoneStr) {
        if (!phoneStr || phoneStr === "None listed") return phoneStr;
         // Regex for standard US numbers and short codes
        const combinedPat = /((?:(?:^|\b|\s)(?:1\s*[-.]?)?\(?(\d{3})\)?\s*[-.]?\s*(\d{3})\s*[-.]?\s*(\d{4})\b)|(\b(?:211|311|511|811|911|988)\b))/g;
        
        // Return raw numbers for hrefs (first one found)
        const match = combinedPat.exec(phoneStr);
        return match ? match[0].replace(/[^0-9]/g, '') : null;
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

            const countyTag = item.county ? `<span class="badge badge-county">${escapeHTML(item.county)}</span>` : '';
            const categoryTag = item.category ? `<span class="badge badge-category">${escapeHTML(item.category)}</span>` : '';

            // Construct Map Link
            const mapQuery = encodeURIComponent(`${item.address}, ${item.county || 'Oregon'}`);
            const mapLink = item.address && item.address !== 'None listed'
                ? `https://www.google.com/maps/search/?api=1&query=${mapQuery}`
                : null;

            // Construct Phone Link
            const phoneRaw = formatPhone(item.phone);

            card.innerHTML = `
                <div class="card-header">
                    <div class="card-badges">
                        ${categoryTag}
                        ${countyTag}
                    </div>
                    <h2>${escapeHTML(item.name)}</h2>
                </div>
                <div class="card-body">
                    <div class="info-block">
                        <div class="info-item">
                            <div class="info-icon">${ICONS.map}</div>
                            <div class="info-content">${escapeHTML(item.address)}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-icon">${ICONS.clock}</div>
                            <div class="info-content">${escapeHTML(item.hours)}</div>
                        </div>
                    </div>

                    ${item.services ? `
                    <div>
                        <span class="info-label">Services</span>
                        <div class="services-list">${escapeHTML(item.services)}</div>
                    </div>` : ''}

                     ${item.notes ? `
                    <div>
                        <span class="info-label">Notes</span>
                        <div class="services-list">${escapeHTML(item.notes)}</div>
                    </div>` : ''}
                </div>
                <div class="card-footer">
                    ${mapLink ? `<a href="${mapLink}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">${ICONS.map} Map</a>`
                              : `<span class="btn btn-disabled">${ICONS.map} Map</span>`}

                    ${phoneRaw ? `<a href="tel:${phoneRaw}" class="btn btn-primary">${ICONS.phone} Call</a>`
                               : `<span class="btn btn-disabled">${ICONS.phone} Call</span>`}
                </div>
            `;
            fragment.appendChild(card);
        });

        resourceList.appendChild(fragment);
    }

    function filterResources() {
        const searchTerm = state.search.toLowerCase();
        const selectedCounty = state.county;
        const selectedCategory = state.category;

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
    searchInput.addEventListener('input', (e) => {
        state.search = e.target.value;
        filterResources();
    });

    countyFilter.addEventListener('change', (e) => {
        state.county = e.target.value;
        filterResources();
    });

    // Initial Render
    render(resources);
});
