import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/environment.js'

// Register for an account
export const registerUser = async (req,res) => {
  try {
    const newUser = await User.create(req.body)
    console.log('I am a new user', newUser)
    return res.status(202).json({ message: `Welcome ${newUser.username}`})
  } catch (err) {
  console.log(err)
  return res.status(422).json(err)
  }
}

//Log in to an account
export const loginUser = async (req, res) => {

  try {
    const userToLogin = await User.findOne({ email: req.body.email })
    console.log('I am logging in', userToLogin)
    if (!userToLogin || !userToLogin.validatePassword(req.body.password)) {
      throw new Error()
    }
    // Token
    const token = jwt.sign({ sub: userToLogin._id }, secret, { expiresIn: '7 days'})
    console.log('token--->', token)
    //return response
    return res.status(200).json({message: `Welcome back ${userToLogin.username}`, token})
  } catch (err) {
    console.log('ERROR IN LOG IN', err)
    return res.status(422).json({ message: "Unauthorized" })
  }
}