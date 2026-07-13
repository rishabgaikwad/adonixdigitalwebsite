const fs = require('fs');
let svg = fs.readFileSync('public/adonixfavblack.svg', 'utf8');
svg = svg.replace('viewBox="80 80 650 650"', 'viewBox="100 100 610 610"');
fs.writeFileSync('public/adonixfavblack.svg', svg);
