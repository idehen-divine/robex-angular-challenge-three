// scripts/replace-env.js

const fs = require("fs");

const envPath = "src/environments/environment.ts";

const content = `
export const environment = {
  production: true,
  tinyUrlApiKey: '${process.env.PUBLIC_TINYURL_API_KEY}',
  tinyUrlApiUrl: '${process.env.PUBLIC_TINYURL_API_URL}',
  localStorageKey: '${process.env.PUBLIC_LOCAL_STORAGE_KEY}',
};
`;

fs.writeFileSync(envPath, content);
console.log("✅ Environment variables injected into environment.ts");


// sgp_e3cb05880bc40429_a3cb4253c86908324a8236bcb6937ab25c5eb8ca