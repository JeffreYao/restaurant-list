const express = require('express')
const restaurantList = require('./restaurant.json')
const app = express()
const exphbs = require('express-handlebars')
const port = 3000


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//index page
app.get('/', (req, res) => {
  res.render('index', { restaurantList: restaurantList.results, css: 'index.css' })
})


// restaurantList show page
app.get('/restaurants/:restaurant_id', (req, res) => {
  // console.log('restaurant_id ==>', req.params.restaurant_id) //查看id
  const restaurantOne = restaurantList.results.filter(function (restaurant) {
    return restaurant.id == req.params.restaurant_id
  })
  console.log(restaurantOne)
  res.render('show', { restaurant: restaurantOne[0], css: 'show.css' })
})


// search bar
app.get('/search', (req, res) => {
  console.log('req==>', req.query)//查看keyword
  const restaurantSearch = restaurantList.results.filter(function (restaurant) {
    return restaurant.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  console.log(restaurantSearch)

  res.render('index', { restaurantList: restaurantSearch, keyword: req.query.keyword, css: 'index.css' })
})


// setting static files
app.use(express.static('public'))

app.listen(port, () => {
  console.log(`On open port: ${port}`)
})