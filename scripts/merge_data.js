const fs = require('fs');
const path = require('path');
const vm = require('vm');

// Paths
const RESOURCES_FILE = 'resources.js';
const METRO_RESOURCES_FILE = 'metroresources.js';
const DATA3_FILE = 'data3.js';
const OUTPUT_FILE = 'src/data/master_resources.js';

// County mapping
const CITY_TO_COUNTY = {
    'Beaverton': 'Washington',
    'Hillsboro': 'Washington',
    'Tigard': 'Washington',
    'Tualatin': 'Washington',
    'Forest Grove': 'Washington',
    'Cornelius': 'Washington',
    'Gaston': 'Washington',
    'Sherwood': 'Washington',
    'Aloha': 'Washington',
    'North Plains': 'Washington',
    'Banks': 'Washington',
    'King City': 'Washington',
    'Durham': 'Washington',
    'Portland': 'Multnomah',
    'Gresham': 'Multnomah',
    'Fairview': 'Multnomah',
    'Troutdale': 'Multnomah',
    'Wood Village': 'Multnomah',
    'Maywood Park': 'Multnomah',
    'Oregon City': 'Clackamas',
    'Canby': 'Clackamas',
    'Estacada': 'Clackamas',
    'Sandy': 'Clackamas',
    'Molalla': 'Clackamas',
    'Milwaukie': 'Clackamas',
    'Clackamas': 'Clackamas',
    'Gladstone': 'Clackamas',
    'West Linn': 'Clackamas',
    'Lake Oswego': 'Clackamas',
    'Wilsonville': 'Clackamas', // Mostly Clackamas
    'Happy Valley': 'Clackamas',
    'Colton': 'Clackamas',
    'Beavercreek': 'Clackamas',
    'Eagle Creek': 'Clackamas',
    'Welches': 'Clackamas',
    'Rhododendron': 'Clackamas',
    'Boring': 'Clackamas',
    'Damascus': 'Clackamas',
    'Vernonia': 'Columbia'
};

// Heuristic Zip Codes (Primary county)
const ZIP_TO_COUNTY = {
    '97005': 'Washington', '97006': 'Washington', '97007': 'Washington', '97008': 'Washington',
    '97062': 'Washington', '97075': 'Washington', '97076': 'Washington', '97077': 'Washington',
    '97113': 'Washington', '97116': 'Washington', '97119': 'Washington', '97123': 'Washington',
    '97124': 'Washington', '97133': 'Washington', '97140': 'Washington', '97223': 'Washington',
    '97224': 'Washington', '97225': 'Washington', '97229': 'Washington',

    '97019': 'Multnomah', '97024': 'Multnomah', '97030': 'Multnomah', '97060': 'Multnomah',
    '97080': 'Multnomah', '97201': 'Multnomah', '97202': 'Multnomah', '97203': 'Multnomah',
    '97204': 'Multnomah', '97205': 'Multnomah', '97206': 'Multnomah', '97209': 'Multnomah',
    '97210': 'Multnomah', '97211': 'Multnomah', '97212': 'Multnomah', '97213': 'Multnomah',
    '97214': 'Multnomah', '97215': 'Multnomah', '97216': 'Multnomah', '97217': 'Multnomah',
    '97218': 'Multnomah', '97219': 'Multnomah', '97220': 'Multnomah', '97221': 'Multnomah',
    '97227': 'Multnomah', '97230': 'Multnomah', '97231': 'Multnomah', '97232': 'Multnomah',
    '97233': 'Multnomah', '97236': 'Multnomah', '97239': 'Multnomah', '97266': 'Multnomah',

    '97004': 'Clackamas', '97009': 'Clackamas', '97011': 'Clackamas', '97013': 'Clackamas',
    '97015': 'Clackamas', '97017': 'Clackamas', '97022': 'Clackamas', '97023': 'Clackamas',
    '97027': 'Clackamas', '97034': 'Clackamas', '97035': 'Clackamas', '97038': 'Clackamas',
    '97042': 'Clackamas', '97045': 'Clackamas', '97049': 'Clackamas', '97055': 'Clackamas',
    '97067': 'Clackamas', '97068': 'Clackamas', '97070': 'Clackamas', '97086': 'Clackamas',
    '97089': 'Clackamas', '97222': 'Clackamas', '97267': 'Clackamas'
};

function readResourcesJs() {
    let code = fs.readFileSync(RESOURCES_FILE, 'utf8').trim();
    if (!code.endsWith('];')) {
        const lastBraceIndex = code.lastIndexOf('}');
        if (lastBraceIndex !== -1) {
            code = code.substring(0, lastBraceIndex + 1) + '];';
        } else {
             code += '];';
        }
    }
    const sandbox = {};
    vm.createContext(sandbox);
    try {
        vm.runInContext(code, sandbox);
        return sandbox.resources || [];
    } catch (e) {
        console.error("Error parsing resources.js:", e.message);
        return [];
    }
}

function parseJsonBlocks(content) {
    const jsonBlocks = [];
    let depth = 0;
    let start = -1;
    for (let i = 0; i < content.length; i++) {
        if (content[i] === '[') {
            if (depth === 0) start = i;
            depth++;
        } else if (content[i] === ']') {
            depth--;
            if (depth === 0 && start !== -1) {
                const block = content.substring(start, i + 1);
                try {
                    const parsed = JSON.parse(block);
                    if (Array.isArray(parsed)) {
                        jsonBlocks.push(parsed);
                    }
                } catch (e) {}
                start = -1;
            }
        }
    }
    return jsonBlocks.flat();
}

function readMetroResourcesJs() {
    try {
        const content = fs.readFileSync(METRO_RESOURCES_FILE, 'utf8');
        return parseJsonBlocks(content);
    } catch (e) {
        console.error("Error parsing metroresources.js:", e.message);
        return [];
    }
}

function readData3Js() {
    try {
        const content = fs.readFileSync(DATA3_FILE, 'utf8');
        // Use parseJsonBlocks because data3.js contains multiple JSON array blocks concatenated
        return parseJsonBlocks(content);
    } catch (e) {
        console.error("Error parsing data3.js:", e.message);
        return [];
    }
}

function inferCounty(item) {
    if (item.county) return item.county;

    const address = item.address || "";

    // Check Zip
    const zipMatch = address.match(/\b9\d{4}\b/);
    if (zipMatch) {
        const zip = zipMatch[0];
        if (ZIP_TO_COUNTY[zip]) return ZIP_TO_COUNTY[zip];
    }

    // Check City
    for (const [city, county] of Object.entries(CITY_TO_COUNTY)) {
        const regex = new RegExp(`\\b${city}\\b`, 'i');
        if (regex.test(address)) {
            return county;
        }
    }

    if (/^\s*\d+\s+[NS][EW]?\s+/i.test(address)) {
        return "Multnomah";
    }

    if (address.includes("Portland") || address.includes("PDX")) return "Multnomah";

    const content = (item.name + " " + item.services + " " + item.notes).toLowerCase();
    if (content.includes("multnomah")) return "Multnomah";
    if (content.includes("washington county")) return "Washington";
    if (content.includes("clackamas")) return "Clackamas";
    if (content.includes("tri-county") || content.includes("tri county")) return "Multnomah";

    return "Multnomah";
}

function normalizeItem(item, source) {
    let county = item.county;

    if (source === 'resources.js') {
        county = 'Washington';
    } else {
        if (!county) {
            county = inferCounty(item);
        }
    }

    let address = item.address || "Confidential/Remote";
    if (address.trim() === "") address = "Confidential/Remote";

    return {
        category: item.category || "Uncategorized",
        name: item.name || "Unknown Name",
        address: address,
        phone: item.phone || "None listed",
        hours: item.hours || "Contact for hours",
        services: item.services || "None listed",
        notes: item.notes || "",
        transportation: item.transportation || "None listed",
        county: county
    };
}

function mergeData() {
    const resourcesData = readResourcesJs();
    const metroData = readMetroResourcesJs();
    const data3Data = readData3Js();

    const allResources = [];

    resourcesData.forEach(item => {
        allResources.push(normalizeItem(item, 'resources.js'));
    });

    metroData.forEach(item => {
        allResources.push(normalizeItem(item, 'metroresources.js'));
    });

    data3Data.forEach(item => {
        allResources.push(normalizeItem(item, 'data3.js'));
    });

    // De-duplication
    const seen = new Map();
    const finalResources = [];

    allResources.forEach(item => {
        const cleanName = item.name.toLowerCase().trim();
        const cleanAddress = item.address.toLowerCase().trim().replace(/[^a-z0-9]/g, '');

        let key = `${cleanName}|${cleanAddress}`;

        if (cleanAddress.includes("confidential") || cleanAddress.includes("remote")) {
             key = `confidential|${cleanName}`;
        }

        if (!seen.has(key)) {
            seen.set(key, item);
            finalResources.push(item);
        }
    });

    return finalResources;
}

const merged = mergeData();

const outputContent = `const masterResources = ${JSON.stringify(merged, null, 2)};`;
fs.writeFileSync(OUTPUT_FILE, outputContent);

console.log(`Merged ${merged.length} resources. Saved to ${OUTPUT_FILE}`);
