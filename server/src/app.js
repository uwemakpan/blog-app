const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

// no longer needed cos they have been routed properly now
// const Blog = require('./models/blog.model')
// const { blogDataValidator } = require('./middlewares/datavalidator')
// const { createNewUser } = require('./controllers/user.controllers')

const blogRoutes = require('./routes/blog.routes')
const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')
const commentRoutes = require('./routes/comment.route')
const productRoute = require('./routes/product.routes')
// import blog modules
// const {
//   createNewBlog,
//   getAllBlogs,
//   getBlogsById,
// } = require('./controllers/blog.controllers')
// const { get } = require('mongoose')

// configuration to allow acceptance of json data from client
app.use(express.json())

// NOTE: all global wares must be above the routes
// configuration to allow cookie-parser as a global configuration
app.use(cookieParser())
// configuraion to allow client to send request to backend api => cors policy
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }))

app.use('/blogs', blogRoutes)
app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/comments', commentRoutes)
app.use('/products', productRoute)

// server health check
app.get('/', (request, response) => {
  response.json({ message: 'Server is live and running hot 🔥' })
})

// Creating a new blog
// note that blogDataValidator is the middle ware
// app.post('/blogs', blogDataValidator, createNewBlog)

// get all blogs from the database
// app.get('/blogs', getAllBlogs)

// receiving dynamic id from the client
// app.get('/blogs/:blogid', getBlogsById)

// add new user
// app.post('/users', createNewUser)

// export the app as a module
module.exports = app
