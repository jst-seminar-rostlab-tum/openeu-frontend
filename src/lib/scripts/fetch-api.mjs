#!/usr/bin/env node

import { execSync } from 'child_process';
import { config } from 'dotenv';
import { existsSync,mkdirSync } from 'fs';
import { dirname } from 'path';

config();

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
  console.error('❌ NEXT_PUBLIC_API_URL not found in environment variables');
  console.error('Please set NEXT_PUBLIC_API_URL in your .env file');
  process.exit(1);
}

const baseUrl = apiUrl.replace(/\/$/, '');
const openApiUrl = `${baseUrl}/openapi.json`;

console.log(`Fetching OpenAPI spec from: ${openApiUrl}`);

try {
  const outputDir = dirname('src/lib/openapi.json');
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  execSync(`curl -s "${openApiUrl}" -o src/lib/openapi.json`, {
    stdio: 'inherit',
  });

  console.log('✅ OpenAPI spec successfully fetched');
} catch (error) {
  console.error('❌ Failed to fetch OpenAPI spec:', error.message);
  process.exit(1);
}
