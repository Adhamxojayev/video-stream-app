import Joi from 'joi'


export const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})


export const registerSchema = Joi.object({
    username: Joi.string().min(2).max(32).required(),
    password: Joi.string().min(8).required(),
    avatar: Joi.string().pattern(new RegExp(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i))
})

export const validationToken = Joi.object({
    query: {
        token: Joi.string().required()
    }
})

export const validationVideo = Joi.object({
  title: Joi.string().min(2).max(50).required(),
  file: Joi.string().pattern(new RegExp(/\.(mpg|mov|wav|3gp|mkv|mp4)$/i)),
  size: Joi.number().max(50 * 1024 * 1024),
});


export const valiadtionVideoDelete = Joi.object({
    params: {
        videoId: Joi.number().required()
    }
})

export const valiadtionVideoPut = Joi.object({
  body: {
    title: Joi.string().min(2).max(50).required(),
  },
  params: {
    videoId: Joi.number().required(),
  },
});


