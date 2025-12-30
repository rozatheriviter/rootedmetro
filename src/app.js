// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Search Functionality
// IDs match index.html: searchInput, resourceGrid, categoryContainer
const searchInput = document.getElementById('searchInput');
const resourceList = document.getElementById('resourceGrid');
const categoryContainer = document.getElementById('categoryContainer');
const countyContainer = document.getElementById('countyContainer');

// State
let currentCategory = 'all';
let currentCounty = 'all';

// Helper: Escape HTML to prevent XSS
function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>"']/g, function(m) {
        switch (m) {
            case '&': return '&amp;';
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '"': return '&quot;';
            case "'": return '&#039;';
            default: return m;
        }
    });
}

// Initialize
function init() {
    // Assign masterResources to window.siteResources if available
    window.siteResources = typeof masterResources !== 'undefined' ? masterResources : [];

    if (window.siteResources.length > 0) {
        renderCounties();
        renderCategories();
        renderResources(window.siteResources); // Initial render
    } else {
        console.error("Resources not loaded!");
        if (resourceList) {
             resourceList.innerHTML = '<div class="no-results"><p>Error loading resources. Please refresh the page.</p></div>';
        }
    }
}

// Render Counties
function renderCounties() {
    // Get unique counties
    const counties = ['all', ...new Set(window.siteResources.map(r => r.county ? r.county.trim() : r.county).filter(Boolean))];

    if (countyContainer) {
        countyContainer.innerHTML = counties.map(c => {
            const escapedCounty = escapeHTML(c);
            const label = c === 'all' ? 'All Counties' : escapedCounty;
            return `
            <button class="category-chip ${c === 'all' ? 'active' : ''}"
                    data-county="${escapedCounty}">
                ${label}
            </button>
            `;
        }).join('');

        // Add event listeners
        countyContainer.querySelectorAll('.category-chip').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                countyContainer.querySelectorAll('.category-chip').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');

                // Update filter
                currentCounty = e.currentTarget.dataset.county;
                filterResources();
            });
        });
    }
}

// Render Categories
function renderCategories() {
    // Get unique categories
    const categories = ['all', ...new Set(window.siteResources.map(r => r.category))];

    if (categoryContainer) {
        categoryContainer.innerHTML = categories.map(cat => {
            const escapedCat = escapeHTML(cat);
            return `
            <button class="category-chip ${cat === 'all' ? 'active' : ''}"
                    data-category="${escapedCat}">
                ${cat === 'all' ? 'All' : escapedCat}
            </button>
            `;
        }).join('');

        // Add event listeners
        categoryContainer.querySelectorAll('.category-chip').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Update active state
                categoryContainer.querySelectorAll('.category-chip').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');

                // Update filter
                currentCategory = e.currentTarget.dataset.category;
                filterResources();
            });
        });
    }
}

// Filter Resources
function filterResources() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';

    const filtered = window.siteResources.filter(resource => {
        // Decode category from dataset might be needed if complex chars used, but here simpler
        const matchesCategory = currentCategory === 'all' || (resource.category && escapeHTML(resource.category) === currentCategory);
        const matchesCounty = currentCounty === 'all' || (resource.county && escapeHTML(resource.county) === currentCounty);

        const matchesSearch =
            (resource.name && resource.name.toLowerCase().includes(searchTerm)) ||
            (resource.services && resource.services.toLowerCase().includes(searchTerm)) ||
            (resource.category && resource.category.toLowerCase().includes(searchTerm));

        return matchesCategory && matchesCounty && matchesSearch;
    });

    renderResources(filtered);
}

// Render Resources
function renderResources(items) {
    if (!resourceList) return;

    if (items.length === 0) {
        resourceList.innerHTML = `
            <div class="no-results">
                <p>No resources found matching your criteria.</p>
            </div>
        `;
        return;
    }

    resourceList.innerHTML = items.map(resource => {
        const name = escapeHTML(resource.name);
        const category = escapeHTML(resource.category);
        const address = escapeHTML(resource.address);
        const phone = escapeHTML(resource.phone);
        const hours = escapeHTML(resource.hours);
        const services = escapeHTML(resource.services);
        const notes = escapeHTML(resource.notes);
        const transportation = escapeHTML(resource.transportation);

        return `
        <div class="resource-card">
            <div class="card-category">${category}</div>
            <h3 class="card-title">${name}</h3>

            <div class="card-info">
                ${resource.address ? `
                    <div class="info-row">
                        <svg class="info-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>${address}</span>
                    </div>
                ` : ''}

                ${resource.phone ? `
                    <div class="info-row">
                        <svg class="info-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <a href="tel:${phone}">${phone}</a>
                    </div>
                ` : ''}

                ${resource.hours ? `
                    <div class="info-row">
                        <svg class="info-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>${hours}</span>
                    </div>
                ` : ''}
            </div>

            <div class="card-details">
                ${resource.services ? `
                    <span class="detail-label">Services</span>
                    <p class="detail-text">${services}</p>
                ` : ''}

                ${resource.notes ? `
                    <span class="detail-label">Notes</span>
                    <p class="detail-text">${notes}</p>
                ` : ''}

                ${resource.transportation ? `
                    <span class="detail-label">Transportation</span>
                    <p class="detail-text">${transportation}</p>
                ` : ''}
            </div>

            <div class="action-row">
                ${getMapLink(resource)}
                ${getPhoneLink(resource)}
            </div>
        </div>
    `}).join('');
}

// Helper: Map Link
function getMapLink(resource) {
    if (!resource.address || resource.address.toLowerCase().includes('confidential')) return '';

    // Simple encoding for Google Maps
    const query = encodeURIComponent(resource.address);
    // Address itself should be escaped if displayed, but in URL param it needs encodeURIComponent.
    // However, for aria-label, we need escapeHTML.
    const escapedName = escapeHTML(resource.name);

    return `
        <a href="https://www.google.com/maps/search/?api=1&query=${query}"
           target="_blank"
           rel="noopener noreferrer"
           class="btn btn-secondary"
           aria-label="Directions to ${escapedName}">
           Map
        </a>
    `;
}

// Helper: Phone Link
function getPhoneLink(resource) {
    if (!resource.phone) return '';
    const escapedName = escapeHTML(resource.name);
    const escapedPhone = escapeHTML(resource.phone);
    return `
        <a href="tel:${escapedPhone}"
           class="btn btn-primary"
           aria-label="Call ${escapedName}">
           Call
        </a>
    `;
}

// Event Listeners
if (searchInput) {
    searchInput.addEventListener('input', filterResources);
}

// Start
init();
