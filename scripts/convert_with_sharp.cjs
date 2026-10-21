const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function run() {
  const inputDir = 'C:\\Users\\DELL\\Desktop\\New folder';
  const outDir = path.join(__dirname, 'public', 'images', 'moments');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir)
    .filter(f => f.toLowerCase().endsWith('.heic'))
    .sort();

  console.log(`Processing ${files.length} images with sharp (auto-orient + optimize)...`);

  const manifest = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const outName = `moment-${String(i + 1).padStart(2, '0')}.jpg`;
    const inPath = path.join(inputDir, file);
    const outPath = path.join(outDir, outName);

    // .rotate() without args auto-rotates based on EXIF orientation!
    const info = await sharp(inPath)
      .rotate()
      .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 86, progressive: true })
      .toFile(outPath);

    console.log(`[${i + 1}/${files.length}] ${file} -> ${outName} (${info.width}x${info.height}, ${(info.size/1024).toFixed(0)}KB)`);

    manifest.push({
      id: i + 1,
      src: `/images/moments/${outName}`,
      width: info.width,
      height: info.height,
      aspect: info.width / info.height > 1.1 ? 'landscape' : info.height / info.width > 1.1 ? 'portrait' : 'square'
    });
  }

  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('Conversion complete!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
