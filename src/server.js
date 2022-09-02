import express from 'express'
import morgan from 'morgan'
import fileUpload from 'express-fileupload'
import errorHandler from './middlewares/errorHandler.js'
import cors from 'cors'
import { PORT, accessLogStream } from "./config.js";

import userRouter from './routers/user.router.js'
import videoRouter from './routers/video.router.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.static(path.resolve(process.cwd(), 'uploads')))

app.use(userRouter)
app.use(videoRouter);


app.use(errorHandler);
app.listen(PORT, () => console.log(PORT))
export default app