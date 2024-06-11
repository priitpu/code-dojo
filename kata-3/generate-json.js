const fs = require('node:fs');

try {
  const folders = fs
    .readdirSync('./', { withFileTypes: true })
    .filter((el) => el.isDirectory())
    .map((el) => el.name);
  const json = JSON.stringify(folders, null, 2);
  fs.writeFileSync('folders.json', json);
} catch (err) {
  console.error(err);
}
