const fs = require('fs');
const path = require('path');
const exifr = require('exifr');

async function testExif() {
  const inputDir = 'C:\\Users\\DELL\\Desktop\\New folder';
  const files = fs.readdirSync(inputDir).filter(f => f.toLowerCase().endsWith('.heic')).sort();

  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const data = await exifr.parse(path.join(inputDir, f));
    console.log(`[${i+1}] ${f}: orientation = ${data ? data.Orientation : 'none'}`);
  }
}

testExif();
