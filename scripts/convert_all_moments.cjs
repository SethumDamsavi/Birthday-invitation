const fs = require('fs');
const path = require('path');
const convert = require('heic-convert');

async function convertAll() {
  const inputDir = 'C:\\Users\\DELL\\Desktop\\New folder';
  const outDir = path.join(__dirname, 'public', 'images', 'moments');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir)
    .filter(f => f.toLowerCase().endsWith('.heic'))
    .sort();

  console.log(`Starting conversion of ${files.length} images...`);

  const results = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const outName = `moment-${String(i + 1).padStart(2, '0')}.jpg`;
    const outPath = path.join(outDir, outName);
    
    console.log(`[${i + 1}/${files.length}] Converting ${file} -> ${outName}...`);
    const inputBuffer = fs.readFileSync(path.join(inputDir, file));
    
    const outputBuffer = await convert({
      buffer: inputBuffer,
      format: 'JPEG',
      quality: 0.85
    });

    fs.writeFileSync(outPath, outputBuffer);
    results.push({
      original: file,
      filename: outName,
      path: `/images/moments/${outName}`,
      size: outputBuffer.length
    });
  }

  fs.writeFileSync(
    path.join(__dirname, 'public', 'images', 'moments', 'manifest.json'),
    JSON.stringify(results, null, 2)
  );

  console.log(`\nAll ${files.length} images converted successfully!`);
}

convertAll().catch(err => {
  console.error('Error during conversion:', err);
  process.exit(1);
});
