const https = require('https');
const fs = require('fs');

const url = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
const dest = 'c:\\Users\\DELL\\Documents\\Babas birthday\\public\\music\\birthday.mp3';

const file = fs.createWriteStream(dest);
https.get(url, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close();
    console.log('Download complete.');
  });
}).on('error', function(err) {
  fs.unlink(dest);
  console.log('Error downloading:', err.message);
});
