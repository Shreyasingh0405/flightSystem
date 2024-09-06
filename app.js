import express from "express";
import mongoose from "mongoose";
import CONFIG from "./config/config.js";
import userRoutes from "./routes/users.js";
import flightRoutes from "./routes/flightRoutes.js";
import airlines from "./routes/airlines.js"

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
//app.use("/",app)
mongoose
	.connect(CONFIG.MONGOURL)
	.then(() => {
		console.log("MongoDB connected successfully");
	})
	.catch((err) => console.error("MongoDB connection error:", err));
    userRoutes(app)
    flightRoutes(app)
    airlines(app)
    app.listen(CONFIG.PORT, () => {
        console.log(
            `Server is turned on ${CONFIG.NODE_ENV} mode on ` + `${CONFIG.PORT}`
        );
    });