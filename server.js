import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/connect-db.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()
const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())

app.use('/api/auth', userRoutes ) 




app.listen(port, ()=> {
  console.log(`Node express server runing on port ${port}`)
})

