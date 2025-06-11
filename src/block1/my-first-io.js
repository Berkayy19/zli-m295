const fs = require('fs')
const filepath = process.argv[2]
const content = fs.readFileSync(filepath).toString();
const countn = content.split('\n').length - 1;
console.log(countn)