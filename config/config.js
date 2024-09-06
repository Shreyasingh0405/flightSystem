import dotenv from "dotenv";
import fs from "fs"
dotenv.config();
const CONFIG = {
  MONGOURL: process.env.MONGOURL,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV ?? "development",
  SMTP_HOST: process.env.SMTP_HOST,
	SMTP_PORT: process.env.SMTP_PORT,
	SMTP_USER:process.env.SMTP_USER,
	SMTP_PASS:process.env.SMTP_PASS,
  JWT_KEY:process.env.JWT_KEY ?? fs.readFileSync("privateKey.key", "utf8")
};
export default CONFIG;