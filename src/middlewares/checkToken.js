import jwt from '../utils/jwt.js'
import { ForbiddenError } from '../utils/errors.js'


export default (req, res, next) => {
    try {
        let {token} = req.headers

        if(!token){
            return next(new ForbiddenError(403, 'token required'))
        }

        let { userId } = jwt.verify(token)

        req.userId = userId

        return next()
    } catch (error) {
        return next(new ForbiddenError(403, error.message));
    }
}

