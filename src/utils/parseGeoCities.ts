/**
 * Generate `euCities.json` from GeoNames data
 * -------------------------------------------------
 *  1. Download & unzip to ./data/
 *     - https://download.geonames.org/export/dump/cities1000.zip  -> cities1000.txt
 *     - https://download.geonames.org/export/dump/countryInfo.txt -> countryInfo.txt
 *
 *  2. yarn ts-node --project tsconfig.scripts.json src/utils/parseGeoCities.ts
 *
 *  3. Creates src/domain/entities/map/euCities.json
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';

import { CityInfo } from '@/domain/entities/map/euCities';

import { europeanCountries } from '../components/map/constants';

const citiesFile = path.join(
  __dirname,
  '../../../world-cities/cities15000.txt',
);
const countryFile = path.join(
  __dirname,
  '../../../world-cities/countryInfo.txt',
);
const outputFile = path.join(__dirname, '../domain/entities/map/euCities.json');

function loadCountryNames(file: string): Record<string, string> {
  const map: Record<string, string> = {};
  const lines = fs.readFileSync(file, 'utf8').split('\n');

  for (const line of lines) {
    if (line.startsWith('#') || !line.trim()) continue;
    const cols = line.split('\t');
    const [code, , , , name] = cols;
    if (code && name) {
      map[code] = name;
    }
  }

  return map;
}

function cleanAltNames(base: string, raw: string): string[] {
  const latinRegex = /^[\p{Script=Latin}\p{P}\p{Zs}]{2,}$/u;

  return Array.from(
    new Set(
      raw
        .split(',')
        .map((name) => name.trim())
        .filter(
          (name) =>
            name &&
            name.toLowerCase() !== base.toLowerCase() &&
            latinRegex.test(name),
        ),
    ),
  );
}

async function parseGeoCities() {
  const countryMap = loadCountryNames(countryFile);
  const rl = readline.createInterface({
    input: fs.createReadStream(citiesFile),
    crlfDelay: Infinity,
  });

  const cityMap = new Map<string, CityInfo>();

  for await (const line of rl) {
    const cols = line.split('\t');
    if (cols.length < 15) continue;

    const name = cols[1];
    const alternateNames = cols[3];
    const lat = parseFloat(cols[4]);
    const lng = parseFloat(cols[5]);
    const countryCode = cols[8];
    const population = parseInt(cols[14] || '0', 10);

    const country = countryMap[countryCode];
    if (!country || !europeanCountries.includes(country)) continue;
    if (!name || isNaN(lat) || isNaN(lng)) continue;

    const key = `${country}|${name}`;

    const altNames = cleanAltNames(name, alternateNames || '');

    const city: CityInfo = {
      city: name,
      country,
      lat,
      lng,
      population,
      altNames,
    };

    const existing = cityMap.get(key);
    if (!existing || population > existing.population) {
      cityMap.set(key, city);
    }
  }

  const result = Array.from(cityMap.values()).sort(
    (a, b) => a.country.localeCompare(b.country) || b.population - a.population,
  );

  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
  console.log(`Saved ${result.length} EU cities to ${outputFile}`);
}

parseGeoCities().catch((err) => {
  console.error('Failed to parse cities:', err);
  process.exit(1);
});
