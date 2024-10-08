import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/connect-db.js"
import userRoutes from "./routes/user-routes.js"
import contactRoutes from "./routes/contact-routes.js"

dotenv.config()
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())

app.use('/api/auth', userRoutes ) 
app.use('/api/contact', contactRoutes) 




app.listen(port, ()=> {
  console.log(`Node express server runing on port ${port}`)
})

