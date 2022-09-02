import { read, write } from '../utils/model.js'
import { AuthroziationError, InternalServerError } from "../utils/errors.js";
import jwt from '../utils/jwt.js'
import sha256 from 'sha256';
import path from 'path'

const LOGIN = (req, res, next) => {
    try {
        let users = read('users')
        let { username, password } = req.body

        let user = users.find(user => user.username == username && user.password == sha256(password))

        if(!user){
            return next(new AuthroziationError(401, 'wrong username or password'));
        }

        return res.status(200).json({
            status:200,
            message: "ok",
            token: jwt.sign({userId: user.userId})
        })

    } catch (error) {
        return next(new InternalServerError(500, error.message))
    }
}


const REGISTER = (req, res, next) => {
    try {
        let users = read('users')
        let { username, password} = req.body

        let { avatar } = req.files
        
        let fileName = Date.now() + avatar.name.replace(/\s/g, '')
        avatar.mv(path.join(process.cwd(), 'uploads', fileName))

        let newUser = {
            userId: users.length ? users.at(-1).userId + 1 : 1,
            username, password: sha256(password),  avatar: fileName
        }

        users.push(newUser)
        write('users', users)

        delete newUser.password
        return res.status(201).json({
          status: 201,
          message: "success",
          token: jwt.sign({ userId: newUser.userId }),
          data: newUser
        });

    } catch (error) {
        return next(new InternalServerError(500, error.message));
    }
}


const GET = (req, res, next) => {
    try {
        let users =  read('users').filter(user => delete user.password)
        let { userId } = req.params

        if(userId){
            return res.status(200).send(
                users.find(user => user.userId == userId)
            )
        }
        res.send(users)
    } catch (error) {
        return next(new InternalServerError(500, error.message));
    }
}

const TOKEN = (req, res, next) => {
  try {
    
    let { token } = req.query
    
    let {userId, exp} =  jwt.verify(token)

    if(!read('users').some(user => user.userId == userId)){
        return res.status(400).json({
          status: 400,
          message: "invalid token",
          tokenExpired: true,
          tokenValid: false,
          tokenRemainnigTime: 0,
        });
    }

    
    return res.status(200).json({
      status: 200,
      message: "valid token",
      tokenExpired: false,
      tokenValid: true,
      tokenRemainnigTime: exp - ((Date.now() / 1000) | 0),
    });

  } catch (error) {
    return res.status(400).json({
        status:400,
        message: error.message,
        tokenExpired: true,
        tokenValid: false,
        tokenRemainnigTime: 0
    })
  }
};



export default {
  LOGIN,
  REGISTER,
  GET,
  TOKEN,
};