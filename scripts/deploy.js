var fs = require('fs');
var dir = '../dist'
var packageDir = './'


if(fs.existsSync(dir))
    fs.rmSync(dir, {recursive:true, force:true})
fs.mkdirSync(dir)
fs.mkdirSync(dir + '/lib')

fs.copyFileSync('./package.json', dir + '/package.json');
fs.copyFileSync('./package-lock.json', dir + '/package-lock.json');
fs.cpSync('./lib', dir + '/lib', {
    recursive: true,
  })