import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config()

export const generateAccessToken = (data) => {
  return  jwt.sign(
    data,
    process.env.TOKEN_SECRET,{ expiresIn: "7d" }
  )
}

export const validateToken = (req, res, next) => {
  const authHeader =  req.headers.authorization || req.headers.Authorization
  if (authHeader && authHeader.startsWith("Bearer")){
    const token = authHeader.split(" ")[1]

    jwt.verify(token, process.env.TOKEN_SECRET, 
      (err, decoded) => {
        if (err) {
          return res.status(401).json({message:"Users is not authorized"})
        }

        req.user = decoded

        next ()
      }
    )
  } else {
    return res.status(401).json({message:"Token is missing"})
  }

}