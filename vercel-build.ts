
import * as fs from 'fs';

const envPath = 'src/environments/environment.ts';

const content = `
export const environment = {
  production: true,
  tinyUrlApiKey: '${process.env['PUBLIC_TINYURL_API_KEY']}',
  tinyUrlApiUrl: '${process.env['PUBLIC_TINYURL_API_URL']}',
  localStorageKey: '${process.env['PUBLIC_LOCAL_STORAGE_KEY']}',
};
`;

fs.writeFileSync(envPath, content);
console.log('🔁 Environment variables injected successfully.');
