const express = require('express')
const logger = require('morgan')
const compression = require('compression')

// Create express instance
const app = express()
app.use(compression({ level: 6 }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));

// Require API routes
const posts = require('./routes/posts')
const uploads = require('./routes/uploads')
const test = require('./routes/test')
const login = require('./routes/login')

// Import API Routes
app.use(test)
app.use(uploads)
app.use(posts)
app.use(login)
// Export express app
module.exports = {
  path: "/api/",
  handler: app
};

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
