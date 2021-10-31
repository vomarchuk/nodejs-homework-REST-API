const app = require('../app')
require('dotenv').config()
const PORT = process.env.PORT || 3000
console.log(process.env.PORT)

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})
