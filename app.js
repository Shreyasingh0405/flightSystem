import express from "express"
import mongoose from "mongoose"
import CONFIG from "./config/config.js"
import routes from "./routes/routes.js"
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use("/",routes)
mongoose
	.connect(CONFIG.MONGOURL)
	.then(() => {
		console.log("MongoDB connected successfully");
	})
	.catch((err) => console.error("MongoDB connection error:", err));
    app.listen(CONFIG.PORT, () => {
        console.log(
            `Server is turned on ${CONFIG.NODE_ENV} mode on ` + `${CONFIG.PORT}`
        );
    });