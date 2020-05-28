import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  try {
    // create user
    const myUser = await User.create(req.body)

    // create token
    const myToken = await newToken(myUser)

    return res.status(201).send({ token: myToken })
  } catch (error) {
    console.log(error)
    return res.status(400).send({ message: `Email and password required` })
  }
}

export const signin = async (req, res) => {
  // check for valid input
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .send({ message: 'Please enter a valid email and password' })
  }

  // check user exists
  const myUser = await User.findOne({ email: req.body.email }).exec()

  if (!myUser) {
    return res.status(401).send({ message: 'No User Found' })
  }

  // check for correct password
  try {
    const match = await myUser.checkPassword(req.body.password)
    if (!match) {
      return res.status(401).send({ message: 'Wrong Password' })
    }

    // create a token
    const myToken = await newToken(myUser)

    return res.status(201).send({ token: myToken })
  } catch (error) {
    console.log(error)
    return res.status(401).send({ message: 'Wrong Password' })
  }
}

export const protect = async (req, res, next) => {
  next()
}
