import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config()

export const generateAccessToken = (data) => {
  return  jwt.sign(
    data,
    process.env.TOKEN_SECRET,{ expiresIn: "7d" }
  )
}