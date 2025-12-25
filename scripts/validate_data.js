const fs = require('fs');
const path = require('path');

const DATA_FILE = 'src/data/master_resources.js';

function readMasterData() {
    const code = fs.readFileSync(DATA_FILE, 'utf8');
    // Strip "const masterResources = " and ";"
    const jsonStr = code.replace(/^const masterResources = /, '').replace(/;$/, '');
    try {
        return JSON.parse(jsonStr);
    } catch (e) {
        console.error("Error parsing JSON:", e.message);
        return [];
    }
}

function validate() {
    const data = readMasterData();
    if (!data || data.length === 0) {
        console.error("No data found.");
        process.exit(1);
    }

    const errors = [];
    const counties = new Set(['Multnomah', 'Washington', 'Clackamas']);

    console.log(`Validating ${data.length} entries...`);

    data.forEach((item, index) => {
        // Schema check
        const requiredFields = ['category', 'name', 'address', 'phone', 'hours', 'services', 'notes', 'transportation', 'county'];
        requiredFields.forEach(field => {
            if (!item.hasOwnProperty(field)) {
                errors.push(`Item ${index} (${item.name}) missing field: ${field}`);
            }
        });

        // County check
        if (!counties.has(item.county)) {
             errors.push(`Item ${index} (${item.name}) has invalid county: ${item.county}`);
        }
    });

    if (errors.length > 0) {
        console.error("Validation failed with errors:");
        errors.forEach(e => console.error("- " + e));
        process.exit(1);
    } else {
        console.log("Validation passed!");
    }
}

validate();
