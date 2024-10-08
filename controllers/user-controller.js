import Users from "../models/user-model.js";
import bcrypt from 'bcrypt'
import { generateAccessToken } from "../utils/utils.js";


const userSignUp = async (req, res) => {

  const { name, email, password} =  req.body

  if (!name || !email || !password) {
    return res.status(400).json({message:"All field are mandatory"})
  }

  const user = await Users.findOne({email})

  if (user) {
    return res.status(400).json({message:"This email is already taken"})
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser =  await Users.create({
    name,
    email,
    password : hashedPassword
  })

  if (newUser) {
    res.status(201).json({
      "_id": newUser.id,
      "name": newUser.name,
      "email": newUser.email
    })
  } else {
    res.status(400).json({message:"Failed to create user"})
  }


}

const userLogin = async (req, res) => {


  const { email, password } = req.body

  if (!email || !password) {
   return  res.status(400).json({message:"Email and password fields are required"})
  }

  const user = await Users.findOne({email})

  if (!user) {
   return res.status(400).json({message:"User not found, Please register"})
  }

  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    return res.status(400).json({message:"Password is not correct"})
  }

  const jwtPayload ={
    userId: user.id
  }

  const token = generateAccessToken(jwtPayload)

  res.status(200).json({
    message:"user logged in",
    token: token
  })

}


export default {userSignUp, userLogin}