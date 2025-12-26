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

    // Icons
    const icons = {
        map: `<svg xmlns="http://www.w3.org/2000/svg" class="info-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
        phone: `<svg xmlns="http://www.w3.org/2000/svg" class="info-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>`,
        clock: `<svg xmlns="http://www.w3.org/2000/svg" class="info-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
        info: `<svg xmlns="http://www.w3.org/2000/svg" class="info-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
    };

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

            const county = item.county || 'Unknown';
            const category = item.category || 'Uncategorized';

            // Build Address Block
            let addressBlock = '';
            if (item.address) {
                addressBlock = `
                    <div class="info-item">
                        ${icons.map}
                        <div class="info-content">${escapeHTML(item.address)}</div>
                    </div>
                `;
            }

            // Build Phone Block
            let phoneBlock = '';
            if (item.phone) {
                const phoneClean = escapeHTML(item.phone).replace(/[^0-9]/g, '');
                phoneBlock = `
                    <div class="info-item">
                        ${icons.phone}
                        <div class="info-content"><a href="tel:${phoneClean}">${escapeHTML(item.phone)}</a></div>
                    </div>
                `;
            }

            // Build Hours Block
            let hoursBlock = '';
            if (item.hours) {
                hoursBlock = `
                    <div class="info-item">
                        ${icons.clock}
                        <div class="info-content">${escapeHTML(item.hours)}</div>
                    </div>
                `;
            }

            // Info Block Container (Address, Phone, Hours)
            let coreInfo = '';
            if (addressBlock || phoneBlock || hoursBlock) {
                coreInfo = `<div class="info-block">${addressBlock}${phoneBlock}${hoursBlock}</div>`;
            }

            // Services
            let servicesBlock = '';
            if (item.services) {
                servicesBlock = `
                    <div class="services-block">
                        <span class="info-label">Services</span>
                        <div class="services-list">${escapeHTML(item.services)}</div>
                    </div>
                `;
            }

            // Footer (Transit / Notes)
            let footerContent = [];
            if (item.transportation && item.transportation !== 'None listed') {
                footerContent.push(`<div><strong>Transit:</strong> ${escapeHTML(item.transportation)}</div>`);
            }
            if (item.notes) {
                footerContent.push(`<div><strong>Notes:</strong> ${escapeHTML(item.notes)}</div>`);
            }

            let footerBlock = '';
            if (footerContent.length > 0) {
                footerBlock = `<div class="card-footer">${footerContent.join('')}</div>`;
            }

            card.innerHTML = `
                <div class="card-header">
                    <div class="card-badges">
                        <span class="badge badge-category">${escapeHTML(category)}</span>
                        <span class="badge badge-county">${escapeHTML(county)}</span>
                    </div>
                    <h2>${escapeHTML(item.name)}</h2>
                </div>
                <div class="card-body">
                    ${coreInfo}
                    ${servicesBlock}
                </div>
                ${footerBlock}
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
