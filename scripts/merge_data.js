const fs = require('fs');
const path = require('path');
const vm = require('vm');

// File Paths
const RESOURCES_FILE = 'resources.js';
const METRO_RESOURCES_FILE = 'metroresources.js';
const DATA3_FILE = 'data3.js';
const OUTPUT_FILE = 'src/data/master_resources.js';

// Mappings & Constants

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
    'Milwaukee': 'Clackamas',
    'Clackamas': 'Clackamas',
    'Gladstone': 'Clackamas',
    'West Linn': 'Clackamas',
    'Lake Oswego': 'Clackamas',
    'Wilsonville': 'Clackamas',
    'Happy Valley': 'Clackamas',
    'Colton': 'Clackamas',
    'Beavercreek': 'Clackamas',
    'Eagle Creek': 'Clackamas',
    'Welches': 'Clackamas',
    'Rhododendron': 'Clackamas',
    'Boring': 'Clackamas',
    'Damascus': 'Clackamas',
    'Vernonia': 'Columbia',
    'Scappoose': 'Columbia',
    'St. Helens': 'Columbia'
};

const ZIP_TO_COUNTY = {
    // Washington
    '97005': 'Washington', '97006': 'Washington', '97007': 'Washington', '97008': 'Washington',
    '97062': 'Washington', '97075': 'Washington', '97076': 'Washington', '97077': 'Washington',
    '97113': 'Washington', '97116': 'Washington', '97119': 'Washington', '97123': 'Washington',
    '97124': 'Washington', '97133': 'Washington', '97140': 'Washington', '97223': 'Washington',
    '97224': 'Washington', '97225': 'Washington', '97229': 'Washington', '97003': 'Washington',
    '97125': 'Washington',

    // Multnomah
    '97019': 'Multnomah', '97024': 'Multnomah', '97030': 'Multnomah', '97060': 'Multnomah',
    '97080': 'Multnomah', '97201': 'Multnomah', '97202': 'Multnomah', '97203': 'Multnomah',
    '97204': 'Multnomah', '97205': 'Multnomah', '97206': 'Multnomah', '97209': 'Multnomah',
    '97210': 'Multnomah', '97211': 'Multnomah', '97212': 'Multnomah', '97213': 'Multnomah',
    '97214': 'Multnomah', '97215': 'Multnomah', '97216': 'Multnomah', '97217': 'Multnomah',
    '97218': 'Multnomah', '97219': 'Multnomah', '97220': 'Multnomah', '97221': 'Multnomah',
    '97227': 'Multnomah', '97230': 'Multnomah', '97231': 'Multnomah', '97232': 'Multnomah',
    '97233': 'Multnomah', '97236': 'Multnomah', '97239': 'Multnomah', '97266': 'Multnomah',
    '97208': 'Multnomah',

    // Clackamas
    '97004': 'Clackamas', '97009': 'Clackamas', '97011': 'Clackamas', '97013': 'Clackamas',
    '97015': 'Clackamas', '97017': 'Clackamas', '97022': 'Clackamas', '97023': 'Clackamas',
    '97027': 'Clackamas', '97034': 'Clackamas', '97035': 'Clackamas', '97038': 'Clackamas',
    '97042': 'Clackamas', '97045': 'Clackamas', '97049': 'Clackamas', '97055': 'Clackamas',
    '97067': 'Clackamas', '97068': 'Clackamas', '97070': 'Clackamas', '97086': 'Clackamas',
    '97089': 'Clackamas', '97222': 'Clackamas', '97267': 'Clackamas', '97002': 'Clackamas',
    '97013': 'Clackamas'
};

const CATEGORY_MAP = {
    'clothing': 'Clothing',
    'day services/hygiene': 'Day Services and Hygiene',
    'day services/hospitality': 'Day Services and Hygiene',
    'disability and aging support': 'Disability and Aging',
    'domestic violence/sexual assault': 'Domestic Violence and Sexual Assault',
    'domestic violence': 'Domestic Violence and Sexual Assault',
    'domestic violence and sexual assault': 'Domestic Violence and Sexual Assault',
    'family and parenting support': 'Family and Parenting',
    'family services': 'Family and Parenting',
    'youth services': 'Youth Services',
    'counseling/mediation': 'Mental Health and Recovery',
    'mental health and recovery services': 'Mental Health and Recovery',
    'recovery services': 'Mental Health and Recovery',
    'food and grocery assistance': 'Food and Nutrition',
    'food boxes': 'Food and Nutrition',
    'food boxes/meals': 'Food and Nutrition',
    'meals': 'Food and Nutrition',
    'health care': 'Health Care',
    'dental care': 'Health Care',
    'housing and rental assistance': 'Housing and Shelter',
    'housing assistance': 'Housing and Shelter',
    'housing services': 'Housing and Shelter',
    'rental assistance': 'Housing and Shelter',
    'shelter': 'Housing and Shelter',
    'shelters': 'Housing and Shelter',
    'winter shelters': 'Housing and Shelter',
    'all year round shelters': 'Housing and Shelter',
    'severe weather shelters': 'Housing and Shelter',
    'legal services': 'Legal Services',
    'libraries': 'Community Resources',
    'mutual aid': 'Community Resources',
    'pet care': 'Community Resources',
    'std/hiv/aids': 'Health Care',
    'syringe exchange/harm reduction': 'Health Care',
    'transportation': 'Transportation',
    'utility assistance': 'Utilities',
    'vendor opportunities': 'Employment',
    'employment & training': 'Employment',
    'employment and training': 'Employment',
    'financial assistance': 'Financial Assistance',
    'lgbtq resources': 'LGBTQ+ Resources',
    'lgbtqi resources': 'LGBTQ+ Resources',
    'veterans services': 'Veterans Services',
    'veteran services': 'Veterans Services',
    'clackamas county services': 'Community Resources',
    'laundry services': 'Day Services and Hygiene',
    'local government services': 'Community Resources',
    'street crisis intervention': 'Emergency Services',
};

// Parsers

function readJsArrayFile(filepath, arrayName) {
    try {
        let code = fs.readFileSync(filepath, 'utf8').trim();
        code = code.replace(/^(const|let|var)\s+/, '');
        if (code.endsWith(']') && !code.endsWith('];')) code += ';';

        const sandbox = {};
        vm.createContext(sandbox);
        vm.runInContext(code, sandbox);
        return sandbox[arrayName] || [];
    } catch (e) {
        console.error(`Error reading ${filepath}:`, e.message);
        return [];
    }
}

function readMultipleJsonFile(filepath) {
    try {
        let content = fs.readFileSync(filepath, 'utf8');

        // Fix known syntax errors in metroresources.js (unescaped quotes)
        content = content.replace(/"RecoveryNow"/g, "'RecoveryNow'");

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
                            jsonBlocks.push(...parsed);
                        }
                    } catch (e) {
                        try {
                            const sandbox = {};
                            vm.createContext(sandbox);
                            const parsed = vm.runInContext('result = ' + block, sandbox);
                            if (Array.isArray(parsed)) {
                                jsonBlocks.push(...parsed);
                            }
                        } catch (e2) {
                            console.error(`Failed to parse block in ${filepath}:`, e2.message);
                        }
                    }
                    start = -1;
                }
            }
        }
        return jsonBlocks;
    } catch (e) {
        console.error(`Error reading ${filepath}:`, e.message);
        return [];
    }
}

// Helpers

function inferCounty(item, defaultCounty = null) {
    if (item.county) {
        const c = item.county.trim();
        if (['Washington', 'Multnomah', 'Clackamas', 'Columbia', 'Yamhill'].includes(c)) return c;
    }

    const address = (item.address || "").trim();

    // Check Zip Code
    const zipMatch = address.match(/\b9\d{4}\b/);
    if (zipMatch) {
        const zip = zipMatch[0];
        if (ZIP_TO_COUNTY[zip]) return ZIP_TO_COUNTY[zip];
    }

    // Check City Name
    for (const [city, county] of Object.entries(CITY_TO_COUNTY)) {
        const regex = new RegExp(`\\b${city}\\b`, 'i');
        if (regex.test(address)) {
            return county;
        }
    }

    // Heuristic Indicators
    const content = (item.name + " " + item.notes + " " + item.services).toLowerCase();
    if (content.includes("multnomah")) return "Multnomah";
    if (content.includes("washington county")) return "Washington";
    if (content.includes("clackamas")) return "Clackamas";
    if (address.toLowerCase().includes("portland")) return "Multnomah";

    // Only use default if specific detection failed
    if (defaultCounty) return defaultCounty;

    return "Multnomah";
}

function normalizeCategory(cat) {
    if (!cat) return "Uncategorized";
    const lower = cat.toLowerCase().trim();
    if (CATEGORY_MAP[lower]) return CATEGORY_MAP[lower];

    for (const key in CATEGORY_MAP) {
        if (lower.includes(key)) return CATEGORY_MAP[key];
    }
    return cat;
}

function cleanString(str) {
    if (!str) return "";
    return str.replace(/\s+/g, ' ').trim();
}

function anonymizeNotes(notes) {
    if (!notes) return "";
    let cleaned = notes;
    cleaned = cleaned.replace(/(User|Contact|Ask for):\s*([A-Z][a-z]+)\s+([A-Z][a-z]+)/g, (match, prefix, first, last) => {
        if (last === "Share" || last === "Center" || last === "Hospital" || last === "Line" || last === "Department" || last === "Place" || last === "Clinic" || first === "Care") {
            return match;
        }
        return `${prefix}: ${first[0]}${last[0]}`;
    });
    return cleaned;
}

// Main Logic

function mergeData() {
    console.log("Starting data merge...");

    const resources = readJsArrayFile(RESOURCES_FILE, 'resources');
    const metro = readMultipleJsonFile(METRO_RESOURCES_FILE);
    const data3 = readMultipleJsonFile(DATA3_FILE);

    console.log(`Read ${resources.length} from resources.js`);
    console.log(`Read ${metro.length} from metroresources.js`);
    console.log(`Read ${data3.length} from data3.js`);

    const allEntries = [
        ...resources.map(i => ({...i, _source: 'resources.js'})),
        ...metro.map(i => ({...i, _source: 'metroresources.js'})),
        ...data3.map(i => ({...i, _source: 'data3.js'}))
    ];

    const resourceMap = new Map();

    allEntries.forEach(raw => {
        const name = cleanString(raw.name);
        const address = cleanString(raw.address);
        const category = normalizeCategory(raw.category);
        const county = inferCounty(raw, raw._source === 'resources.js' ? 'Washington' : null);
        const phone = cleanString(raw.phone);
        const hours = cleanString(raw.hours);
        const services = cleanString(raw.services);
        const notes = anonymizeNotes(cleanString(raw.notes));
        const transportation = cleanString(raw.transportation);

        if (!name) return;

        // Deduplication Key: Name + Address
        // Normalize name: remove accents, lowercase
        const normName = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        let keyAddress = address.toLowerCase();
        if (keyAddress.includes('confidential') || keyAddress.includes('undisclosed') || keyAddress.includes('remote') || !keyAddress) {
            keyAddress = 'CONFIDENTIAL';
        } else {
             keyAddress = keyAddress.replace(/[.,]/g, '');
        }

        const key = `${normName}|${keyAddress}`;

        const entry = {
            category,
            name,
            address,
            phone,
            hours,
            services,
            notes,
            transportation,
            county,
            _source: raw._source
        };

        function isUseful(val) {
             if (!val) return false;
             const v = val.toLowerCase();
             return v !== 'none listed' && v !== 'n/a' && v !== 'not listed' && v !== 'none';
        }

        if (resourceMap.has(key)) {
            const existing = resourceMap.get(key);
            const isData3 = entry._source === 'data3.js';
            const isExistingData3 = existing._source === 'data3.js';

            if (isData3 && !isExistingData3) {
                 if (isUseful(entry.phone)) existing.phone = entry.phone;
                 if (isUseful(entry.hours)) existing.hours = entry.hours;
                 if (entry.address && entry.address !== "Confidential/Remote") existing.address = entry.address;
                 if (isUseful(entry.transportation)) existing.transportation = entry.transportation;
                 existing._source = 'data3.js';
            } else {
                if (!existing.phone && entry.phone) existing.phone = entry.phone;
                if (!existing.hours && entry.hours) existing.hours = entry.hours;
                if ((!existing.address || existing.address.includes('Confidential')) && entry.address && !entry.address.includes('Confidential')) existing.address = entry.address;
                if (!existing.transportation && entry.transportation) existing.transportation = entry.transportation;
            }

            if (entry.services && !existing.services.includes(entry.services)) {
                if (!isUseful(existing.services)) existing.services = entry.services;
                else if (isUseful(entry.services)) existing.services += ` | ${entry.services}`;
            }

            if (entry.notes && !existing.notes.includes(entry.notes)) {
                if (!existing.notes) existing.notes = entry.notes;
                else existing.notes += ` ${entry.notes}`;
            }

            if (entry._source === 'data3.js' && raw.county) {
                existing.county = raw.county;
            }

        } else {
            resourceMap.set(key, entry);
        }
    });

    const mergedList = Array.from(resourceMap.values()).map(item => {
        delete item._source;
        return item;
    });

    mergedList.sort((a, b) => {
        if (a.category < b.category) return -1;
        if (a.category > b.category) return 1;
        return a.name.localeCompare(b.name);
    });

    const outputContent = `const masterResources = ${JSON.stringify(mergedList, null, 2)};`;
    fs.writeFileSync(OUTPUT_FILE, outputContent);

    console.log(`Success! Consolidated ${mergedList.length} resources into ${OUTPUT_FILE}`);
}

mergeData();
