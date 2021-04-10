const jsonServer = require('json-server')
const queryString = require('query-string')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
    req.body.updatedAt = Date.now()
  } else if (req.method === 'PATCH') {
    req.body.updatedAt = Date.now()
  }

  next()
})

router.render = (req, res) => {
  const headers = res.getHeaders()

  const totalCountHeader = headers['x-total-count']
  
  if (req.method === 'GET' && totalCountHeader) {
    const queryParams = queryString.parse(req._parsedUrl.query)
    
    const result = {
      data: res.locals.data,
      pagination: {
        _page: Number.parseInt(queryParams._page) || 1,
        _limit: Number.parseInt(queryParams._limit) || 5,
        _totalRows: Number.parseInt(totalCountHeader)
      }
    }
    res.jsonp(result)
  }

}

server.use('/api', router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
