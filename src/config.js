import dotenv from 'dotenv'
import fs from "fs";
import path from "path";
dotenv.config()

const PORT = process.env.PORT || 5000;

process.env.EXP = 2000 * 60

const accessLogStream = fs.createWriteStream(
  path.join(process.cwd(), "access.log"),
  { flags: "a" }
);


export { PORT, accessLogStream };