const http = require('node:http')
const fs = require('node:fs')
const url = require('node:url')
const replaceTemplate = require('./modules/replaceTemplate.js')

// Templates
const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
)

const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
)

const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
)

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data)

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true)

  // Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    })

    const cardsHTML = dataObj
      .map((el) => replaceTemplate(templateCard, el))
      .join('')

    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHTML)
    res.end(output)

    // Product Page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    })

    const product = dataObj[query.id]
    const output = replaceTemplate(templateProduct, product)
    res.end(output)

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    })
    res.end(data)

    // Not found
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html',
    })
    res.end('<h1>Page not found</h1>')
  }
})

server.listen(8080, () => {
  console.log('Server running at port 8080...')
})
