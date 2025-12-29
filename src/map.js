document.addEventListener('DOMContentLoaded', () => {
    if (typeof L === 'undefined') {
        console.error('Leaflet JS is not loaded.');
        return;
    }

    // Initialize the map centered on Portland Metro Area
    const map = L.map('map').setView([45.5152, -122.6784], 10);

    // Add standard OpenStreetMap tile layer
    const osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Add Public Transit layer (using memomaps.de OPNV Karte)
    const transportLayer = L.tileLayer('https://tile.memomaps.de/tilegen/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Layer control
    const baseMaps = {
        "Standard Map": osmLayer,
        "Public Transit Map": transportLayer
    };

    L.control.layers(baseMaps).addTo(map);

    let markers = [];
    const categoryContainer = document.getElementById('mapCategoryContainer');
    let currentCategory = 'all';

    // Initialize
    init();

    function init() {
        // Assign masterResources to window.siteResources if available
        window.siteResources = typeof masterResources !== 'undefined' ? masterResources : [];

        if (window.siteResources.length > 0) {
            renderCategories();
            updateMap();
            setupEventListeners();
        } else {
            console.error('Resources not loaded');
        }
    }

    function getUniqueCategories() {
        const categories = new Set(window.siteResources.map(r => r.category));
        return Array.from(categories).sort();
    }

    function renderCategories() {
        if (!categoryContainer) return;

        const categories = getUniqueCategories();
        // Keep 'All' button (already in HTML), add others
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.className = 'category-chip';
            btn.textContent = cat;
            btn.dataset.category = cat;
            btn.addEventListener('click', () => handleCategoryClick(cat, btn));
            categoryContainer.appendChild(btn);
        });
    }

    function handleCategoryClick(category, btnElement) {
        currentCategory = category;

        // Update UI
        document.querySelectorAll('.category-chip').forEach(b => b.classList.remove('active'));
        btnElement.classList.add('active');

        // Render
        updateMap();
    }

    function setupEventListeners() {
        // Delegate 'All' click since it's hardcoded
        const allBtn = document.querySelector('.category-chip[data-category="all"]');
        if (allBtn) {
            allBtn.addEventListener('click', () => handleCategoryClick('all', allBtn));
        }
    }

    function updateMap() {
        // Clear existing markers
        markers.forEach(marker => map.removeLayer(marker));
        markers = [];

        // Filter resources
        const filteredResources = window.siteResources.filter(resource => {
            return currentCategory === 'all' || resource.category === currentCategory;
        });

        // Add markers
        filteredResources.forEach(resource => {
            if (resource.lat && resource.lng) {
                const marker = L.marker([resource.lat, resource.lng]).addTo(map);

                // Content: Name, Category, Transportation
                // Styling: Handled by classes defined in style.css (.map-popup, etc.)
                const popupContent = createPopupContent(resource);

                marker.bindPopup(popupContent, { minWidth: 300 });
                markers.push(marker);
            }
        });
    }

    function createPopupContent(resource) {
        const div = document.createElement('div');
        // Verified: map-popup-card class used for styling overrides
        div.className = 'resource-card map-popup-card';

        // Icons
        const locationIcon = `<svg class="info-icon" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`;
        const phoneIcon = `<svg class="info-icon" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>`;
        const clockIcon = `<svg class="info-icon" aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

        // Build address link
        let addressLink = '#';
        if (resource.address && resource.address.toLowerCase() !== 'confidential' && resource.address.toLowerCase() !== 'multiple locations') {
            // Strip text in parentheses for better geocoding
            const cleanAddress = resource.address.replace(/\s*\(.*?\)/g, '').trim();
            addressLink = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(cleanAddress)}&travelmode=transit`;
        }

        // Build phone link
        let phoneLink = '#';
        if (resource.phone && resource.phone !== 'Various') {
             // Basic clean of phone number for link
             const cleanPhone = resource.phone.replace(/[^0-9]/g, '');
             if (cleanPhone.length >= 10) {
                 phoneLink = `tel:${cleanPhone}`;
             }
        }

        // Services Text
        const services = resource.services ? `<div class="detail-text">${resource.services}</div>` : '';
        const notes = resource.notes ? `<div class="detail-text"><span class="detail-label">Notes:</span>${resource.notes}</div>` : '';
        const transport = resource.transportation ? `<div class="detail-text"><span class="detail-label">Transportation:</span>${resource.transportation}</div>` : '';

        div.innerHTML = `
            <div class="card-category">${resource.category}</div>
            <h3 class="card-title">${resource.name}</h3>

            <div class="card-info">
                ${resource.address ? `
                    <div class="info-row">
                        ${locationIcon}
                        <span>${resource.address}</span>
                    </div>
                ` : ''}

                ${resource.phone ? `
                    <div class="info-row">
                        ${phoneIcon}
                        <span>${resource.phone}</span>
                    </div>
                ` : ''}

                ${resource.hours ? `
                    <div class="info-row">
                        ${clockIcon}
                        <span>${resource.hours}</span>
                    </div>
                ` : ''}
            </div>

            <div class="card-details">
                <span class="detail-label">Services</span>
                ${services}
                ${notes}
                ${transport}
            </div>

            <div class="action-row">
                ${addressLink !== '#' ? `<a href="${addressLink}" target="_blank" class="btn btn-secondary" aria-label="Get directions to ${resource.name}">Directions</a>` : ''}
                ${phoneLink !== '#' ? `<a href="${phoneLink}" class="btn btn-primary" aria-label="Call ${resource.name}">Call</a>` : ''}
            </div>
        `;

        return div;
    }
});
