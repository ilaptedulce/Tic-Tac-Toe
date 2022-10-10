const http = require('http')
const fs = require('fs/promises')

http.createServer((req, res) => {
  console.log(req.method, req.url)
  const files = ['index.html', 'style.css', 'script.js']

  if (req.method === 'GET' && files.some((fileName) => req.url.includes(fileName))) {
    const fileName = files.find((fileName) => req.url.includes(fileName))
    fs.readFile(fileName).then(fileData => res.end(fileData))
  }
  if (req.method === 'POST') {
    req.on('data', (data) => {
      fs.writeFile('gameData.json', data)
    })
    res.end('The POST was received')
  }
  if (req.method === 'GET' && req.url === '/gameData') {
    fs.readFile('gameData.json').then(gameData => res.end(gameData))
  }
}).listen(3000)
