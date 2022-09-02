import {
  loginSchema,
  registerSchema,
  validationToken,
  validationVideo,
  valiadtionVideoDelete,
  valiadtionVideoPut,
} from "../utils/valiadtion.js";
import { ValidationError } from "../utils/errors.js"


export default (req, res, next) => {
    try {
        
        if(req.method == 'POST' && req.url == '/login'){
            let { error } = loginSchema.validate(req.body)
            if(error) throw error
        }

        if (req.method == 'POST' && req.url == "/register") {
            let { error } = registerSchema.validate({ ...req.body, avatar: req.files.avatar.name});
            if(error) throw error
        }

        if (req.method == 'GET' && req.url == "/checktoken") {
            let { error } = validationToken.validate({query: req.query});
            if(error) throw error
        }
        if (req.method == "POST" && req.url == "/admin/videos") {
          let { error } = validationVideo.validate({ title: req.body.title, file: req.files.file.name, size: req.files.file.size});
          if (error) throw error;
        }
        if (req.method == "DELETE" && req.url == `/admin/videos/${req.params.videoId}`) {
          let { error } = valiadtionVideoDelete.validate({ params: req.params});
          if (error) throw error;
        }

        if (req.method == "PUT" && req.url == `/admin/videos/${req.params.videoId}`) {
          let { error } = valiadtionVideoPut.validate({ body: req.body, params: req.params });
          if (error) throw error;
        }


        return next()
    } catch (error) {
        return next(new ValidationError(401, error.message))
    }
}