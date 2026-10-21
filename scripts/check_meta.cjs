const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function checkOrientations() {
  const dir = path.join(__dirname, 'public', 'images', 'moments');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg')).sort();

  for (const f of files) {
    const meta = await sharp(path.join(dir, f)).metadata();
    console.log(`${f}: ${meta.width}x${meta.height}, orientation: ${meta.orientation}`);
  }
}

checkOrientations();
