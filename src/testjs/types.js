var mime = require('mime-types')

function see(sType) {
  var ext = mime.extension(sType)
  console.log(`${sType} -> ${ext}`)
}

see('video/mp4');
see('application/vnd.ms-excel');
see('text/csv');
see('text/x-csv');
see('text/plain');