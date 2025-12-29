// This script processes the master_resources.js file and attempts to geocode
// addresses that do not yet have latitude/longitude.
// It uses Nominatim (OpenStreetMap) which has a rate limit of 1 request per second.
// NOTE: For the full dataset (400+ items), this script will take over 7 minutes to run.
// It may timeout in restricted environments.

const fs = require('fs');
const https = require('https');
const path = require('path');

const MASTER_FILE = 'src/data/master_resources.js';

function readMasterResources() {
    let content = fs.readFileSync(MASTER_FILE, 'utf8');
    const prefix = 'const masterResources = ';
    if (content.startsWith(prefix)) {
        content = content.substring(prefix.length);
    }
    if (content.endsWith(';')) {
        content = content.slice(0, -1);
    }
    try {
        return JSON.parse(content);
    } catch (e) {
        console.error("Error parsing master_resources.js:", e);
        return [];
    }
}

function saveMasterResources(resources) {
    const content = `const masterResources = ${JSON.stringify(resources, null, 2)};`;
    fs.writeFileSync(MASTER_FILE, content);
    console.log(`Saved to ${MASTER_FILE}`);
}

function geocodeAddress(address) {
    return new Promise((resolve) => {
        // Aggressive cleaning: remove parentheses, floor numbers, suite numbers
        let cleanAddress = address.replace(/\(.*\)/g, '')
                                  .replace(/,?\s*(Ste|Suite|Floor|Room|Apt|Unit)\s*[\w\d-]+/gi, '')
                                  .replace(/,?\s*#\s*[\w\d-]+/g, '')
                                  .trim();

        // Append context if needed (most are Portland Metro)
        if (!cleanAddress.toLowerCase().includes('or') && !cleanAddress.toLowerCase().includes('oregon')) {
             cleanAddress += ', Oregon';
        }

        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cleanAddress)}&limit=1`;

        const options = {
            headers: {
                'User-Agent': 'RootedMetroGeocodingScript/1.0 (contact@example.com)'
            }
        };

        const req = https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode !== 200) {
                     console.error(`Error ${res.statusCode} for ${cleanAddress}`);
                     resolve(null);
                     return;
                }
                try {
                    const json = JSON.parse(data);
                    if (json && json.length > 0) {
                        resolve({ lat: parseFloat(json[0].lat), lng: parseFloat(json[0].lon) });
                    } else {
                        // console.log(`No results for: ${cleanAddress}`);
                        resolve(null);
                    }
                } catch (e) {
                    resolve(null);
                }
            });
        });

        req.on('error', (err) => {
            console.error("Request error:", err.message);
            resolve(null);
        });

        req.end();
    });
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
    const resources = readMasterResources();
    let updatedCount = 0;
    const LIMIT = 15; // Try 15 items
    let processed = 0;

    console.log(`Loaded ${resources.length} resources.`);

    for (let i = 0; i < resources.length; i++) {
        if (processed >= LIMIT) break;

        const res = resources[i];
        if (res.lat && res.lng) continue;

        const addrLower = (res.address || "").toLowerCase();
        if (addrLower.includes('confidential') || addrLower.includes('remote') || addrLower === 'none listed' || addrLower.length < 5) {
            continue;
        }

        console.log(`[${processed + 1}/${LIMIT}] Geocoding: ${res.address}`);

        const coords = await geocodeAddress(res.address);
        if (coords) {
            res.lat = coords.lat;
            res.lng = coords.lng;
            updatedCount++;
            console.log(`   -> OK: ${coords.lat}, ${coords.lng}`);
        } else {
            console.log("   -> Failed");
        }

        processed++;
        await sleep(1500); // 1.5s delay

        // Save periodically
        if (updatedCount % 5 === 0 && updatedCount > 0) {
            saveMasterResources(resources);
        }
    }

    if (updatedCount > 0) {
        saveMasterResources(resources);
        console.log(`Done. Updated ${updatedCount} items.`);
    } else {
        console.log("Done. No updates.");
    }
}

main();
