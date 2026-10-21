const fs = require('fs');
const path = require('path');
const convert = require('heic-convert');

async function test() {
  const inputDir = 'C:\\Users\\DELL\\Desktop\\New folder';
  const outDir = path.join(__dirname, 'public', 'images', 'moments');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir).filter(f => f.toLowerCase().endsWith('.heic'));
  console.log(`Found ${files.length} HEIC files.`);

  // Test first file
  const first = files[0];
  console.log(`Testing conversion of ${first}...`);
  const inputBuffer = fs.readFileSync(path.join(inputDir, first));
  const outputBuffer = await convert({
    buffer: inputBuffer,
    format: 'JPEG',
    quality: 0.88
  });

  const outPath = path.join(outDir, first.replace(/\.heic$/i, '.jpg'));
  fs.writeFileSync(outPath, outputBuffer);
  console.log(`Successfully converted ${first} -> ${outPath} (${outputBuffer.length} bytes)`);
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});
